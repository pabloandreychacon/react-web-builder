import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguageStore } from '../stores/languageStore';
import { useSettingsStore } from '../stores/settingsStore';
import { translations } from '../lib/translations';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { language } = useLanguageStore();
  const siteName = translations[language].siteName;
  const email = useSettingsStore((state) => state.email);
  const phone = useSettingsStore((state) => state.phone);
  const address = useSettingsStore((state) => state.address);
  const t = translations[language].footer;
  const whatsappNumber = phone.replace(/\D/g, '');

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img src="/favicon.svg" alt="Logo" className="w-8 h-8 rotate-90" />
              <span className="font-bold text-lg text-white">{siteName}</span>
            </div>
            <p className="text-sm">{t.tagline}</p>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.services}</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/websites" className="hover:text-blue-400 transition">{t.websiteBuilder}</Link></li>
              <li><Link to="/domains" className="hover:text-blue-400 transition">{t.domainRegistration}</Link></li>
              {/* <li><Link to="/templates" className="hover:text-blue-400 transition">{t.templates}</Link></li>
              <li><Link to="/hosting" className="hover:text-blue-400 transition">{t.hosting}</Link></li> */}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.company}</h3>
            <ul className="space-y-2 text-sm">
              {/* <li><Link to="/about" className="hover:text-blue-400 transition">{t.about}</Link></li>
              <li><Link to="/blog" className="hover:text-blue-400 transition">{t.blog}</Link></li> */}
              <li><Link to="/contact" className="hover:text-blue-400 transition">{t.contactUs}</Link></li>
              {/* <li><Link to="/careers" className="hover:text-blue-400 transition">{t.careers}</Link></li> */}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-bold text-white mb-4">{t.contactUs}</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <a href={`mailto:${email}`} className="hover:text-blue-400 transition">{email}</a>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-blue-400 transition">{phone}</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{address}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links — pr reserves space for fixed WhatsAppButton (bottom-right) */}
        <div className="border-t border-gray-700 mt-8 pt-8 pr-24 sm:pr-28 pb-4">
          <div className="flex justify-between items-center gap-4">
            <p className="text-sm">&copy; {currentYear} {siteName}. {t.rights}</p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61576354271866" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              {/* <a href="#" className="hover:text-blue-400 transition"><Twitter className="w-5 h-5" /></a> */}
              <a href="https://www.linkedin.com/in/pabloandreychaconluna/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="hover:text-green-400 transition">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
