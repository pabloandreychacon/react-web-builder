import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Websites from './pages/Websites';
import Domains from './pages/Domains';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import { useLanguageInit } from './hooks/useLanguageInit';
import { useSettingsStore } from './stores/settingsStore';
import { useEffect } from 'react';

function AppContent() {
  useLanguageInit();
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
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          {/* Placeholder routes for future pages */}
          <Route path="/login" element={<div className="p-8 text-center">Login page coming soon</div>} />
          <Route path="/signup" element={<div className="p-8 text-center">Sign up page coming soon</div>} />
          <Route path="/dashboard" element={<div className="p-8 text-center">Dashboard coming soon</div>} />
        </Routes>
      </main>
      <Footer />
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
