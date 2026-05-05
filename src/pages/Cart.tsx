import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';
import SEO from '../components/SEO';

export default function Cart() {
  const navigate = useNavigate();
  const { language } = useLanguageStore();
  const t = translations[language].cart;
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const getTotal = useCartStore((state) => state.getTotal);

  const handleCheckout = () => {
    if (items.length === 0) return;
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <>
        <SEO
          title="Shopping Cart - Go Online Now"
          description="Review your shopping cart. Add website packages and domains before proceeding to checkout."
          keywords="shopping cart, website cart, checkout, domain cart, order summary"
        />
        <div className="min-h-screen flex flex-col bg-gray-50">
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center">
              <ShoppingCart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.emptyTitle}</h1>
              <p className="text-gray-600 mb-8">{t.emptySubtitle}</p>
              <div className="space-x-4">
                <button
                  onClick={() => navigate('/websites')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition"
                >
                  {t.browseWebsites}
                </button>
                <button
                  onClick={() => navigate('/domains')}
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 px-6 py-2 rounded-lg transition"
                >
                  {t.findDomain}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Shopping Cart - Go Online Now"
        description="Review your shopping cart. Add website packages and domains before proceeding to checkout."
        keywords="shopping cart, website cart, checkout, domain cart, order summary"
      />
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h1 className="text-4xl font-bold mb-12">{t.title}</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <div key={item.id} className="bg-white p-6 rounded-lg shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-gray-600 text-sm uppercase">{item.type}</p>
                      {item.details?.pages && (
                        <p className="text-sm text-gray-600">{item.details.pages} {t.pages}</p>
                      )}
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-800 transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="flex justify-between items-center">
                    <div />
                    <div className="text-right">
                      <p className="text-sm text-gray-600">${item.price.toFixed(2)}</p>
                      <p className="font-bold text-lg">${item.price.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-white p-8 rounded-lg shadow h-fit">
              <h2 className="text-2xl font-bold mb-6">{t.orderSummary}</h2>

              <div className="space-y-4 mb-6 border-b border-gray-200 pb-6">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between text-gray-600">
                    <span>{item.name}{item.details?.pages ? ` (${item.details.pages} ${t.pages})` : ''}</span>
                    <span>${item.price.toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex justify-between text-lg font-bold">
                  <span>{t.total}</span>
                  <span className="text-blue-600">${getTotal().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={items.length === 0}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-3 rounded-lg transition shadow-md hover:shadow-lg transform transition active:scale-95"
              >
                {t.proceedToCheckout}
              </button>

              <button
                onClick={() => navigate('/websites')}
                className="w-full mt-3 border-2 border-blue-600 text-blue-600 hover:bg-blue-50 font-bold py-3 rounded-lg transition"
              >
                {t.continueShopping}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
