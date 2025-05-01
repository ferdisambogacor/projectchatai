"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";
import { motion } from "framer-motion";

export function TypingIndicator({ modelName }: { modelName?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
      className="flex justify-start my-4 px-4 md:px-6"
    >
      <div className="flex flex-row gap-3">
        <div className="flex flex-shrink-0 pt-1">
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 0 rgba(16, 185, 129, 0)",
                "0 0 8px rgba(16, 185, 129, 0.5)",
                "0 0 0 rgba(16, 185, 129, 0)"
              ]
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop"
            }}
          >
            <Avatar className="h-8 w-8 bg-primary/10">
              <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
                <Bot className="h-4 w-4" />
              </AvatarFallback>
            </Avatar>
          </motion.div>
        </div>

        <div className="flex flex-col">
          {modelName && (
            <div className="text-xs font-medium mb-1 text-muted-foreground flex items-center gap-1">
              <Bot className="h-3 w-3" /> {modelName}
            </div>
          )}

          <motion.div
            className="chat-message-ai py-3 px-4 max-w-[200px]"
            initial={{ width: 80 }}
            animate={{ width: [80, 120, 160, 120] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
              ease: "easeInOut"
            }}
          >
            <div className="typing-indicator flex items-center justify-center">
              <motion.div
                className="typing-dot"
                animate={{
                  y: ["0%", "-40%", "0%"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0
                }}
              />
              <motion.div
                className="typing-dot"
                animate={{
                  y: ["0%", "-40%", "0%"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.2
                }}
              />
              <motion.div
                className="typing-dot"
                animate={{
                  y: ["0%", "-40%", "0%"],
                  opacity: [0.5, 1, 0.5]
                }}
                transition={{
                  duration: 0.8,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "loop",
                  ease: "easeInOut",
                  delay: 0.4
                }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
