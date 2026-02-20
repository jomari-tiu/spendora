import React, { createContext, useState, useEffect, useCallback } from 'react';
import { Transaction } from '../types';
import { STORAGE_KEYS } from '../constants/storageKeys';
import { loadFromStorage, saveToStorage, clearStorage } from '../utils/storage';

interface TransactionContextValue {
  transactions: Transaction[];
  isLoading: boolean;
  addTransaction: (tx: Omit<Transaction, 'id' | 'createdAt'>) => void;
  updateTransaction: (id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => void;
  deleteTransaction: (id: string) => void;
  clearAll: () => void;
}

export const TransactionContext = createContext<TransactionContextValue>({
  transactions: [],
  isLoading: true,
  addTransaction: () => {},
  updateTransaction: () => {},
  deleteTransaction: () => {},
  clearAll: () => {},
});

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    loadFromStorage<Transaction[]>(STORAGE_KEYS.TRANSACTIONS).then((stored) => {
      if (stored) setTransactions(stored);
      setLoaded(true);
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loaded) saveToStorage(STORAGE_KEYS.TRANSACTIONS, transactions);
  }, [transactions, loaded]);

  const addTransaction = useCallback((tx: Omit<Transaction, 'id' | 'createdAt'>) => {
    const newTx: Transaction = {
      ...tx,
      id: `tx_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    setTransactions((prev) => [newTx, ...prev]);
  }, []);

  const updateTransaction = useCallback(
    (id: string, updates: Partial<Omit<Transaction, 'id' | 'createdAt'>>) => {
      setTransactions((prev) =>
        prev.map((tx) => (tx.id === id ? { ...tx, ...updates } : tx))
      );
    },
    []
  );

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((tx) => tx.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setTransactions([]);
    clearStorage(STORAGE_KEYS.TRANSACTIONS);
  }, []);

  return (
    <TransactionContext.Provider
      value={{ transactions, isLoading, addTransaction, updateTransaction, deleteTransaction, clearAll }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
