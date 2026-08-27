import React, { createContext, useContext, useState, useEffect } from 'react';

type ThemeMode = 'creative' | 'tech';

interface ThemeContextType {
  mode: ThemeMode;
  toggleTheme: () => void;
  setMode: (mode: ThemeMode) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('creative');

  useEffect(() => {
    const root = document.documentElement;
    if (mode === 'tech') {
      root.classList.add('theme-tech');
      root.classList.remove('theme-creative');
    } else {
      root.classList.add('theme-creative');
      root.classList.remove('theme-tech');
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === 'creative' ? 'tech' : 'creative'));
  };

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
