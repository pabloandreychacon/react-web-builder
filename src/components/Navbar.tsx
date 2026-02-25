import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, ShoppingCart, Globe } from 'lucide-react';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemsCount = useCartStore((state) => state.getItemsCount());
  const user = useAuthStore((state) => state.user);
  const { language, setLanguage } = useLanguageStore();
  const t = translations[language];
  const siteName = t.siteName;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/favicon.svg" alt="Logo" className="w-10 h-10 rotate-90" />
            <span className="font-bold text-2xl hidden sm:inline text-gray-900">{siteName}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className="text-gray-700 hover:text-blue-600 transition text-sm px-2 py-2 rounded hover:bg-gray-100">{t.nav.home}</Link>
            <Link to="/websites" className="text-gray-700 hover:text-blue-600 transition text-sm px-2 py-2 rounded hover:bg-gray-100">{t.nav.pricing}</Link>
            <Link to="/domains" className="text-gray-700 hover:text-blue-600 transition text-sm px-2 py-2 rounded hover:bg-gray-100">{t.nav.domains}</Link>
            <Link to="/templates" className="text-gray-700 hover:text-blue-600 transition text-sm px-2 py-2 rounded hover:bg-gray-100">{t.nav.templates}</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-600 transition text-sm px-2 py-2 rounded hover:bg-gray-100">{t.nav.contact}</Link>
          </div>

          {/* Right Menu */}
          <div className="flex items-center space-x-2">
            {/* Language Toggle */}
            <button
              onClick={() => setLanguage(language === 'es' ? 'en' : 'es')}
              className="flex items-center gap-1 text-gray-700 hover:text-blue-600 transition text-sm px-2 py-2 rounded hover:bg-gray-100"
              title={t.nav.switchLanguage}
            >
              <Globe className="w-4 h-4" />
              <span className="font-semibold">{language === 'es' ? 'EN' : 'ES'}</span>
            </button>

            {/* Cart Icon */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-6 h-6 text-gray-700 hover:text-blue-600 transition" />
              {itemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                  {itemsCount}
                </span>
              )}
            </Link>

            {/* Auth Links */}
            {user ? (
              <div className="hidden items-center space-x-2">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-600 transition text-sm px-3 py-2">{t.nav.dashboard}</Link>
                <button
                  onClick={() => {
                    // Logout logic
                    useAuthStore.getState().logout();
                  }}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-lg transition text-sm font-semibold"
                >
                  {t.nav.logout}
                </button>
              </div>
            ) : (
              <div className="hidden space-x-2">
                <Link to="/login" className="text-gray-700 hover:text-blue-600 transition text-sm px-3 py-2 font-semibold">{t.nav.login}</Link>
                <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg transition text-sm font-semibold">{t.nav.signup}</Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-3">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">{t.nav.home}</Link>
            <Link to="/websites" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">{t.nav.pricing}</Link>
            <Link to="/domains" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">{t.nav.domains}</Link>
            <Link to="/templates" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">{t.nav.templates}</Link>
            <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded">{t.nav.contact}</Link>
          </div>
        )}
      </div>
    </nav>
  );
}
