import { Check } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Pricing() {
  const plans = [
    {
      name: 'Starter',
      price: 9.99,
      description: 'Perfect for beginners',
      features: [
        '1 Website',
        '100 MB Storage',
        '5 Email Accounts',
        'Basic Templates',
        'Email Support',
      ],
      cta: 'Get Started',
    },
    {
      name: 'Professional',
      price: 19.99,
      description: 'Best for business owners',
      features: [
        '5 Websites',
        '1 GB Storage',
        '20 Email Accounts',
        'Premium Templates',
        'Advanced SEO Tools',
        'Priority Support',
        'Custom Domain',
      ],
      cta: 'Get Started',
      popular: true,
    },
    {
      name: 'Enterprise',
      price: 49.99,
      description: 'For growing teams',
      features: [
        'Unlimited Websites',
        'Unlimited Storage',
        'Unlimited Email Accounts',
        'All Templates',
        'Advanced Analytics',
        'API Access',
        '24/7 Support',
        'Custom Development',
      ],
      cta: 'Contact Sales',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-blue-600 text-white py-24 px-4 w-full">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Simple, Transparent Pricing</h1>
          <p className="text-xl text-blue-100">
            Choose the perfect plan for your needs. No hidden fees.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-28 px-4 w-full">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`rounded-lg p-10 ${plan.popular
                  ? 'bg-blue-600 text-white shadow-xl scale-105'
                  : 'bg-white border border-gray-200'
                  }`}
              >
                {plan.popular && (
                  <div className="text-sm font-bold bg-blue-500 px-3 py-1 rounded-full w-fit mb-4">
                    MOST POPULAR
                  </div>
                )}

                <h3 className="text-3xl font-bold mb-4">{plan.name}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? 'text-blue-100' : 'text-gray-600'}`}>
                  {plan.description}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-bold">${plan.price}</span>
                  <span className={plan.popular ? 'text-blue-100' : 'text-gray-600'}>/month</span>
                </div>

                <ul className="space-y-5 mb-10">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-3">
                      <Check className="w-5 h-5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link
                  to="/contact"
                  className={`w-full py-4 rounded-lg font-bold text-center block transition text-lg ${plan.popular
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-white py-20 px-4 w-full">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-4xl font-bold text-center mb-16">Frequently Asked Questions</h2>

          <div className="space-y-6">
            {[
              {
                q: 'Can I change plans anytime?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.',
              },
              {
                q: 'Is there a free trial?',
                a: 'We offer a 14-day free trial for all plans. No credit card required to get started.',
              },
              {
                q: 'What hosting provider do you use?',
                a: 'We use best-in-class cloud infrastructure with servers located globally for optimal performance.',
              },
              {
                q: 'Do you offer refunds?',
                a: 'We offer a 30-day money-back guarantee if you\'re not satisfied with our service.',
              },
              {
                q: 'Can I use my own domain?',
                a: 'Yes, you can use your own domain with any of our plans, or register a new one through us.',
              },
              {
                q: 'What support options are available?',
                a: 'We offer email support for all plans and phone support for our Professional and Enterprise plans.',
              },
            ].map((item, index) => (
              <div key={index} className="border-b border-gray-200 pb-6 last:border-b-0">
                <h3 className="font-bold text-lg mb-2">{item.q}</h3>
                <p className="text-gray-600">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
