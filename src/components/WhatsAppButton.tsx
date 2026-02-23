import { MessageCircle } from 'lucide-react';
import { useSettingsStore } from '../stores/settingsStore';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';

export default function WhatsAppButton() {
  const { language } = useLanguageStore();
  const phone = useSettingsStore((state) => state.phone);
  const cleanPhone = phone.replace(/\D/g, '');
  const whatsappUrl = `https://wa.me/${cleanPhone}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-lg transition-all hover:scale-110 z-50"
      title={translations[language].common.chatOnWhatsApp}
    >
      <MessageCircle className="w-6 h-6" />
    </a>
  );
}
