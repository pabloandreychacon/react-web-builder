import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, CheckCircle } from 'lucide-react';
import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { useCartStore } from '../stores/cartStore';
import { useAuthStore } from '../stores/authStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useLanguageStore } from '../stores/languageStore';
import { translations } from '../lib/translations';
import { supabase } from '../lib/supabase';
import SEO from '../components/SEO';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, removeItem, getTotal, clearCart } = useCartStore();
  const { user } = useAuthStore();
  const { paypalClientId, email: businessEmail } = useSettingsStore();
  const { language } = useLanguageStore();
  const t = translations[language];

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderNumber, setOrderNumber] = useState(0);

  useEffect(() => {
    if (items.length === 0 && !showSuccessModal) {
      navigate('/cart');
    }
  }, [items, navigate, showSuccessModal]);

  const subtotal = getTotal();

  const taxAmount = items.reduce((sum, _item) => {
    // Assuming digital services don't have taxes for now, matching luxury implementation logic
    return sum + 0;
  }, 0);

  const shippingCost = 0; // Digital services
  const grandTotal = subtotal + taxAmount + shippingCost;

  const saveOrder = async (paypalOrderId: string, buyerEmail: string, shippingAddress: string) => {
    const userId = user?.id || null;

    const { data: orderData, error: orderError } = await supabase
      .from('Orders')
      .insert([{
        UserId: userId,
        TotalAmount: grandTotal,
        StatusId: 1,
        PaymentOrderId: paypalOrderId,
        ShippingAddress: shippingAddress,
        ShippingMethod: t.checkout.digitalDelivery,
        EstimatedDeliveryDate: new Date().toISOString(),
        BuyerEmail: buyerEmail,
        BusinessEmail: businessEmail,
        IdBusiness: 9, // Matching react-web-builder Id
        Notes: shippingAddress, // Using the notes string constructed in onApprove
        CreatedAt: new Date().toISOString(),
        UpdatedAt: new Date().toISOString()
      }])
      .select();

    if (orderError || !orderData) {
      console.error('Error saving order:', orderError);
      return null;
    }

    const orderId = orderData[0].Id;

    for (const item of items) {
      await supabase.from('OrderItems').insert([{
        PaypalOrderId: paypalOrderId,
        ProductId: item.id.includes('-') ? 0 : parseInt(item.id) || 0,
        ProductName: item.name,
        Quantity: 1,
        Price: item.price,
        ItemTotal: item.price,
        OrderId: orderId
      }]);
    }

    return orderId;
  };

  const sendOrderEmail = async (orderNumber: number, buyerName: string, buyerEmail: string, detailedNotes: string) => {
    const itemsList = detailedNotes;

    try {
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_s481rtv',
          template_id: 'template_771ecr6',
          user_id: 'L7o6hZUmFJQ_Jbqu0',
          template_params: {
            to_email: businessEmail,
            from_email: buyerEmail,
            subject: `${language === 'es' ? 'Nueva Orden' : 'New Order'} #${orderNumber}`,
            message: `${language === 'es' ? 'Número de Orden' : 'Order Number'}: ${orderNumber}\n\n${language === 'es' ? 'Cliente' : 'Customer'}: ${buyerName}\nEmail: ${buyerEmail}\n\n${language === 'es' ? 'Artículos' : 'Items'}:\n${itemsList}\n\nSubtotal: $${subtotal.toFixed(2)}\nTotal: $${grandTotal.toFixed(2)}`,
            name: buyerName
          }
        })
      });
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  if (items.length === 0 && !showSuccessModal) return null;

  return (
    <>
      <SEO
        title="Checkout - Go Online Now"
        description="Complete your purchase. Secure checkout for website packages and domain registration."
        keywords="checkout, payment, website purchase, PayPal checkout, order summary"
      />
      <div className="min-h-screen bg-gray-50 pt-8 pb-20">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold mb-12">{t.checkout.title}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Cart Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold mb-6">{t.checkout.yourItems}</h2>
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100 last:border-0">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-gray-500 uppercase">{item.type}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <span className="font-bold text-lg">${item.price.toFixed(2)}</span>
                      <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition">
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white p-8 rounded-lg shadow-md border border-gray-100 sticky top-24">
              <h2 className="text-2xl font-bold mb-6">{t.checkout.orderSummary}</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-gray-100">
                <div className="flex justify-between text-gray-600">
                  <span>{t.checkout.subtotal}</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>

              <div className="flex justify-between mb-8">
                <span className="text-xl font-bold">{t.checkout.total}</span>
                <span className="text-3xl font-bold text-blue-600">${grandTotal.toFixed(2)}</span>
              </div>

              {paypalClientId ? (
                <PayPalScriptProvider options={{ clientId: paypalClientId, currency: 'USD' }}>
                  <PayPalButtons
                    style={{ layout: 'vertical', shape: 'rect' }}
                    createOrder={(_data, actions) => {
                      return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                          amount: {
                            currency_code: "USD",
                            value: grandTotal.toFixed(2),
                          },
                        }],
                      });
                    }}
                    onApprove={async (data, actions) => {
                      const details = await actions.order?.capture();
                      const buyerName = `${details?.payer?.name?.given_name} ${details?.payer?.name?.surname}`;
                      const buyerEmail = details?.payer?.email_address || '';

                      // Construct detailed notes for both DB and Email
                      const detailedNotes = items.map(item => {
                        const details = item.details || {};
                        const featuresPart = details.features ? `\nFeatures:\n- ${details.features.join('\n- ')}` : '';
                        const pagesPart = details.pages ? ` (${details.pages} ${t.cart?.pages || 'pages'})` : '';
                        return `${item.name}${pagesPart} - $${item.price.toFixed(2)}\nDescription: ${details.description || 'N/A'}${featuresPart}\n`;
                      }).join('\n' + '-'.repeat(30) + '\n');

                      const orderId = await saveOrder(data.orderID, buyerEmail, detailedNotes);

                      if (orderId) {
                        await sendOrderEmail(orderId, buyerName, buyerEmail, detailedNotes);
                        clearCart();
                        setOrderNumber(orderId);
                        setShowSuccessModal(true);
                      }
                    }}
                  />
                </PayPalScriptProvider>
              ) : (
                <div className="p-4 bg-yellow-50 text-yellow-700 rounded-lg text-sm">
                  {t.checkout.paypalUnavailable}
                </div>
              )}

              <button
                onClick={() => navigate('/cart')}
                className="w-full mt-4 text-gray-500 hover:text-gray-700 font-medium transition"
              >
                {t.checkout.backToCart}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-10 max-w-md w-full shadow-2xl transform transition-all">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                {t.checkout.orderCompleted}
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                {t.checkout.orderPlaced.replace('{orderNumber}', String(orderNumber))}
              </p>
              <button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate('/');
                }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-1 active:scale-95"
              >
                {t.checkout.continueShopping}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
