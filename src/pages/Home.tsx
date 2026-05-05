import { Link } from 'react-router-dom';
import { Zap, Globe, Rocket, Shield } from 'lucide-react';
import homewebBg from '../assets/homeweb.jpg';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';
import PricingGrid from '../components/PricingGrid';
import SEO from '../components/SEO';
// import Testimonials from '../components/Testimonials';
// import Portfolio from '../components/Portfolio';

export default function Home() {
  const { language } = useLanguageStore();
  const t = translations[language].home;

  return (
    <>
      <SEO
        title="Go Online Now - Create Your Website Today"
        description="Build professional websites instantly with Go Online Now. Create stunning web presences with our easy-to-use website builder. Get online today!"
        keywords="website builder, web design, create website, online presence, professional websites"
      />
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

            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-16 px-4">
              <Link
                to="/websites"
                className="bg-white text-blue-600 px-6 py-4 rounded-lg font-bold hover:shadow-lg transform hover:scale-105 transition duration-300 text-lg flex-1 sm:flex-none"
              >
                {t.hero.startBuilding}
              </Link>
              <Link
                to="/domains"
                className="border-2 border-white text-white px-6 py-4 rounded-lg font-bold hover:bg-white hover:text-blue-600 transition duration-300 text-lg flex-1 sm:flex-none"
              >
                {t.hero.findDomain}
              </Link>
              <Link
                to="/templates"
                className="bg-blue-500 text-white px-6 py-4 rounded-lg font-bold hover:bg-blue-400 transition duration-300 text-lg flex-1 sm:flex-none shadow-lg border border-blue-400"
              >
                {t.hero.viewTemplates}
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <div className="animate-bounce animation-delay-100 flex flex-col items-center justify-center">
                <div className="text-xl font-bold leading-tight">{t.hero.heroStat1}</div>
              </div>
              <div className="animate-bounce animation-delay-300 flex flex-col items-center justify-center">
                <div className="text-xl font-bold leading-tight">{t.hero.heroStat2}</div>
              </div>
              <div className="animate-bounce animation-delay-500 flex flex-col items-center justify-center">
                <div className="text-xl font-bold leading-tight">{t.hero.heroStat3}</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24 px-4 w-full bg-white text-gray-900 border-b border-gray-100">
          <div className="max-w-7xl mx-auto w-full text-center">
            <h2 className="text-4xl font-bold mb-16">{t.features.title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                  className="group p-8 bg-blue-50/50 rounded-2xl hover:bg-blue-600 hover:text-white transition-all duration-500 shadow-sm"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-xl flex items-center justify-center mx-auto mb-6 group-hover:bg-white group-hover:text-blue-600 transition-colors duration-500">
                    <feature.icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-gray-600 group-hover:text-blue-50 transition-colors duration-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        {/* <Testimonials /> */}

        {/* Pricing Preview Section */}
        <section className="py-24 px-4 w-full bg-gray-50">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-center mb-20">{t.pricing.title}</h2>

            <PricingGrid limit={3} />

            <div className="text-center mt-12">
              <Link to="/websites" className="text-blue-600 font-bold hover:underline">
                {t.pricing.viewAllPlans}
              </Link>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-24 px-4 w-full bg-gray-50">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-4xl font-bold text-center mb-20">{t.portfolio.title}</h2>

            {/* iframe to https://andreychaconresumereact.netlify.app/portfolio */}
            <iframe
              src="https://andreychaconresumereact.netlify.app/portfolio"
              className="w-full h-[600px] border-0"
              title="Portfolio"
            />

          </div>
        </section>
      </div>
    </>
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
