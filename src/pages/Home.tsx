import { Link } from 'react-router-dom';
import { Zap, Globe, Rocket, Shield } from 'lucide-react';
import homewebBg from '../assets/homeweb.jpg';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function Home() {
  const { language } = useLanguageStore();
  const t = translations[language].home;
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="relative py-32 px-4 w-full text-white overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 animate-zoom" style={{ backgroundImage: `url(${homewebBg})`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
        {/* Overlay */}
        <div className="absolute inset-0 bg-blue-900/70"></div>

        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            {t.hero.title}
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-slide-in animation-delay-300">
            {t.hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16">
            <Link
              to="/websites"
              className="bg-white text-blue-600 px-10 py-5 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition duration-300 text-lg"
            >
              {t.hero.startBuilding}
            </Link>
            <Link
              to="/domains"
              className="border-2 border-white text-white px-10 py-5 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition duration-300 text-lg"
            >
              {t.hero.findDomain}
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            <div className="animate-bounce animation-delay-100">
              <div className="text-3xl font-bold">10K+</div>
              <div className="text-blue-100">{t.hero.websitesBuilt}</div>
            </div>
            <div className="animate-bounce animation-delay-300">
              <div className="text-3xl font-bold">5K+</div>
              <div className="text-blue-100">{t.hero.activeUsers}</div>
            </div>
            <div className="animate-bounce animation-delay-500">
              <div className="text-3xl font-bold">99.9%</div>
              <div className="text-blue-100">{t.hero.uptime}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 w-full bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-center mb-20">{t.features.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                icon: Zap,
                title: t.features.fast,
                description: t.features.fastDesc,
              },
              {
                icon: Globe,
                title: t.features.global,
                description: t.features.globalDesc,
              },
              {
                icon: Rocket,
                title: t.features.easy,
                description: t.features.easyDesc,
              },
              {
                icon: Shield,
                title: t.features.secure,
                description: t.features.secureDesc,
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="p-8 bg-gray-50 rounded-lg hover:shadow-lg transition transform hover:scale-105 duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <feature.icon className="w-14 h-14 text-blue-600 mb-6" />
                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                <p className="text-gray-600 text-base">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview Section */}
      <section className="py-24 px-4 w-full bg-gray-50">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-center mb-20">{t.pricing.title}</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                name: t.pricing.starter,
                price: '9.99',
                features: [`1 ${t.pricing.website}`, `100 MB ${t.pricing.storage}`, t.pricing.basicSupport],
              },
              {
                name: t.pricing.professional,
                price: '19.99',
                features: [`5 ${t.pricing.websites}`, `1 GB ${t.pricing.storage}`, t.pricing.prioritySupport],
                popular: true,
              },
              {
                name: t.pricing.enterprise,
                price: '49.99',
                features: [t.pricing.unlimitedWebsites, t.pricing.unlimitedStorage, t.pricing.support247],
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`p-8 rounded-lg text-center transform transition hover:scale-105 ${plan.popular
                  ? 'bg-blue-600 text-white shadow-xl'
                  : 'bg-white border border-gray-200'
                  }`}
              >
                <h3 className="text-2xl font-bold mb-4">{plan.name}</h3>
                <div className="text-4xl font-bold mb-4">
                  ${plan.price}
                  <span className="text-lg text-gray-400">{t.pricing.perMonth}</span>
                </div>
                <ul className="space-y-2 mb-8 text-left">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center space-x-2">
                      <span>✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-lg font-bold transition ${plan.popular
                  ? 'bg-white text-blue-600 hover:bg-gray-100'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}>
                  {t.pricing.getStarted}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link to="/pricing" className="text-blue-600 font-bold hover:underline">
              {t.pricing.viewAllPlans}
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 w-full bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto w-full text-center">
          <h2 className="text-4xl font-bold mb-8">{t.cta.title}</h2>
          <p className="text-xl mb-10 text-blue-100">
            {t.cta.subtitle}
          </p>
          <Link
            to="/signup"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition duration-300"
          >
            {t.cta.startTrial}
          </Link>
        </div>
      </section>
    </div>
  );
}

// Add animations to global styles
const style = document.createElement('style');
style.textContent = `
  @keyframes blob {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -50px) scale(1.1); }
    66% { transform: translate(-20px, 20px) scale(0.9); }
  }

  @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slide-in {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .animate-blob {
    animation: blob 7s infinite;
  }

  .animation-delay-2000 {
    animation-delay: 2s;
  }

  .animation-delay-4000 {
    animation-delay: 4s;
  }

  .animation-delay-100 {
    animation-delay: 100ms;
  }

  .animation-delay-300 {
    animation-delay: 300ms;
  }

  .animation-delay-500 {
    animation-delay: 500ms;
  }

  .animate-fade-in {
    animation: fade-in 1s ease-in;
  }

  .animate-slide-in {
    animation: slide-in 1s ease-in;
  }
`;
if (typeof document !== 'undefined') {
  document.head.appendChild(style);
}
