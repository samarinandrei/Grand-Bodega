import { useEffect } from 'react';
import useStore from '../store';

export default function useLocalStorageSync() {
  useEffect(() => {
    const saved = localStorage.getItem('grandBodegaOrder');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        useStore.setState({ order: parsed });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('grandBodegaOrder', JSON.stringify(useStore.getState().order));
  }, [useStore.getState().order]);
}