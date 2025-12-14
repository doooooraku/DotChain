import { useEffect, useState } from 'react';

import { Toast } from '@/src/ui/Toast';
import { useHabitStore } from '@/src/stores/habitStore';

export default function ToastHost() {
  const error = useHabitStore((s) => s.error);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (error) {
      setMessage(error);
      setVisible(true);
      const timer = setTimeout(() => setVisible(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return <Toast visible={visible} message={message} kind="error" />;
}
