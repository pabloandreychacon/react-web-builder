import { create } from 'zustand';

export interface Order {
  id: string;
  userId: string;
  items: any[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  paymentMethod: 'paypal' | 'credit_card';
  createdAt: Date;
  updatedAt: Date;
}

interface OrderStore {
  orders: Order[];
  currentOrder: Order | null;
  setOrders: (orders: Order[]) => void;
  addOrder: (order: Order) => void;
  setCurrentOrder: (order: Order | null) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  currentOrder: null,

  setOrders: (orders) => {
    set({ orders });
  },

  addOrder: (order) => {
    set((state) => ({
      orders: [...state.orders, order],
      currentOrder: order,
    }));
  },

  setCurrentOrder: (order) => {
    set({ currentOrder: order });
  },

  updateOrderStatus: (orderId, status) => {
    set((state) => ({
      orders: state.orders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      ),
    }));
  },
}));
