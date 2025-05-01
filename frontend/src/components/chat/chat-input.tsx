"use client";

import { useState, useRef, useEffect } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  modelName?: string;
}

export function ChatInput({
  onSendMessage,
  disabled = false,
  placeholder = "Tulis pertanyaanmu...",
  modelName,
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize the textarea based on content
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "0";
      const scrollHeight = textarea.scrollHeight;
      textarea.style.height = scrollHeight + "px";
    }
  }, [message]);

  const handleSubmit = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");

      // Reset height
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="border-t dark:border-zinc-800 bg-background/80 backdrop-blur-lg">
      <div className="container flex flex-col gap-2 mx-auto p-4 md:max-w-4xl">
        <motion.div
          className={`relative flex items-end bg-card rounded-xl p-2 border ${
            isFocused ? "ring-1 ring-primary/50 border-primary/50" : ""
          }`}
          animate={{
            boxShadow: isFocused
              ? "0 4px 20px rgba(0, 0, 0, 0.1)"
              : "0 2px 10px rgba(0, 0, 0, 0.05)",
          }}
          transition={{ duration: 0.2 }}
        >
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            className="min-h-10 max-h-40 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none px-3 py-2.5 shadow-none bg-transparent text-base"
            disabled={disabled}
          />
          <AnimatePresence>
            {message.trim().length > 0 && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.15, type: "spring", stiffness: 500 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="ml-2 mb-0.5 flex-shrink-0 rounded-full shadow-sm"
              >
                <Button
                  onClick={handleSubmit}
                  size="icon"
                  disabled={disabled || !message.trim()}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {modelName && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xs text-center text-muted-foreground flex items-center justify-center gap-1.5"
          >
            <Sparkles className="h-3 w-3" />
            Menggunakan{" "}
            <span className="font-medium text-foreground/80">{modelName}</span>
          </motion.div>
        )}
      </div>
    </div>
  );
}
