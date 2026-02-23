import { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function WebsiteFaq() {
  const { language } = useLanguageStore();
  const t = translations[language].websites.faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-24 px-4 w-full bg-white">
      <div className="max-w-4xl mx-auto w-full">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-blue-100 text-blue-600 rounded-2xl mb-4">
            <HelpCircle className="w-8 h-8" />
          </div>
          <h2 className="text-4xl font-bold text-gray-900">{t.title}</h2>
        </div>

        <div className="space-y-4">
          {t.list.map((item: any, index: number) => (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${openIndex === index
                  ? 'border-blue-500 bg-blue-50/30'
                  : 'border-gray-200 bg-white hover:border-blue-200'
                }`}
            >
              <button
                className="w-full text-left p-6 flex justify-between items-center"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="text-lg font-bold text-gray-900 pr-8">{item.q}</span>
                {openIndex === index ? (
                  <ChevronUp className="w-6 h-6 text-blue-600 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0" />
                )}
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-blue-100/50 mt-4">
                  {item.a}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
