'use client';

import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from 'react';

const DarkModeContext = createContext<any>([]);

export const DarkModeProvider = ({ children }: { children: ReactNode }) => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem('darkMode') || 'false');
    if (storedData) setDarkMode(storedData);
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [darkMode]);

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
};

export const useDarkMode = () => {
  const context = useContext(DarkModeContext);
  if (context === null || context === undefined) {
    throw new Error('Context must be used within DarkModeProvider!');
  }
  return context;
};
