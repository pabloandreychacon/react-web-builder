import WebsitePackage from './WebsitePackage';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

interface PricingGridProps {
  limit?: number;
}

export default function PricingGrid({ limit }: PricingGridProps) {
  const { language } = useLanguageStore();
  const pricingPlans = translations[language].pricing.plans;

  const packages = [
    {
      id: 'starter',
      price: 50,
    },
    {
      id: 'professional',
      price: 100,
      popular: true,
    },
    {
      id: 'enterprise',
      price: 200,
    },
    {
      id: 'ecommerce',
      price: 2000,
    },
  ];

  const displayPackages = limit ? packages.slice(0, limit) : packages;

  return (
    <div className={`grid grid-cols-1 md:grid-cols-${displayPackages.length >= 3 ? 3 : displayPackages.length} gap-10`}>
      {displayPackages.map((pkg) => {
        const planData = pricingPlans[pkg.id as keyof typeof pricingPlans];
        if (!planData) return null;

        return (
          <WebsitePackage
            key={pkg.id}
            id={pkg.id}
            name={planData.name}
            description={planData.description}
            price={pkg.price}
            features={planData.features}
            popular={pkg.popular}
            priceLabel={pkg.id === 'starter'
              ? (language === 'es' ? '/página' : '/page')
              : (pkg.id === 'professional' || pkg.id === 'enterprise' || pkg.id === 'ecommerce')
                ? ''
                : (language === 'es' ? '/mes' : '/month')}
            language={language as 'es' | 'en'}
          />
        );
      })}
    </div>
  );
}
