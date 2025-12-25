import { create } from 'zustand';

import type { ProState } from '@/src/types/models';
import { proService } from '@/src/services/proService';

type ProStoreState = ProState & {
  isLoading: boolean;
  init: () => Promise<void>;
  purchaseMonthly: () => Promise<ProState>;
  purchaseYearly: () => Promise<ProState>;
  restore: () => Promise<{ state: ProState; hasActive: boolean }>;
};

const emptyState: ProState = {
  isPro: false,
  anonUserId: null,
  lastCheckAt: null,
};

export const useProStore = create<ProStoreState>((set) => ({
  ...emptyState,
  isLoading: false,

  async init() {
    set({ isLoading: true });
    try {
      const local = await proService.loadLocalState();
      if (local) {
        set({ ...local });
      }
      const remote = await proService.refreshCustomerInfo();
      if (remote) {
        set({ ...remote });
      }
    } catch (error) {
      console.warn('Pro init failed', error);
    } finally {
      set({ isLoading: false });
    }
  },

  async purchaseMonthly() {
    set({ isLoading: true });
    try {
      const next = await proService.purchase('monthly');
      set({ ...next });
      return next;
    } finally {
      set({ isLoading: false });
    }
  },

  async purchaseYearly() {
    set({ isLoading: true });
    try {
      const next = await proService.purchase('yearly');
      set({ ...next });
      return next;
    } finally {
      set({ isLoading: false });
    }
  },

  async restore() {
    set({ isLoading: true });
    try {
      const result = await proService.restore();
      set({ ...result.state });
      return result;
    } finally {
      set({ isLoading: false });
    }
  },
}));
