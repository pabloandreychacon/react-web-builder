import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { loadPayPalScript } from '../lib/paypal';

export default function Cart() {
  const navigate = useNavigate();
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const updateQuantity = useCartStore((state) => state.updateQuantity);
  const getTotal = useCartStore((state) => state.getTotal);
  const [paymentMethod, setPaymentMethod] = useState<'paypal' | 'credit_card'>('paypal');
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    if (items.length === 0) return;

    setIsLoading(true);
    try {
      if (paymentMethod === 'paypal') {
        // Load PayPal script and implement checkout
        await loadPayPalScript();
        console.log('PayPal loaded. Integration would happen here.');
        // In production, you would render PayPal buttons here
      } else {
        // Credit card checkout logic
        console.log('Processing credit card payment...');
        // Implementar lógica de Stripe o similar
      }
    } catch (error) {
      console.error('Checkout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">Start by choosing a website package or domain</p>
            <div className="space-x-4">
              <button
                onClick={() => navigate('/websites')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
              >
                Browse Websites
              </button>
              <button
                onClick={() => navigate('/domains')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition"
              >
                Find a Domain
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-12">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-lg shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-lg">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.type}</p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-red-600 hover:text-red-800 transition"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-4">
                    <label htmlFor={`qty-${item.id}`} className="text-sm text-gray-600">
                      Quantity:
                    </label>
                    <div className="flex items-center border border-gray-300 rounded">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        −
                      </button>
                      <input
                        type="number"
                        id={`qty-${item.id}`}
                        value={item.quantity}
                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                        className="w-12 text-center border-l border-r border-gray-300 py-1"
                      />
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-gray-600">${item.price}/month</p>
                    <p className="font-bold text-lg">${(item.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-8 rounded-lg shadow h-fit">
            <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-gray-600">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span className="text-blue-600">${getTotal().toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-600 text-center mt-2">
                Billed monthly
              </p>
            </div>

            <div className="mb-6 space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="paypal"
                  checked={paymentMethod === 'paypal'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">PayPal</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  value="credit_card"
                  checked={paymentMethod === 'credit_card'}
                  onChange={(e) => setPaymentMethod(e.target.value as 'credit_card')}
                  className="w-4 h-4"
                />
                <span className="text-gray-700">Credit Card</span>
              </label>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isLoading || items.length === 0}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition"
            >
              {isLoading ? 'Processing...' : `Proceed to ${paymentMethod === 'paypal' ? 'PayPal' : 'Payment'}`}
            </button>

            <button
              onClick={() => navigate('/websites')}
              className="w-full mt-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
