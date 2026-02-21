// PayPal Integration Configuration

export const PAYPAL_CONFIG = {
  clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'YOUR_PAYPAL_CLIENT_ID',
  // Cambiar a 'production' para ambiente de producción
  environment: (import.meta.env.VITE_PAYPAL_ENVIRONMENT || 'sandbox') as 'sandbox' | 'production',
  currency: 'USD',
};

// Script loader para PayPal Checkout
export const loadPayPalScript = (): Promise<any> => {
  return new Promise((resolve, reject) => {
    if ((window as any).paypal) {
      resolve((window as any).paypal);
      return;
    }

    const script = document.createElement('script');
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CONFIG.clientId}&currency=${PAYPAL_CONFIG.currency}`;
    script.async = true;
    script.onload = () => {
      resolve((window as any).paypal);
    };
    script.onerror = () => {
      reject(new Error('Failed to load PayPal script'));
    };
    document.head.appendChild(script);
  });
};

export interface PayPalOrder {
  id: string;
  userId: string;
  items: Array<{
    name: string;
    amount: number;
    quantity: number;
  }>;
  total: number;
  status: 'created' | 'approved' | 'completed' | 'failed';
  paypalOrderId?: string;
}

export const paypalService = {
  async createOrder(total: number, items: Array<{ name: string; quantity: number; price: number }>) {
    // Este es un ejemplo básico
    // En producción, deberías hacer la llamada al servidor
    return {
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: PAYPAL_CONFIG.currency,
            value: total.toFixed(2),
            breakdown: {
              item_total: {
                currency_code: PAYPAL_CONFIG.currency,
                value: total.toFixed(2),
              },
            },
          },
          items: items.map(item => ({
            name: item.name,
            quantity: item.quantity.toString(),
            unit_amount: {
              currency_code: PAYPAL_CONFIG.currency,
              value: item.price.toFixed(2),
            },
          })),
        },
      ],
    };
  },

  async onApprove(data: any) {
    // Aquí iría la lógica para completar el pago
    console.log('PayPal Order approved:', data);
    return { success: true, orderId: data.orderID };
  },

  async onError(err: any) {
    console.error('PayPal Error:', err);
    throw err;
  },
};
