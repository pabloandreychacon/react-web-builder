import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import Home from './pages/Home';
import Websites from './pages/Websites';
import Domains from './pages/Domains';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import { useLanguageInit } from './hooks/useLanguageInit';
import { useLanguageStore } from './stores/languageStore';
import { translations } from './lib/translations';
import { useSettingsStore } from './stores/settingsStore';
import { useEffect } from 'react';

function AppContent() {
  useLanguageInit();
  const { language } = useLanguageStore();
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          {/* Placeholder routes for future pages */}
          <Route path="/login" element={<div className="p-10 text-center text-xl text-gray-600 bg-white min-h-[400px] flex items-center justify-center">{translations[language].common.comingSoon}...</div>} />
          <Route path="/signup" element={<div className="p-10 text-center text-xl text-gray-600 bg-white min-h-[400px] flex items-center justify-center">{translations[language].common.comingSoon}...</div>} />
          <Route path="/dashboard" element={<div className="p-10 text-center text-xl text-gray-600 bg-white min-h-[400px] flex items-center justify-center">{translations[language].common.comingSoon}...</div>} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
