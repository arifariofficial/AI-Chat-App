"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

// Define the AIState type
export interface AIState {
  chatId: string;
  messages: Array<{ id: string; content: string }>; // Update the message type if needed
}

// Define the context type
interface AIContextType {
  state: AIState;
  setState: React.Dispatch<React.SetStateAction<AIState>>;
}

// Create the context
const AIContext = createContext<AIContextType | undefined>(undefined);

// Hook to use the AIContext
export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) {
    throw new Error("useAIContext must be used within an AIProvider");
  }
  return context;
};

// Provider component
interface AIProviderProps {
  children: ReactNode;
  initialAIState: AIState;
}

export const AIProvider: React.FC<AIProviderProps> = ({
  children,
  initialAIState,
}) => {
  const [state, setState] = useState<AIState>(initialAIState);

  return (
    <AIContext.Provider value={{ state, setState }}>
      {children}
    </AIContext.Provider>
  );
};
