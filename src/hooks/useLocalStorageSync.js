import { useEffect } from "react";
import useStore from "../store";

const STORAGE_KEY = "grandBodegaOrder";

export default function useLocalStorageSync() {
  const { order, addToOrder, changeQty, removeItem, clearOrder } = useStore();

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          useStore.setState({ order: [] });

          parsed.forEach((item) => {
            useStore.getState().addToOrder({
              name: item.name,
              price: item.price,
              recipe: item.recipe || [],
              note: item.note,
            });

            useStore.getState().changeQty(item.name, item.qty - 1);
          });

          console.log("Loaded order from localStorage:", parsed);
        }
      }
    } catch (err) {
      console.error("Failed to load order from localStorage:", err);
      localStorage.removeItem(STORAGE_KEY); // clean broken data
    }
  }, []);

  useEffect(() => {
    try {
      if (order.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(order));
        console.log("Saved order to localStorage:", order);
      } else {
        localStorage.removeItem(STORAGE_KEY);
        console.log("Cleared localStorage (empty order)");
      }
    } catch (err) {
      console.error("Failed to save order to localStorage:", err);
    }
  }, [order]);
}
