import PricingGrid from '../components/PricingGrid';
import WebsiteFaq from '../components/WebsiteFaq';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function Websites() {
  const { language } = useLanguageStore();
  const t = translations[language].websites;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white py-12 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-base text-blue-100">{t.subtitle}</p>
        </div>
      </section>

      {/* Domain Info Notice */}
      <section className="py-8 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-r-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-blue-900">{t.domainNoticeTitle}</h3>
                <p className="mt-1 text-blue-800">
                  {t.domainNotice}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="pb-12 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <PricingGrid />
        </div>
      </section>

      {/* Info Section removed as requested */}

      {/* FAQ Section */}
      <WebsiteFaq />
    </div>
  );
}
