"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import ReactMarkdown from "react-markdown";
import { useState, useEffect } from "react";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark.css";
import { Bot, User, Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface MessageProps {
  type: "user" | "ai";
  content: string;
  timestamp?: string;
  modelName?: string;
}

export function Message({ type, content, timestamp, modelName }: MessageProps) {
  const [formattedTime, setFormattedTime] = useState<string>(
    timestamp || new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  );
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!timestamp) {
      setFormattedTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }

    // Apply syntax highlighting to code blocks after component mount
    hljs.highlightAll();
  }, [timestamp]);

  const isUser = type === "user";

  const handleCopyContent = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`flex ${isUser ? "justify-end" : "justify-start"} my-4 px-4 md:px-6`}
    >
      <div className={`flex ${isUser ? "flex-row-reverse" : "flex-row"} gap-3 max-w-[90%] md:max-w-[80%]`}>
        <motion.div
          className="flex flex-shrink-0 pt-1"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <Avatar className={`h-8 w-8 shadow-sm ${isUser ? "bg-accent/10" : "bg-primary/10"}`}>
            <AvatarFallback
              className={isUser
                ? "bg-gradient-to-br from-accent to-accent/80 text-accent-foreground"
                : "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground"}
            >
              {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="flex flex-col">
          {/* Model label for AI messages */}
          {!isUser && modelName && (
            <div className="text-xs font-medium mb-1 text-muted-foreground flex items-center gap-1">
              <Bot className="h-3 w-3" /> {modelName}
            </div>
          )}

          <motion.div
            className="group relative"
            whileHover={{ translateY: -2 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className={`${isUser ? "chat-message-user" : "chat-message-ai"} shadow-sm`}
            >
              {isUser ? (
                <div className="whitespace-pre-wrap">{content}</div>
              ) : (
                <div className="markdown-content">
                  <ReactMarkdown
                    components={{
                      code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                          <div className="relative group">
                            <pre className="relative">
                              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <button
                                        onClick={() => navigator.clipboard.writeText(String(children).replace(/\n$/, ''))}
                                        className="p-1 rounded hover:bg-secondary/50 transition-colors"
                                      >
                                        <Copy className="h-4 w-4" />
                                      </button>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                      <p>Copy code</p>
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              <code
                                className={`language-${match[1]}`}
                                {...props}
                              >
                                {String(children).replace(/\n$/, '')}
                              </code>
                            </pre>
                          </div>
                        ) : (
                          <code className={className} {...props}>
                            {children}
                          </code>
                        );
                      }
                    }}
                  >
                    {content}
                  </ReactMarkdown>
                </div>
              )}
            </div>

            {/* Copy button (only for AI messages) */}
            {!isUser && (
              <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleCopyContent}
                        className="p-1 rounded hover:bg-secondary/50 transition-colors"
                      >
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{copied ? "Copied!" : "Copy message"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            )}

            <div className={`text-xs text-muted-foreground mt-1 ${isUser ? "text-right" : "text-left"}`}>
              {formattedTime}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
