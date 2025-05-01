"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Bot, Check, ChevronsUpDown, Sparkles, Zap, Database, Server, Filter, ListFilter } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

export interface AIModel {
  id: string;
  name: string;
  description?: string;
  category?: string;
}

interface ModelSelectorProps {
  models: AIModel[];
  selectedModel: AIModel;
  onSelectModel: (model: AIModel) => void;
  categories?: string[];
}

export function ModelSelector({
  models,
  selectedModel,
  onSelectModel,
  categories = [],
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false);

  // Group models by category
  const modelsByCategory: Record<string, AIModel[]> = {};

  // Add "All Models" category if not present
  if (!categories.includes("All")) {
    categories = ["All", ...categories];
  }

  // Initialize categories
  categories.forEach(category => {
    modelsByCategory[category] = [];
  });

  // Fill categories with models
  models.forEach(model => {
    const category = model.category || "Uncategorized";

    if (!modelsByCategory[category]) {
      modelsByCategory[category] = [];
    }

    modelsByCategory[category].push(model);

    // Also add to All category
    if (category !== "All") {
      modelsByCategory["All"].push(model);
    }
  });

  // Get appropriate icon for category
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'mini':
      case 'small':
        return <Zap className="h-4 w-4 text-yellow-400" />;
      case 'medium':
        return <Server className="h-4 w-4 text-blue-400" />;
      case 'large':
      case 'xlarge':
        return <Database className="h-4 w-4 text-purple-400" />;
      case 'all':
        return <ListFilter className="h-4 w-4 text-primary" />;
      default:
        return <Sparkles className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="flex justify-between items-center w-full sm:w-auto group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity"
            layout
          />
          <div className="flex items-center gap-2 relative z-10">
            <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
              <Bot className="h-4 w-4 text-primary" />
            </div>
            <span className="font-medium">{selectedModel.name}</span>
          </div>
          <motion.div
            className="relative z-10"
            animate={{ rotate: open ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-60" align="start">
        <DropdownMenuLabel className="font-medium">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span>AI Models</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        {/* If we have categories */}
        {categories.length > 0 ? (
          categories.map((category, index) => {
            const categoryModels = modelsByCategory[category] || [];

            if (categoryModels.length === 0) return null;

            return (
              <DropdownMenuGroup key={category}>
                {index > 0 && <DropdownMenuSeparator />}
                <DropdownMenuLabel className="flex items-center gap-2 text-xs text-muted-foreground font-normal px-2 py-1.5">
                  {getCategoryIcon(category)}
                  <span>{category}</span>
                </DropdownMenuLabel>

                {categoryModels.map(model => (
                  <HoverCard key={model.id}>
                    <HoverCardTrigger asChild>
                      <DropdownMenuItem
                        className="flex items-center justify-between py-2.5 cursor-pointer"
                        onSelect={() => {
                          onSelectModel(model);
                          setOpen(false);
                        }}
                      >
                        <div className="flex flex-col">
                          <span className="font-medium">{model.name}</span>
                          {model.description && (
                            <span className="text-xs text-muted-foreground line-clamp-1">
                              {model.description.length > 30
                                ? `${model.description.substring(0, 30)}...`
                                : model.description}
                            </span>
                          )}
                        </div>
                        <AnimatePresence>
                          {model.id === selectedModel.id && (
                            <motion.div
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              exit={{ scale: 0, opacity: 0 }}
                            >
                              <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                                <Check className="h-3 w-3 text-primary" />
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </DropdownMenuItem>
                    </HoverCardTrigger>
                    {model.description && (
                      <HoverCardContent side="right" className="w-80">
                        <div className="flex justify-between space-x-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-semibold">{model.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {model.description}
                            </p>
                            {model.category && (
                              <div className="flex items-center pt-2">
                                <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary">
                                  {getCategoryIcon(model.category)}
                                  <span className="ml-1.5">{model.category}</span>
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </HoverCardContent>
                    )}
                  </HoverCard>
                ))}
              </DropdownMenuGroup>
            );
          })
        ) : (
          // If no categories, just list all models
          models.map(model => (
            <DropdownMenuItem
              key={model.id}
              className="flex items-center justify-between py-2.5 cursor-pointer"
              onSelect={() => {
                onSelectModel(model);
                setOpen(false);
              }}
            >
              <div className="flex flex-col">
                <span className="font-medium">{model.name}</span>
                {model.description && (
                  <span className="text-xs text-muted-foreground line-clamp-1">
                    {model.description.length > 30
                      ? `${model.description.substring(0, 30)}...`
                      : model.description}
                  </span>
                )}
              </div>
              {model.id === selectedModel.id && (
                <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center">
                  <Check className="h-3 w-3 text-primary" />
                </div>
              )}
            </DropdownMenuItem>
          ))
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
