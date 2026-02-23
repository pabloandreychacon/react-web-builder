import { useState } from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

interface WebsitePackageProps {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
  priceLabel?: string;
  language?: 'es' | 'en';
}

export default function WebsitePackage({
  id,
  name,
  description,
  price,
  features,
  popular = false,
  priceLabel = '/month',
  language = 'en',
}: WebsitePackageProps) {
  const [quantity, setQuantity] = useState(
    id === 'starter' ? 2 : id === 'professional' || id === 'enterprise' ? 5 : 1
  );
  const addItem = useCartStore((state) => state.addItem);

  const computeTotalPrice = () => {
    if (id === 'starter') return price * quantity;
    if (id === 'professional' || id === 'enterprise') return price + Math.max(0, quantity - 5) * 25;
    return price;
  };

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price: computeTotalPrice(),
      type: 'website',
      details: { description, features, pages: id === 'starter' || id === 'professional' || id === 'enterprise' ? quantity : 1 },
    });
  };

  return (
    <div className={`rounded-lg p-12 transition hover:shadow-lg ${popular
      ? 'bg-blue-600 text-white shadow-xl scale-105'
      : 'bg-white text-gray-900 border border-gray-200'
      }`}>
      {popular && (
        <div className="flex items-center justify-center mb-10 space-x-2">
          <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
          <span className="text-base font-semibold">MOST POPULAR</span>
        </div>
      )}

      <h3 className="text-3xl font-bold mb-4">{name}</h3>
      <p className={`text-base mb-8 ${popular ? 'text-blue-100' : 'text-gray-600'}`}>
        {description}
      </p>

      <div className="mb-10">
        <span className="text-5xl font-bold">${price}</span>
        <span className={popular ? 'text-blue-100' : 'text-gray-600'}>{priceLabel}</span>
      </div>

      <ul className="space-y-5 mb-10">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start space-x-2">
            <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${popular ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-600'
              }`}>
              ✓
            </div>
            <span className="text-sm">{feature}</span>
          </li>
        ))}
      </ul>

      {(id === 'starter' || id === 'professional' || id === 'enterprise') && (
        <div className="mb-8">
          <label className={`block text-sm font-semibold mb-3 ${popular ? 'text-white' : 'text-gray-700'}`}>
            {language === 'es' ? 'Número de páginas:' : 'Number of Pages:'}
            {(id === 'professional' || id === 'enterprise') && language === 'es' ? ' (mín 5)' : ''}
            {(id === 'professional' || id === 'enterprise') && language === 'en' ? ' (min 5)' : ''}
          </label>
          <input
            type="number"
            min={id === 'starter' ? 2 : 5}
            max={20}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(Math.max(parseInt(e.target.value) || (id === 'starter' ? 2 : 5), id === 'starter' ? 2 : 5), 20))}
            className={`w-full px-4 py-2 rounded-lg border ${popular
              ? 'bg-blue-500 border-blue-400 text-white'
              : 'bg-white border-gray-300 text-gray-900'
              } focus:outline-none focus:ring-2 focus:ring-blue-500`}
          />
          {(id === 'professional' || id === 'enterprise') && (
            <p className={`text-xs mt-2 ${popular ? 'text-blue-100' : 'text-gray-600'}`}>
              {language === 'es' ? '+$25 por página adicional' : '+$25 per additional page'}
            </p>
          )}
          <p className={`text-xs mt-2 ${popular ? 'text-blue-100' : 'text-gray-600'}`}>
            {language === 'es' ? 'Total:' : 'Total:'} ${computeTotalPrice().toFixed(2)}
          </p>
        </div>
      )}

      <button
        onClick={handleAddToCart}
        className={`w-full py-4 rounded-lg font-semibold transition flex items-center justify-center space-x-3 text-lg ${popular
          ? 'bg-white text-blue-600 hover:bg-gray-100'
          : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>Add to Cart</span>
      </button>
    </div>
  );
}
