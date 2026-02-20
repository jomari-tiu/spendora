import { Category } from '../types';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'cat_food',          name: 'Food',          icon: '🍔', color: '#F97316', isDefault: true },
  { id: 'cat_bills',         name: 'Bills',         icon: '🧾', color: '#8B5CF6', isDefault: true },
  { id: 'cat_transport',     name: 'Transport',     icon: '🚗', color: '#3B82F6', isDefault: true },
  { id: 'cat_salary',        name: 'Salary',        icon: '💼', color: '#10B981', isDefault: true },
  { id: 'cat_shopping',      name: 'Shopping',      icon: '🛍️', color: '#EC4899', isDefault: true },
  { id: 'cat_entertainment', name: 'Entertainment', icon: '🎬', color: '#F59E0B', isDefault: true },
  { id: 'cat_health',        name: 'Health',        icon: '💊', color: '#EF4444', isDefault: true },
  { id: 'cat_other',         name: 'Other',         icon: '📦', color: '#6B7280', isDefault: true },
];
