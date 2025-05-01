"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, MessageSquare, Sparkles, ArrowRight, Bot as BotIcon } from "lucide-react";
import { motion } from "framer-motion";
import type { AIModel } from "./model-selector";
import { useState } from "react";

interface WelcomeScreenProps {
  onExampleClick: (message: string) => void;
  featuredModels?: AIModel[];
  onModelSelect?: (model: AIModel) => void;
}

export function WelcomeScreen({
  onExampleClick,
  featuredModels = [],
  onModelSelect,
}: WelcomeScreenProps) {
  // Example messages that showcase the bot's capabilities
  const examples = [
    "Jelaskan apa itu Large Language Model dalam bahasa sederhana.",
    "Terjemahkan kalimat berikut ke dalam bahasa Inggris: Saya sedang belajar tentang kecerdasan buatan dan cara kerjanya.",
    "Buatkan 5 contoh penggunaan AI dalam kehidupan sehari-hari yang mungkin tidak banyak diketahui orang."
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  // Hover animations for cards
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="container mx-auto px-4 py-6 md:py-12 max-w-5xl">
      {/* Floating background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-10 left-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 animate-blob opacity-70"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl transform translate-x-1/2 translate-y-1/2 animate-blob animation-delay-2000 opacity-70"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-secondary/20 rounded-full blur-3xl animate-blob animation-delay-4000 opacity-60"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center text-center mb-10"
        >
          <div className="mb-3 bg-primary/10 p-3 rounded-full">
            <BotIcon className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent pb-2">
            AI Chatbot
          </h1>
          <p className="mt-4 text-muted-foreground max-w-xl text-lg">
            Pilih model AI dari daftar atau gunakan contoh pertanyaan di bawah untuk memulai percakapan
          </p>
        </motion.div>

        {/* Featured models section with improved card design */}
        {featuredModels.length > 0 && (
          <motion.div variants={itemVariants} className="mb-12">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-medium">Model AI Rekomendasi</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredModels.slice(0, 3).map((model, index) => (
                <motion.div
                  key={model.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  whileTap={{ y: 0, scale: 0.98 }}
                  onHoverStart={() => setHoveredCard(model.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <Card
                    className="overflow-hidden h-full cursor-pointer border-2 hover:border-primary/50 transition-all duration-300 bg-card/50 backdrop-blur-sm"
                    onClick={() => onModelSelect && onModelSelect(model)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <CardHeader className="pb-2 relative z-10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center shadow-md">
                          <Bot className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <CardTitle className="text-xl">{model.name}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="relative z-10">
                      <CardDescription className="text-base">
                        {model.description || "AI model powered by OpenRouter"}
                      </CardDescription>
                    </CardContent>
                    <CardFooter className="relative z-10">
                      <Button
                        variant="ghost"
                        className="flex items-center gap-2 text-primary hover:text-primary hover:bg-primary/10 transition-colors w-full justify-start p-3 group"
                        onClick={(e) => {
                          e.stopPropagation();
                          onModelSelect && onModelSelect(model);
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Chat dengan model ini</span>
                        <ArrowRight className="h-4 w-4 ml-auto transform group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Examples section with improved design */}
        <motion.div variants={itemVariants}>
          <div className="flex items-center gap-2 mb-6">
            <MessageSquare className="h-5 w-5 text-accent" />
            <h2 className="text-2xl font-medium">Coba Contoh</h2>
          </div>
          <div className="grid gap-4">
            {examples.map((example, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ x: 5, scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                onClick={() => onExampleClick(example)}
                className="bg-card/50 hover:bg-card border-2 p-5 rounded-xl cursor-pointer transition-all hover:shadow-md hover:border-accent/30"
              >
                <div className="flex gap-3 items-start">
                  <div className="mt-1 bg-accent/10 p-1.5 rounded-full">
                    <ArrowRight className="h-4 w-4 text-accent" />
                  </div>
                  <p className="font-medium">"{example}"</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
