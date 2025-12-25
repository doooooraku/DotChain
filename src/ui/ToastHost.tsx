import { useEffect, useState } from 'react';

import { Toast } from '@/src/ui/Toast';
import { useHabitStore } from '@/src/stores/habitStore';
import { useUiStore } from '@/src/stores/uiStore';

export default function ToastHost() {
  const error = useHabitStore((s) => s.error);
  const toasts = useUiStore((s) => s.toasts);
  const removeToast = useUiStore((s) => s.removeToast);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [kind, setKind] = useState<'info' | 'error'>('info');

  useEffect(() => {
    const active = toasts[0];
    if (!active) return;

    setMessage(active.message);
    setKind(active.kind);
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      removeToast(active.id);
    }, 2000);

    return () => clearTimeout(timer);
  }, [toasts, removeToast]);

  useEffect(() => {
    if (toasts.length > 0) return;
    if (!error) return;

    setMessage(error);
    setKind('error');
    setVisible(true);
    const timer = setTimeout(() => setVisible(false), 2000);
    return () => clearTimeout(timer);
  }, [error, toasts.length]);

  return <Toast visible={visible} message={message} kind={kind} />;
}
