import { create } from 'zustand';

import type { ToastMessage, ToastKind } from '@/src/types/models';

type UiState = {
  toasts: ToastMessage[];
  showToast: (toast: { message: string; kind?: ToastKind }) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
};

export const useUiStore = create<UiState>((set, get) => ({
  toasts: [],
  showToast: ({ message, kind = 'info' }) => {
    const id = `${Date.now()}_${Math.random().toString(16).slice(2)}`;
    const createdAt = new Date().toISOString();
    set({ toasts: [...get().toasts, { id, message, kind, createdAt }] });
  },
  removeToast: (id) => {
    set({ toasts: get().toasts.filter((toast) => toast.id !== id) });
  },
  clearToasts: () => {
    set({ toasts: [] });
  },
}));
