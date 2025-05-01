"use client";

"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message } from "./message";
import { ChatInput } from "./chat-input";
import { WelcomeScreen } from "./welcome-screen";
import { TypingIndicator } from "./typing-indicator";
import { type AIModel, ModelSelector } from "./model-selector";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Bot,
  Trash2,
  RefreshCw,
  AlertCircle,
  Loader2,
  LayoutDashboard,
  Menu,
  X,
  MessageSquare,
  ArrowUp
} from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { motion, AnimatePresence } from "framer-motion";

export interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
  timestamp?: string;
}

interface ChatProps {
  apiEndpoint?: string;
  initialModel?: AIModel;
  models?: AIModel[];
  categories?: string[];
}

export function Chat({
  apiEndpoint = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/chat",
  initialModel = {
    id: "qwen/qwen3-0.6b-04-28:free",
    name: "Qwen 0.6B",
    description: "Model bahasa ringan untuk chat dan penalaran"
  },
  models = [],
  categories = []
}: ChatProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState<AIModel>(initialModel);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isConnecting, setIsConnecting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Generate featured models (pick 3 different ones if available)
  const featuredModels = models.length > 0
    ? models.slice(0, Math.min(3, models.length))
    : [initialModel];

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      scrollToBottom(isTyping);
    }
  }, [messages, isTyping]);

  // Check if scroll position is far from bottom to show scroll-to-bottom button
  useEffect(() => {
    const chatContainer = chatContainerRef.current;
    if (!chatContainer) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chatContainer;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 200;
      setShowScrollToBottom(!isNearBottom && messages.length > 0);
    };

    chatContainer.addEventListener('scroll', handleScroll);
    return () => chatContainer.removeEventListener('scroll', handleScroll);
  }, [messages.length]);

  // Scroll to bottom function
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: smooth ? "smooth" : "auto",
        block: "end"
      });
    }
  };

  // Function to handle sending a message
  const handleSendMessage = async (messageContent: string) => {
    if (!messageContent.trim() || isTyping) return;

    // Hide welcome screen
    setShowWelcome(false);

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: messageContent,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    try {
      // Prepare data for API
      const conversationHistory = messages.map(message => ({
        role: message.role,
        content: message.content
      }));

      // Add the new user message
      conversationHistory.push({
        role: "user",
        content: messageContent
      });

      // Call API
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userMessage: messageContent,
          modelId: selectedModel.id,
          conversationHistory: messages
        })
      });

      if (!response.ok) {
        throw new Error(`Server responded with status ${response.status}`);
      }

      const data = await response.json();

      // Add AI response to messages
      const aiResponse: ChatMessage = {
        role: "assistant",
        content: data.response.content,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Gagal mengirim pesan. Silakan coba lagi.");

      // Add error message
      const errorMessage: ChatMessage = {
        role: "assistant",
        content: "Maaf, terjadi kesalahan saat memproses pesan Anda. Silakan coba lagi.",
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to handle example clicks from welcome screen
  const handleExampleClick = (example: string) => {
    handleSendMessage(example);
  };

  // Function to clear chat
  const handleClearChat = () => {
    setMessages([]);
    setShowWelcome(true);
    toast.success("Chat berhasil dibersihkan");
  };

  // Function to handle model selection
  const handleModelSelect = (model: AIModel) => {
    setSelectedModel(model);

    if (messages.length === 0) {
      toast.success(`Model diubah ke ${model.name}`);
    } else {
      toast(`Model diubah ke ${model.name}`, {
        description: "Perubahan akan berlaku pada pesan selanjutnya"
      });
    }

    // Hide welcome screen if first message
    if (showWelcome) {
      setShowWelcome(false);
    }
  };

  // Function to test API connection
  const handleTestConnection = async () => {
    setIsConnecting(true);

    try {
      const response = await fetch(`${apiEndpoint.replace("/chat", "")}/test-openrouter`);
      const data = await response.json();

      if (data.success) {
        toast.success("Koneksi ke API berhasil!");
      } else {
        toast.error(`Koneksi gagal: ${data.error}`);
      }
    } catch (error) {
      console.error("Error testing connection:", error);
      toast.error("Tidak dapat terhubung ke server");
    } finally {
      setIsConnecting(false);
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background relative">
      {/* Background gradient orbs for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-30">
        <div className="absolute top-10 right-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 animate-blob"></div>
        <div className="absolute bottom-10 left-10 w-72 h-72 bg-accent/5 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000"></div>
      </div>

      {/* Header */}
      <header className="border-b dark:border-zinc-800 bg-background/95 backdrop-blur-md sticky top-0 z-20">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-4">
            {/* Mobile menu button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Bot className="h-5 w-5 text-primary" />
              </div>
              <h1 className="text-lg sm:text-xl font-semibold hidden sm:inline-block">
                AI Chatbot
              </h1>
            </div>

            {/* Model selector */}
            <div className={`${isMenuOpen ? 'block absolute top-16 left-0 right-0 bg-background/95 backdrop-blur-md border-b dark:border-zinc-800 p-4 z-50 shadow-md' : 'hidden'} md:block md:shadow-none`}>
              <ModelSelector
                models={models.length > 0 ? models : [initialModel]}
                selectedModel={selectedModel}
                onSelectModel={handleModelSelect}
                categories={categories}
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Clear chat button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleClearChat}
              disabled={messages.length === 0}
              className="hidden sm:flex"
              title="Clear chat"
            >
              <Trash2 className="h-5 w-5" />
            </Button>

            {/* Test connection button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleTestConnection}
              disabled={isConnecting}
              className="hidden sm:flex"
              title="Test connection"
            >
              {isConnecting ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <RefreshCw className="h-5 w-5" />
              )}
            </Button>

            {/* Theme toggle */}
            <ThemeToggle />

            {/* Mobile action menu */}
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon" className="sm:hidden">
                  <LayoutDashboard className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Actions</DialogTitle>
                  <DialogDescription>
                    Manage your chat settings and actions
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <Button
                    variant="outline"
                    onClick={handleClearChat}
                    disabled={messages.length === 0}
                    className="w-full justify-start"
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Clear Chat
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleTestConnection}
                    disabled={isConnecting}
                    className="w-full justify-start"
                  >
                    {isConnecting ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <RefreshCw className="mr-2 h-4 w-4" />
                    )}
                    Test Connection
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main chat area */}
      <main className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        {showWelcome ? (
          <WelcomeScreen
            onExampleClick={handleExampleClick}
            featuredModels={featuredModels}
            onModelSelect={handleModelSelect}
          />
        ) : (
          <div className="pb-32 pt-5 relative">
            <AnimatePresence>
              {messages.map((message, index) => (
                <Message
                  key={index}
                  type={message.role === "user" ? "user" : "ai"}
                  content={message.content}
                  timestamp={message.timestamp}
                  modelName={message.role === "assistant" ? selectedModel.name : undefined}
                />
              ))}

              {isTyping && (
                <TypingIndicator modelName={selectedModel.name} />
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        )}

        {/* Scroll to bottom button */}
        <AnimatePresence>
          {showScrollToBottom && (
            <motion.div
              className="fixed bottom-28 right-4 z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            >
              <Button
                size="icon"
                className="rounded-full shadow-lg"
                onClick={() => scrollToBottom()}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Input area */}
      <footer className="fixed bottom-0 left-0 right-0 z-10">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          modelName={selectedModel.name}
        />
      </footer>
    </div>
  );
}
