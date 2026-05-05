import { useState } from 'react';
import { Mail, Phone, MapPin } from 'lucide-react';
import { emailService } from '../lib/emailjs';
import { sanitizeInput, sanitizeEmail } from '../lib/security';
import { useLanguageStore } from '../stores/languageStore';
import { useSettingsStore } from '../stores/settingsStore';
import { translations } from '../lib/translations';
import SEO from '../components/SEO';

export default function Contact() {
  const { language } = useLanguageStore();
  const email = useSettingsStore((state) => state.email);
  const phone = useSettingsStore((state) => state.phone);
  const address = useSettingsStore((state) => state.address);
  const latitude = useSettingsStore((state) => state.latitude);
  const longitude = useSettingsStore((state) => state.longitude);
  const t = translations[language].contact;

  return (
    <>
      <SEO
        title="Contact Us - Go Online Now"
        description="Get in touch with Go Online Now. We're here to help you build your perfect website. Contact us for consultations and support."
        keywords="contact us, website consultation, web development support, get in touch, customer service"
      />
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const mapEmbedUrl = `https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d766.125421148198!2d${longitude}!3d${latitude}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e1!3m2!1ses!2scr!4v1763913695694!5m2!1ses!2scr`;
  const mapLink = `https://www.google.com/maps/place/${latitude},${longitude}`;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const sanitizedData = {
        name: sanitizeInput(formData.name),
        email: sanitizeEmail(formData.email),
        subject: sanitizeInput(formData.subject),
        message: sanitizeInput(formData.message),
      };

      await emailService.sendContactFormConfirmation(
        sanitizedData.email,
        sanitizedData.name,
        sanitizedData.subject,
        sanitizedData.message,
        email
      );
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us - Go Online Now"
        description="Get in touch with Go Online Now. We're here to help you build your perfect website. Contact us for consultations and support."
        keywords="contact us, website consultation, web development support, get in touch, customer service"
      />
      <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-2">{t.title}</h1>
          <p className="text-base text-blue-100">
            {t.subtitle}
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-8 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 w-full">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <Mail className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-bold text-base mb-2">{t.email}</h3>
                <a href={`mailto:${email}`} className="text-gray-600 hover:text-blue-600 text-sm">
                  {email}
                </a>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <Phone className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-bold text-base mb-2">{t.phone}</h3>
                <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-gray-600 hover:text-blue-600 text-sm">
                  {phone}
                </a>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <MapPin className="w-6 h-6 text-blue-600 mb-3" />
                <h3 className="font-bold text-base mb-2">{t.address}</h3>
                <p className="text-gray-600 text-sm">
                  {address}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow border-2 border-blue-100">
                <div className="flex items-center gap-2 mb-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Mail className="w-5 h-5 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-base">{t.about}</h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {t.aboutText}
                </p>
                <a
                  href="https://andreychaconresumereact.netlify.app/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 font-semibold hover:underline text-sm"
                >
                  {t.about} →
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      {t.form.name}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={t.form.namePlaceholder}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      {t.form.email}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                      placeholder={t.form.emailPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.form.subject}
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder={t.form.subjectPlaceholder}
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    {t.form.message}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder={t.form.messagePlaceholder}
                  ></textarea>
                </div>

                {
                  status === 'success' && (
                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-800 text-xs">
                      ✓ {t.form.success}
                    </div>
                  )
                }

                {
                  status === 'error' && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-800 text-xs">
                      ✗ {t.form.error}
                    </div>
                  )
                }

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold py-2.5 rounded-lg transition text-sm"
                >
                  {status === 'loading' ? t.form.sending : t.form.send}
                </button>
              </form >
            </div >
          </div >
        </div >
      </section >

      {/* Map Section */}
      <section className="py-8 px-4 w-full bg-white">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {t.mapTitle}
          </h2>
          <div className="flex flex-col place-items-start gap-4">
            <div className="w-full h-[450px] rounded-xl overflow-hidden shadow-inner bg-gray-100">
              <iframe
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              {t.openMaps}
            </a>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
