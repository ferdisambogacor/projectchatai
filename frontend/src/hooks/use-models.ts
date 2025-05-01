"use client";

import { useState, useEffect } from "react";
import type { AIModel } from "@/components/chat/model-selector";
import { toast } from "sonner";

export function useModels(apiEndpoint = process.env.NEXT_PUBLIC_API_URL?.replace("/chat", "") || "http://localhost:3000") {
  const [models, setModels] = useState<AIModel[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [defaultModel, setDefaultModel] = useState<AIModel>({
    id: "qwen/qwen3-0.6b-04-28:free",
    name: "Qwen 0.6B",
    description: "Model bahasa ringan untuk chat dan penalaran"
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchModels();
  }, [apiEndpoint]);

  const fetchModels = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${apiEndpoint}/models`);

      if (!response.ok) {
        throw new Error(`Failed to fetch models: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setModels(data.allModels || []);
        setCategories(data.categories || []);

        if (data.defaultModel) {
          setDefaultModel(data.defaultModel);
        }
      } else {
        throw new Error(data.error || "Failed to fetch models");
      }
    } catch (error) {
      console.error("Error fetching models:", error);
      setError("Failed to load models. Using default model instead.");
      toast.error("Gagal memuat daftar model AI");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    models,
    categories,
    defaultModel,
    isLoading,
    error,
    fetchModels
  };
}
