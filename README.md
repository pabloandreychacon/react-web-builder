# WebBuilder - Web Services Platform

A modern web application for creating websites and managing domains. Built with Vite, React, TypeScript, Tailwind CSS, Zustand, Supabase, and EmailJS.

## Features

- ✨ **Website Builder**: Create stunning websites with our easy-to-use platform
- 🌐 **Domain Registration**: Register and manage domains from multiple registrars (Hostinger, GoDaddy, Namecheap)
- 💳 **PayPal Integration**: Seamless payment processing for purchases
- 📧 **Email Notifications**: Send confirmation and transactional emails via EmailJS
- 🔐 **Authentication**: User authentication with Supabase
- 🛒 **Shopping Cart**: Full shopping cart functionality with multiple item types
- 📱 **Responsive Design**: Mobile-first responsive design with Tailwind CSS
- ✨ **Animations**: Smooth animations and transitions for a modern user experience
- 🎨 **Modern UI**: Clean and professional user interface

## Tech Stack

- **Frontend**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Styling**: Tailwind CSS 3
- **State Management**: Zustand
- **Backend/Database**: Supabase
- **Email Service**: EmailJS
- **Payment**: PayPal Integration
- **Navigation**: React Router v7
- **Icons**: Lucide React
- **Security**: bcryptjs

## Project Structure

```
src/
├── pages/              # Page components
│   ├── Home.tsx       # Landing page with animations
│   ├── Websites.tsx   # Website packages
│   ├── Domains.tsx    # Domain registration
│   ├── Pricing.tsx    # Pricing page
│   ├── Contact.tsx    # Contact form
│   └── Cart.tsx       # Shopping cart
├── components/        # Reusable components
│   ├── Navbar.tsx     # Navigation bar
│   ├── Footer.tsx     # Footer component
│   ├── WebsitePackage.tsx  # Website package card
│   └── DomainChecker.tsx   # Domain availability checker
├── stores/           # Zustand stores
│   ├── cartStore.ts  # Shopping cart state
│   ├── authStore.ts  # Authentication state
│   └── orderStore.ts # Order management state
├── lib/             # Utility functions and services
│   ├── supabase.ts  # Supabase configuration
│   ├── emailjs.ts   # Email service
│   └── paypal.ts    # PayPal configuration
├── assets/          # Static assets
├── App.tsx          # Main app component
└── index.css        # Global styles
```

## Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd react-web-builder
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:

```env
# Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# EmailJS
VITE_EMAILJS_SERVICE_ID=service_xxxxx
VITE_EMAILJS_PUBLIC_KEY=public_xxxxx

# PayPal
VITE_PAYPAL_CLIENT_ID=your-paypal-client-id
VITE_PAYPAL_ENVIRONMENT=sandbox
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Building

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run typecheck` - Type check TypeScript

## Key Components

### Navbar
- Navigation menu with responsive mobile menu
- Shopping cart badge with item count
- User authentication links
- Logo and brand name

### Footer
- Company information
- Quick links to services
- Contact information
- Social media links

### Home Page
- Hero section with animated background
- Feature highlights
- Pricing preview
- Call-to-action sections
- Animated statistics

### Shopping Cart
- View and manage cart items
- Update quantities
- Payment method selection (PayPal/Credit Card)
- Order summary with totals
- Proceed to checkout

### Domain Checker
- Domain availability checker
- Multiple registrar options with pricing
- Add domains to cart

## Zustand Stores

### Cart Store
- `items`: Array of cart items
- `addItem()`: Add item to cart
- `removeItem()`: Remove item from cart
- `updateQuantity()`: Update item quantity
- `clearCart()`: Clear all items
- `getTotal()`: Get total price
- `getItemsCount()`: Get number of items

### Auth Store
- `user`: Current user object
- `isLoading`: Loading state
- `setUser()`: Set current user
- `setLoading()`: Set loading state
- `logout()`: Logout user

### Order Store
- `orders`: Array of orders
- `currentOrder`: Current order
- `setOrders()`: Set orders
- `addOrder()`: Add new order
- `setCurrentOrder()`: Set current order
- `updateOrderStatus()`: Update order status

## Services

### Supabase
Database and authentication service configuration. Define your tables:
- `website_projects` - User website projects
- `domains` - Domain registrations
- `orders` - Customer orders

### EmailJS
Email service for sending notifications:
- `sendEmail()` - Send custom email
- `sendOrderConfirmation()` - Send order confirmation
- `sendContactFormConfirmation()` - Send contact form confirmation

### PayPal
Payment gateway integration for processing orders.

## Animations

The Home page includes several animations:
- **Blob Animation**: Animated background shapes
- **Fade In**: Text fade-in animations
- **Slide In**: Content slide-in animations
- **Bounce**: Bouncing statistics
- **Hover Scales**: Card hover effects

## Future Enhancements

- [ ] User authentication and dashboard
- [ ] Website builder interface
- [ ] Domain management dashboard
- [ ] Order history and tracking
- [ ] Admin panel
- [ ] Payment processing with Stripe
- [ ] Email template builder
- [ ] Advanced analytics

## License

This project is open source and available under the MIT License.

## Support

For support, please contact us at support@webbuilder.com or visit our contact page.
```
