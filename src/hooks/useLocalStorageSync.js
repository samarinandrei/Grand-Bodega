import { useEffect } from 'react';
import useStore from '../store';

export default function useLocalStorageSync() {
  const { order, isDark } = useStore();

  useEffect(() => {
    localStorage.setItem('grandBodegaOrder', JSON.stringify(order));
  }, [order]);

  useEffect(() => {
    localStorage.setItem('grandBodegaTheme', isDark ? 'dark' : 'light');
  }, [isDark]);

  useEffect(() => {
    const savedOrder = localStorage.getItem('grandBodegaOrder');
    if (savedOrder) {
      try {
        const parsed = JSON.parse(savedOrder);
        if (Array.isArray(parsed)) useStore.setState({ order: parsed });
      } catch {}
    }

    const savedTheme = localStorage.getItem('grandBodegaTheme');
    if (savedTheme === 'light') useStore.setState({ isDark: false });
  }, []);
}