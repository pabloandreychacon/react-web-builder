import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  type: 'domain' | 'website' | 'addon';
  details?: any;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemsCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const state = get();
        const existingItem = state.items.find(i => i.id === item.id);

        if (existingItem) {
          // Replace existing item with the provided one (accept provided price/details)
          set({
            items: state.items.map(i => (i.id === item.id ? { ...i, ...item } : i)),
          });
        } else {
          set({
            items: [...state.items, { ...item }],
          });
        }
      },

      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id),
        }));
      },

      // updateQuantity removed: cart items are single entries with a final price

      clearCart: () => {
        set({ items: [] });
      },

      getTotal: () => {
        return get().items.reduce((total, item) => total + item.price, 0);
      },

      getItemsCount: () => {
        return get().items.length;
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
