import { ExternalLink } from 'lucide-react';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function Portfolio() {
  const { language } = useLanguageStore();
  const t = translations[language].home.portfolio;

  return (
    <section className="py-24 px-4 w-full bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {t.projects.map((project: any, index: number) => (
            <div
              key={index}
              className="group relative bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              <div className="aspect-video relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 via-blue-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-8">
                  <span className="text-white bg-blue-600 px-4 py-1 rounded-full text-sm font-semibold mb-2">
                    {project.category}
                  </span>
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{project.name}</h3>
                    <p className="text-blue-600 font-medium">{project.category}</p>
                  </div>
                  <button className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    <ExternalLink className="w-6 h-6" />
                  </button>
                </div>

                <p className="text-gray-600 leading-relaxed mb-6">
                  {project.description}
                </p>

                <div className="h-1 w-0 group-hover:w-full bg-blue-600 transition-all duration-700 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
