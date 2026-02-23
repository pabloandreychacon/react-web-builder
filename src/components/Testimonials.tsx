import { Quote, Star } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function Testimonials() {
  const { language } = useLanguageStore();
  const t = translations[language].home.testimonials;

  return (
    <section className="py-24 px-4 w-full bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full text-center">
        <h2 className="text-4xl font-bold mb-20">{t.title}</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {t.list.map((testimonial: any, index: number) => (
            <div
              key={index}
              className="relative p-10 bg-gray-50 rounded-3xl border border-gray-100 transition hover:shadow-2xl hover:-translate-y-2 duration-500 text-left"
            >
              <Quote className="absolute top-8 right-10 w-12 h-12 text-blue-100 opacity-50" />
              <div className="relative">
                <div className="flex mb-6 space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>

                <p className="text-gray-700 text-xl italic mb-10 leading-relaxed font-medium">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="flex-shrink-0 w-16 h-16 bg-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-2xl shadow-lg transform -rotate-3 group-hover:rotate-0 transition-transform">
                    {testimonial.author[0]}
                  </div>
                  <div className="ml-5">
                    <h4 className="font-bold text-xl text-gray-900 leading-tight">{testimonial.author}</h4>
                    <p className="text-base text-blue-600 font-semibold uppercase tracking-widest mt-1">{testimonial.company}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
