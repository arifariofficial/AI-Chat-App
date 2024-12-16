"use client";

import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const LOCAL_STORAGE_KEY = "sidebar";

interface SidebarContext {
  isSidebarOpen: boolean;
  toggleSidebar: (isOpen?: boolean) => void;
  isLoading: boolean;
}

const SidebarContext = createContext<SidebarContext | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebarContext must be used within a SidebarProvider");
  }
  return context;
}

interface SidebarProviderProps {
  children: ReactNode;
}

export function SidebarProvider({ children }: SidebarProviderProps) {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let value = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!value) {
      value = JSON.stringify(false); // Default to closed
      localStorage.setItem(LOCAL_STORAGE_KEY, value);
    }
    setSidebarOpen(JSON.parse(value));
    setLoading(false);
  }, []);

  const toggleSidebar = (isOpen?: boolean) => {
    setSidebarOpen((prev) => {
      const newState = isOpen !== undefined ? isOpen : !prev;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newState));
      return newState;
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <SidebarContext.Provider
      value={{ isSidebarOpen, toggleSidebar, isLoading }}
    >
      {children}
    </SidebarContext.Provider>
  );
}
