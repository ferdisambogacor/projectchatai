// Load environment variables
require('dotenv').config();
const axios = require('axios');

// Check if OpenRouter API key is available
console.log('Checking API key...');
const apiKey = process.env.OPENROUTER_API_KEY;
if (!apiKey) {
  console.error('OPENROUTER_API_KEY not found in .env file');
  process.exit(1);
}
console.log('API key loaded successfully');

// Test function to send a request to OpenRouter
async function testOpenRouterConnection() {
  try {
    console.log('Sending test request to OpenRouter API...');
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'mistral',
        messages: [{ role: 'user', content: 'Hello, are you working?' }]
      },
      {
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('OpenRouter API Response:', response.data);
    console.log('\nConnection successful! OpenRouter API is working.');
    return true;
  } catch (error) {
    console.error('Error connecting to OpenRouter:');
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received. Network issue?');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up request:', error.message);
    }
    return false;
  }
}

// Run the test
console.log('Starting OpenRouter API connection test...\n');
testOpenRouterConnection()
  .then(success => {
    if (!success) {
      console.log('\nTroubleshooting tips:');
      console.log('1. Check your internet connection');
      console.log('2. Verify your API key is correct and not expired');
      console.log('3. Make sure OpenRouter service is up and running');
    }
  });
