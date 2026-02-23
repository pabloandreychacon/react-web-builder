import { Check, ShoppingCart } from 'lucide-react';
import { useState } from 'react';
import { useCartStore } from '../stores/cartStore';

interface DomainCheckerProps {
  registrars: Array<{
    name: string;
    price: number;
    id: string;
  }>;
}

export default function DomainChecker({ registrars }: DomainCheckerProps) {
  const [domain, setDomain] = useState('');
  const [available, setAvailable] = useState<boolean | null>(null);
  const addItem = useCartStore((state) => state.addItem);

  const handleCheckDomain = (e: React.FormEvent) => {
    e.preventDefault();
    // Simular verificación de disponibilidad
    // En producción, llamar a un API real
    const isAvailable = Math.random() > 0.3;
    setAvailable(isAvailable);
  };

  const handleAddDomain = (registrar: typeof registrars[0]) => {
    if (domain) {
      addItem({
        id: `${domain}-${registrar.id}`,
        name: `${domain} (${registrar.name})`,
        price: registrar.price,
        type: 'domain',
        details: { domain, registrar: registrar.id },
      });
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-12">
      <h2 className="text-4xl font-bold text-center mb-12">Find Your Perfect Domain</h2>

      <form onSubmit={handleCheckDomain} className="mb-10">
        <div className="flex flex-col sm:flex-row gap-6">
          <input
            type="text"
            placeholder="Enter domain name (e.g., mysite.com)"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            className="flex-1 px-5 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base"
          />
          <button
            type="submit"
            disabled={!domain}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-8 py-4 rounded-lg font-semibold transition text-base"
          >
            Check
          </button>
        </div>
      </form>

      {available !== null && (
        <div className={`mb-10 p-6 rounded-lg ${available
          ? 'bg-green-50 border border-green-200'
          : 'bg-red-50 border border-red-200'
          }`}>
          <div className="flex items-center space-x-3">
            <Check className={`w-6 h-6 ${available ? 'text-green-600' : 'text-red-600'}`} />
            <p className={`text-base ${available ? 'text-green-800' : 'text-red-800'}`}>
              {available
                ? `Great! ${domain} is available`
                : `Oops! ${domain} is not available. Try another one.`}
            </p>
          </div>
        </div>
      )}

      {available && domain && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {registrars.map((registrar) => (
            <div key={registrar.id} className="border border-gray-200 rounded-lg p-10 hover:shadow-lg transition">
              <h3 className="font-bold text-2xl mb-4">{registrar.name}</h3>
              <p className="text-4xl font-bold text-blue-600 mb-8">
                ${registrar.price}
                <span className="text-base text-gray-600 font-normal">/year</span>
              </p>
              <button
                onClick={() => handleAddDomain(registrar)}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold flex items-center justify-center space-x-2 transition text-lg"
              >
                <ShoppingCart className="w-4 h-4" />
                <span>Add to Cart</span>
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
