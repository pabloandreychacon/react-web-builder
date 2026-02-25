import { ExternalLink, Palette, Layout, Search, Sparkles } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function Templates() {
  const { language } = useLanguageStore();
  const t = translations[language].templates;

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      {/* Header Section */}
      <section className="bg-blue-600 py-20 px-4 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t.title}
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Resources Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">
            {t.resourcesTitle}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-black">
            {t.list.map((resource: { name: string; url: string; description: string }, index: number) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col h-full"
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {index === 0 && <Layout className="w-6 h-6" />}
                    {index === 1 && <Palette className="w-6 h-6" />}
                    {index === 2 && <Search className="w-6 h-6" />}
                    {index === 3 && <Sparkles className="w-6 h-6" />}
                    {index >= 4 && <ExternalLink className="w-6 h-6" />}
                  </div>
                  <ExternalLink className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">
                  {resource.name}
                </h3>

                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                  {resource.description}
                </p>

                <div className="flex items-center text-blue-600 font-semibold text-sm">
                  {t.visit} {resource.name}
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-16 px-4 bg-white border-y border-gray-100">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-6">
            <Sparkles className="w-8 h-8" />
          </div>
          <h3 className="text-2xl font-bold mb-4">{language === 'es' ? '¿No sabes cuál elegir?' : 'Don\'t know which one to choose?'}</h3>
          <p className="text-gray-600 text-lg mb-8">
            {language === 'es'
              ? 'Nuestro equipo de expertos puede asesorarte y seleccionar la plantilla que mejor se adapte a los objetivos de tu negocio. ¡Confía en nosotros para darte la mejor presencia online!'
              : 'Our team of experts can advise you and select the template that best fits your business goals. Trust us to give you the best online presence!'}
          </p>
          <a
            href="/contact"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-blue-700 transition duration-300 shadow-md"
          >
            {language === 'es' ? 'Contactar para Asesoría' : 'Contact for Advice'}
          </a>
        </div>
      </section>
    </div>
  );
}
