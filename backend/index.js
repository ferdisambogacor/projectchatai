// Load environment variables from .env file
require('dotenv').config();

// Import required packages
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const { allModels, getCategories, getModelsByCategory, getModelById, getDefaultModel } = require('./models');
const { modelsPart4, modelsPart5, modelsPart6 } = require('./models-part2');

// Initialize Express app
const app = express();

// Define port from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

// Default model
const DEFAULT_MODEL = getDefaultModel();

// Enable CORS for all origins - this is important for local development
app.use(cors({
  origin: '*', // Allow all origins for testing
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Parse JSON request bodies
app.use(express.json());

// Check if OpenRouter API key is provided
if (!process.env.OPENROUTER_API_KEY) {
  console.error('OPENROUTER_API_KEY is required in the .env file');
  process.exit(1);
}
console.log('OpenRouter API key is loaded and available');

// Health check endpoint
app.get('/', (req, res) => {
  console.log('Health check endpoint called');
  res.send(`Chatbot AI Backend is running with multiple models support!`);
});

// Endpoint to get all available models
app.get('/models', (req, res) => {
  console.log('Models endpoint called');

  try {
    // Get all model categories
    const categories = getCategories();

    // Organize models by category
    const modelsByCategory = {};
    categories.forEach(category => {
      modelsByCategory[category] = getModelsByCategory(category);
    });

    res.json({
      success: true,
      categories,
      modelsByCategory,
      allModels,
      defaultModel: DEFAULT_MODEL
    });
  } catch (error) {
    console.error('Error in /models endpoint:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve models',
      message: error.message
    });
  }
});

// Get specific model info by ID
app.get('/models/:id', (req, res) => {
  const modelId = req.params.id;
  console.log(`Model detail endpoint called for model: ${modelId}`);

  try {
    const model = getModelById(modelId);

    if (!model) {
      return res.status(404).json({
        success: false,
        error: 'Model not found',
        message: `No model found with ID: ${modelId}`
      });
    }

    res.json({
      success: true,
      model
    });
  } catch (error) {
    console.error(`Error in /models/${modelId} endpoint:`, error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve model details',
      message: error.message
    });
  }
});

// Debug endpoint to test OpenRouter connection
app.get('/test-openrouter', async (req, res) => {
  try {
    // Get model ID from query parameter or use default
    const modelId = req.query.modelId || DEFAULT_MODEL.id;
    const model = getModelById(modelId) || DEFAULT_MODEL;

    console.log(`Testing OpenRouter connection with model: ${model.id}...`);
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model.id,
        messages: [{ role: 'user', content: 'Hello, are you working? Please introduce yourself briefly.' }]
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // Helpful for OpenRouter tracking
          'X-Title': 'Chatbot AI Test' // Helpful for OpenRouter tracking
        }
      }
    );

    console.log('OpenRouter test successful');
    res.json({
      success: true,
      message: 'OpenRouter connection successful',
      model: model.id,
      modelName: model.name,
      modelDescription: model.description,
      modelDetails: model,
      aiMessage: response.data.choices[0].message.content
    });
  } catch (error) {
    console.error('OpenRouter test failed:', error.message);

    let errorDetails = {
      message: error.message
    };

    if (error.response) {
      errorDetails.status = error.response.status;
      errorDetails.data = error.response.data;
    }

    res.status(500).json({
      success: false,
      error: 'OpenRouter connection failed',
      model: req.query.modelId || DEFAULT_MODEL.id,
      details: errorDetails
    });
  }
});

// Main chat endpoint to handle user messages
app.post('/chat', async (req, res) => {
  console.log('Received request to /chat endpoint');
  console.log('Request body:', JSON.stringify(req.body, null, 2));

  try {
    // Extract user message and model from request body
    const { userMessage, modelId, conversationHistory = [] } = req.body;

    if (!userMessage) {
      console.log('Missing userMessage in request');
      return res.status(400).json({ error: 'userMessage is required' });
    }

    // Get the model based on modelId or use default
    const model = modelId ? getModelById(modelId) : DEFAULT_MODEL;

    if (!model) {
      console.log(`Invalid model ID: ${modelId}, using default model`);
      return res.status(400).json({
        error: 'Invalid model ID',
        message: `Model with ID ${modelId} not found. Please use a valid model ID.`
      });
    }

    // Prepare messages array for OpenRouter API
    // Include conversation history if available, and append the new user message
    const messages = [
      ...conversationHistory,
      { role: 'user', content: userMessage }
    ];

    console.log(`Sending request to OpenRouter with model: ${model.id}`);
    console.log('Messages:', JSON.stringify(messages, null, 2));

    // Make request to OpenRouter API
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: model.id,
        messages: messages
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:3000', // Helpful for OpenRouter tracking
          'X-Title': 'Chatbot AI' // Helpful for OpenRouter tracking
        }
      }
    );

    // Extract the AI's response from OpenRouter API response
    const aiResponse = response.data.choices[0].message;

    console.log('Received response from OpenRouter:', JSON.stringify(aiResponse, null, 2));

    // Send the AI's response back to the frontend
    res.json({
      response: aiResponse,
      model: model.id,
      modelName: model.name,
      modelDescription: model.description,
      modelDetails: model
    });

  } catch (error) {
    console.error('Error in /chat endpoint:');

    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error message:', error.message);
    }

    // Send appropriate error response to the client
    res.status(error.response?.status || 500).json({
      error: error.response?.data?.error || 'Something went wrong with the AI service',
      message: error.message,
      model: req.body.modelId || DEFAULT_MODEL.id
    });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Chatbot AI Backend server running on http://localhost:${PORT}`);
  console.log(`Test the connection at http://localhost:${PORT}/test-openrouter`);
});
