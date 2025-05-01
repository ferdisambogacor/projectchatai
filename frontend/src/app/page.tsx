"use client";

import { Chat } from "@/components/chat/chat";
import { useModels } from "@/hooks/use-models";
import { Skeleton } from "@/components/ui/skeleton";

export default function Home() {
  const { models, categories, defaultModel, isLoading, error } = useModels();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen p-4">
        <div className="w-full max-w-md space-y-4">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-72 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>
    );
  }

  return <Chat models={models} categories={categories} initialModel={defaultModel} />;
}
