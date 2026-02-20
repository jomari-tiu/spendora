import { useContext } from 'react';
import { CategoryContext } from '../context/CategoryContext';

export function useCategories() {
  return useContext(CategoryContext);
}
