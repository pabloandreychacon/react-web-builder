import WebsitePackage from '../components/WebsitePackage';

export default function Websites() {
  const packages = [
    {
      id: 'starter',
      name: 'Starter',
      description: 'Perfect for beginners',
      price: 9.99,
      features: [
        '1 Website',
        '100 MB Storage',
        '5 Email Accounts',
        'Basic Templates',
        'Email Support',
      ],
    },
    {
      id: 'professional',
      name: 'Professional',
      description: 'Best for business owners',
      price: 19.99,
      features: [
        '5 Websites',
        '1 GB Storage',
        '20 Email Accounts',
        'Premium Templates',
        'Advanced SEO Tools',
        'Priority Support',
        'Custom Domain',
      ],
      popular: true,
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      description: 'For growing teams',
      price: 49.99,
      features: [
        'Unlimited Websites',
        'Unlimited Storage',
        'Unlimited Email Accounts',
        'All Templates',
        'Advanced Analytics',
        'Advanced SEO Tools',
        'API Access',
        '24/7 Support',
        'Custom Development',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white py-24 px-4 w-full">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-5xl font-bold mb-4">Website Packages</h1>
          <p className="text-xl text-blue-100">
            Choose the perfect plan for your online presence
          </p>
        </div>
      </section>

      {/* Packages */}
      <section className="py-28 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {packages.map((pkg) => (
              <WebsitePackage key={pkg.id} {...pkg} />
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="bg-white py-28 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <h2 className="text-4xl font-bold mb-16 text-center">What's Included?</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-2xl font-bold mb-6">Website Builder</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Drag & drop interface</li>
                <li>✓ 100+ pre-built templates</li>
                <li>✓ Mobile responsive design</li>
                <li>✓ E-commerce ready</li>
                <li>✓ SEO optimized</li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-6">Additional Features</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ SSL Certificate</li>
                <li>✓ Daily backups</li>
                <li>✓ Email marketing tools</li>
                <li>✓ Analytics dashboard</li>
                <li>✓ Social media integration</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
