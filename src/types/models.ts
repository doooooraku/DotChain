export type ProState = {
  isPro: boolean;
  anonUserId: string | null;
  lastCheckAt: string | null;
};

export type ToastKind = 'info' | 'error';

export type ToastMessage = {
  id: string;
  message: string;
  kind: ToastKind;
  createdAt: string;
};
