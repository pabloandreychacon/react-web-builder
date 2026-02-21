import emailjs from '@emailjs/browser';

// Initialize EmailJS
const serviceId = 'service_s481rtv';
const templateId = 'template_771ecr6';
const publicKey = 'L7o6hZUmFJQ_Jbqu0';

if (publicKey) {
  emailjs.init(publicKey);
}

export interface EmailPayload {
  to_email: string;
  to_name: string;
  subject: string;
  message: string;
}

export const emailService = {
  async sendEmail(payload: EmailPayload) {
    try {
      const response = await emailjs.send(serviceId, templateId, {
        to_name: payload.to_name,
        to_email: payload.to_email,
        from_name: payload.to_name,
        from_email: payload.to_email,
        subject: 'Contact form page',
        message: payload.message,
        reply_to: payload.to_email,
      });
      return response;
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  },

  async sendOrderConfirmation(userEmail: string, userName: string, orderId: string, total: number) {
    const message = `
      Thank you for your order #${orderId}!
      Total: $${total.toFixed(2)}
      
      We will process your order shortly.
      You can track your order status in your account dashboard.
    `;

    return this.sendEmail({
      to_email: userEmail,
      to_name: userName,
      subject: `Order Confirmation #${orderId}`,
      message,
    });
  },

  async sendContactFormConfirmation(userEmail: string, userName: string, subject: string, userMessage: string, companyEmail: string) {
    // Send notification to company
    await this.sendEmail({
      to_email: companyEmail,
      to_name: 'Support Team',
      subject: `Contact Form: ${subject}`,
      message: `New contact form submission:

From: ${userName} (${userEmail})
Subject: ${subject}

Message:
${userMessage}`,
    });

    // Send confirmation to user
    return this.sendEmail({
      to_email: userEmail,
      to_name: userName,
      subject: 'We received your message',
      message: `Thank you for reaching out to us, ${userName}!
We have received your message and will get back to you soon.`,
    });
  },
};
