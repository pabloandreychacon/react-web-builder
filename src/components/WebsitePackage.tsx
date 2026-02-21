import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';

interface WebsitePackageProps {
  id: string;
  name: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

export default function WebsitePackage({
  id,
  name,
  description,
  price,
  features,
  popular = false,
}: WebsitePackageProps) {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    addItem({
      id,
      name,
      price,
      quantity: 1,
      type: 'website',
      details: { description, features },
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
        <span className={popular ? 'text-blue-100' : 'text-gray-600'}>/month</span>
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
