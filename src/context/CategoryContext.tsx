import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Category } from '../types';
import { DEFAULT_CATEGORIES } from '../constants/categories';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { loadFromStorage, saveToStorage } from '../utils/storage';

interface CategoryContextValue {
  categories: Category[];
  addCategory: (category: Omit<Category, 'id' | 'isDefault'>) => void;
  deleteCategory: (id: string) => void;
}

export const CategoryContext = createContext<CategoryContextValue>({
  categories: DEFAULT_CATEGORIES,
  addCategory: () => {},
  deleteCategory: () => {},
});

export function CategoryProvider({ children }: { children: React.ReactNode }) {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromStorage<Category[]>(STORAGE_KEYS.CATEGORIES).then((stored) => {
      if (stored && stored.length > 0) setCategories(stored);
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEYS.CATEGORIES, categories);
  }, [categories, loaded]);

  const addCategory = useCallback((cat: Omit<Category, 'id' | 'isDefault'>) => {
    const newCat: Category = {
      ...cat,
      id: `cat_custom_${Date.now()}`,
      isDefault: false,
    };
    setCategories((prev) => [...prev, newCat]);
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id || c.isDefault));
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, addCategory, deleteCategory }}>
      {children}
    </CategoryContext.Provider>
  );
}
