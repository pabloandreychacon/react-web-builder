import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';
import { ExternalLink } from 'lucide-react';
import SEO from '../components/SEO';

export default function Domains() {
  const { language } = useLanguageStore();
  const t = translations[language].domains;

  const providers = [
    {
      name: 'GoDaddy',
      logo: '',
      url: 'https://www.godaddy.com'
    },
    {
      name: 'Namecheap',
      logo: '',
      url: 'https://www.namecheap.com'
    },
    {
      name: 'Google Domains',
      logo: '',
      url: 'https://domains.google.com'
    },
    {
      name: 'Bluehost',
      logo: '',
      url: 'https://www.bluehost.com'
    },
    {
      name: 'HostGator',
      logo: '',
      url: 'https://www.hostgator.com'
    },
    {
      name: 'SiteGround',
      logo: '',
      url: 'https://www.siteground.com'
    }
  ];

  return (
    <>
      <SEO
        title="Domain Registration - Go Online Now"
        description="Find and register the perfect domain name for your website. Compare domain providers and get the best deals on domain registration."
        keywords="domain registration, buy domain, domain names, website domain, domain providers"
      />
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <section className="bg-blue-600 text-white py-12 px-4 w-full">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
            <p className="text-base text-blue-100">{t.subtitle}</p>
          </div>
        </section>

        {/* What is a Domain? Section */}
        <section className="py-12 px-4 w-full border-b border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-bold mb-6 text-gray-900">{t.whatIsDomain}</h2>
                <p className="text-lg text-gray-600 leading-relaxed mb-8">
                  {t.domainDescription}
                </p>
              </div>
              <div className="bg-blue-50 p-8 rounded-2xl border border-blue-100 shadow-sm">
                <h3 className="text-xl font-bold mb-6 text-blue-900">{t.whyBuyTitle}</h3>
                <ul className="space-y-4">
                  {t.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm mt-0.5">
                        ✓
                      </span>
                      <span className="text-blue-800">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Domain Providers */}
        <section className="py-12 px-4 w-full">
          <div className="max-w-7xl mx-auto w-full">
            <h2 className="text-2xl font-bold mb-8">{t.popularProviders}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((provider) => (
                <a
                  key={provider.name}
                  href={provider.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition group"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="text-4xl">{provider.logo}</span>
                      <h3 className="text-xl font-bold text-gray-900">{provider.name}</h3>
                    </div>
                    <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition" />
                  </div>
                  <p className="mt-4 text-sm text-blue-600 font-semibold group-hover:underline">
                    {t.visitWebsite} →
                  </p>
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
