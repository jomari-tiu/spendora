import React, { createContext, useState, useEffect, useCallback } from 'react';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { AppSettings } from '../types';

interface ThemeContextValue {
  currency: string;
  setCurrency: (currency: string) => void;
}

export const ThemeContext = createContext<ThemeContextValue>({
  currency: 'USD',
  setCurrency: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrencyState] = useState('USD');
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromStorage<AppSettings>(STORAGE_KEYS.SETTINGS).then((settings) => {
      if (settings) {
        setCurrencyState(settings.currency ?? 'USD');
      }
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) {
      saveToStorage<AppSettings>(STORAGE_KEYS.SETTINGS, { currency });
    }
  }, [currency, loaded]);

  const setCurrency = useCallback((c: string) => setCurrencyState(c), []);

  return (
    <ThemeContext.Provider value={{ currency, setCurrency }}>
      {children}
    </ThemeContext.Provider>
  );
}
