import DomainChecker from '../components/DomainChecker';

export default function Domains() {
  const registrars = [
    { id: 'hostinger', name: 'Hostinger', price: 2.99 },
    { id: 'godaddy', name: 'GoDaddy', price: 4.99 },
    { id: 'namecheap', name: 'Namecheap', price: 3.99 },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-24 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Domain Registration</h1>
          <p className="text-xl text-purple-100">
            Find and register your perfect domain name
          </p>
        </div>
      </section>

      {/* Domain Checker */}
      <section className="py-28 px-4 w-full">
        <div className="max-w-5xl mx-auto w-full">
          <DomainChecker registrars={registrars} />
        </div>
      </section>

      {/* Domain Extensions */}
      <section className="bg-white py-28 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-3xl font-bold mb-12 text-center">Popular Extensions</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
            {[
              { ext: '.com', price: 8.99 },
              { ext: '.net', price: 8.99 },
              { ext: '.org', price: 8.99 },
              { ext: '.co', price: 9.99 },
              { ext: '.io', price: 29.99 },
              { ext: '.dev', price: 12.99 },
              { ext: '.app', price: 11.99 },
              { ext: '.blog', price: 15.99 },
              { ext: '.shop', price: 24.99 },
              { ext: '.online', price: 6.99 },
              { ext: '.site', price: 10.99 },
              { ext: '.info', price: 9.99 },
            ].map((item) => (
              <div
                key={item.ext}
                className="p-8 border border-gray-200 rounded-lg text-center hover:shadow-lg transition"
              >
                <div className="text-4xl font-bold text-blue-600 mb-4">{item.ext}</div>
                <div className="text-gray-600 text-base font-medium">${item.price}/year</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="bg-gray-50 py-28 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-16 text-center">Why Register with Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl font-bold text-blue-600 mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3">Free WHOIS Privacy</h3>
              <p className="text-gray-600">Keep your personal information private with our free WHOIS protection.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl font-bold text-blue-600 mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3">Free DNS Management</h3>
              <p className="text-gray-600">Manage all your DNS records easily with our intuitive control panel.</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow">
              <div className="text-4xl font-bold text-blue-600 mb-6">✓</div>
              <h3 className="text-xl font-bold mb-3">24/7 Support</h3>
              <p className="text-gray-600">Our support team is always available to help you with any issues.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
