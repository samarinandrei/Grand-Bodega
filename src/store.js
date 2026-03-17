import { create } from 'zustand';

const useStore = create((set) => ({
  order: [],
  isDark: true,

  addToOrder: (drink) =>
    set((state) => {
      const existing = state.order.find((i) => i.name === drink.name);
      if (existing) {
        return { order: state.order.map((i) => i.name === drink.name ? { ...i, qty: i.qty + 1 } : i) };
      }
      return { order: [...state.order, { ...drink, qty: 1 }] };
    }),

  changeQty: (name, delta) =>
    set((state) => ({
      order: state.order
        .map((item) => item.name === name ? { ...item, qty: Math.max(1, item.qty + delta) } : item)
        .filter((item) => item.qty >= 1),
    })),

  removeItem: (name) =>
    set((state) => ({ order: state.order.filter((item) => item.name !== name) })),

  clearOrder: () => set({ order: [] }),

  toggleTheme: () => set((state) => ({ isDark: !state.isDark })),
}));

export default useStore;