# 🌐 Vikalp.ai - GDP Growth Prediction Frontend

Modern web application for GDP growth prediction and economic scenario simulation.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jay192005/vikalp.ai_frontend)

---

## 🎯 Overview

This is the frontend application for the GDP Growth Prediction Model. It provides an intuitive interface for:

- 🔐 User authentication (Google, Email, Phone)
- 📊 Historical GDP data visualization
- 🎮 Interactive economic scenario simulation
- 📈 Real-time prediction results
- 📱 Responsive design for all devices

---

## ✨ Features

### Authentication
- **Google Sign-In**: One-click OAuth authentication
- **Email/Password**: Traditional sign-up and sign-in
- **Phone Authentication**: SMS verification with OTP
- **Protected Routes**: Dashboard access requires authentication

### Prediction Dashboard
- **Country Selection**: Choose from 203 countries
- **Historical Data**: View past GDP growth trends
- **Scenario Simulation**: Adjust 6 economic indicators
- **Real-time Results**: Instant GDP growth predictions
- **Interactive Charts**: Visual data representation

### User Experience
- **Modern UI**: Clean, professional design
- **Responsive**: Works on desktop, tablet, and mobile
- **Fast**: Optimized with Vite for quick load times
- **Accessible**: WCAG compliant components

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Backend API running (see backend repository)
- Firebase project configured

### Installation

```bash
# Clone the repository
git clone https://github.com/jay192005/vikalp.ai_frontend.git
cd vikalp.ai_frontend

# Install dependencies
npm install

# Create environment file
cp .env.example .env.development

# Edit .env.development with your values
# VITE_API_BASE_URL=http://localhost:5000
# VITE_FIREBASE_API_KEY=your_api_key
# ... (see .env.example for all variables)

# Start development server
npm run dev

# Open http://localhost:5173
```

---

## 📦 Deployment

### Deploy to Vercel (Recommended)

**Quick Deploy:**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/jay192005/vikalp.ai_frontend)

**Manual Deploy:**

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Import this repository
4. Add environment variables (see below)
5. Click "Deploy"

**Detailed Guide**: See `VERCEL_DEPLOY.md`

### Environment Variables

Set these in Vercel dashboard:

```env
VITE_API_BASE_URL=https://your-backend.vercel.app
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

---

## 🛠️ Tech Stack

### Core
- **React 18**: UI library
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server

### Styling
- **Tailwind CSS**: Utility-first CSS
- **Shadcn/ui**: Component library
- **Radix UI**: Accessible primitives

### State & Data
- **React Context**: State management
- **Axios**: HTTP client
- **React Hook Form**: Form handling

### Authentication
- **Firebase Auth**: User authentication
- **Firebase SDK**: Firebase integration

### Charts & Visualization
- **Recharts**: Data visualization
- **Lucide React**: Icons

---

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx                    # Main app component
│   │   └── components/
│   │       ├── auth/                  # Authentication components
│   │       │   ├── SignInButton.tsx
│   │       │   ├── SignInModal.tsx
│   │       │   └── UserProfile.tsx
│   │       ├── dashboard.tsx          # Main dashboard
│   │       ├── growth-calculator.tsx  # Prediction interface
│   │       ├── landing-page.tsx       # Home page
│   │       └── ui/                    # Reusable UI components
│   ├── config/
│   │   └── firebase.ts                # Firebase configuration
│   ├── contexts/
│   │   └── AuthContext.tsx            # Authentication context
│   ├── services/
│   │   └── api.ts                     # API client
│   ├── styles/
│   │   ├── index.css                  # Global styles
│   │   └── tailwind.css               # Tailwind imports
│   └── main.tsx                       # App entry point
├── public/
│   └── favicon.svg                    # App icon
├── index.html                         # HTML template
├── package.json                       # Dependencies
├── vite.config.ts                     # Vite configuration
├── vercel.json                        # Vercel configuration
├── .env.example                       # Environment template
└── README.md                          # This file
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (http://localhost:5173)

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint

# Type Checking
npm run type-check   # Run TypeScript compiler
```

---

## 🎨 Components

### Authentication Components

**SignInModal**
- Tabbed interface for 3 auth methods
- Google OAuth integration
- Email/password with validation
- Phone authentication with OTP

**UserProfile**
- Display user information
- Sign out functionality
- Profile picture from provider

### Dashboard Components

**LandingPage**
- Hero section with features
- Call-to-action buttons
- Feature highlights
- Responsive design

**Dashboard**
- Country selection
- Historical data display
- Scenario simulation interface
- Results visualization

**GrowthCalculator**
- 6 economic indicator sliders
- Real-time input validation
- Prediction submission
- Results display with charts

---

## 🔐 Authentication Flow

1. User clicks "Sign In" button
2. Modal opens with 3 options:
   - Google: OAuth popup
   - Email: Sign in/up form
   - Phone: SMS verification
3. Firebase handles authentication
4. User redirected to dashboard
5. Protected routes check auth state

---

## 📊 API Integration

### Endpoints Used

```typescript
// Get list of countries
GET /api/countries

// Get historical data for a country
GET /api/history?country=United%20States

// Run simulation
POST /simulate
{
  "Country": "United States",
  "Population_Growth_Rate": 1.0,
  "Exports_Growth_Rate": 10.0,
  "Imports_Growth_Rate": 5.0,
  "Investment_Growth_Rate": 8.0,
  "Consumption_Growth_Rate": 3.0,
  "Govt_Spend_Growth_Rate": 2.0
}
```

### API Client

Located in `src/services/api.ts`:

```typescript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const api = {
  getCountries: () => axios.get(`${API_BASE_URL}/api/countries`),
  getHistory: (country: string) => axios.get(`${API_BASE_URL}/api/history`, { params: { country } }),
  simulate: (data: SimulationData) => axios.post(`${API_BASE_URL}/simulate`, data)
};
```

---

## 🎯 Key Features Implementation

### Protected Routes

```typescript
// In App.tsx
{user ? (
  <Dashboard />
) : (
  <LandingPage />
)}
```

### Firebase Authentication

```typescript
// In AuthContext.tsx
const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  await signInWithPopup(auth, provider);
};
```

### API Calls

```typescript
// In dashboard.tsx
const countries = await api.getCountries();
const history = await api.getHistory(selectedCountry);
const result = await api.simulate(scenarioData);
```

---

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign in with Google
- [ ] Sign in with Email/Password
- [ ] Sign in with Phone (use test number)
- [ ] Select country from dropdown
- [ ] View historical data
- [ ] Adjust growth rate sliders
- [ ] Run simulation
- [ ] View results
- [ ] Sign out
- [ ] Test on mobile device

### Test Accounts

**Email**: Use any valid email
**Phone**: Use Firebase test numbers in console

---

## 🆘 Troubleshooting

### Common Issues

**"Unable to connect to server"**
- Check `VITE_API_BASE_URL` is set correctly
- Verify backend is running
- Check CORS configuration in backend

**"Firebase not initialized"**
- Verify all Firebase env variables are set
- Check Firebase project configuration
- Ensure Firebase Auth is enabled

**"Build failed"**
- Run `npm install` to update dependencies
- Check for TypeScript errors: `npm run type-check`
- Clear cache: `rm -rf node_modules .vite && npm install`

**"Authentication failed"**
- Check Firebase Auth methods are enabled
- Verify authorized domains in Firebase Console
- Check Firebase credentials are correct

---

## 📈 Performance

### Optimization Techniques

- **Code Splitting**: Lazy loading components
- **Tree Shaking**: Remove unused code
- **Asset Optimization**: Compressed images and fonts
- **Caching**: Service worker for offline support
- **CDN**: Vercel Edge Network

### Metrics

- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3.5s
- **Lighthouse Score**: 90+

---

## 🔒 Security

### Best Practices

- ✅ Environment variables for sensitive data
- ✅ Firebase security rules
- ✅ HTTPS only in production
- ✅ Input validation and sanitization
- ✅ Protected API routes
- ✅ CORS configuration

---

## 🌍 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- Mobile browsers (iOS Safari, Chrome Mobile)

---

## 📝 License

This project is part of the Vikalp.ai GDP Growth Prediction Model.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

## 📞 Support

- **Documentation**: See `VERCEL_DEPLOY.md`
- **Issues**: GitHub Issues
- **Backend**: See backend repository

---

## 🎉 Acknowledgments

- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Charts**: Recharts
- **Authentication**: Firebase
- **Hosting**: Vercel

---

## 📊 Stats

- **Countries Supported**: 203
- **Authentication Methods**: 3
- **Economic Indicators**: 6
- **Components**: 50+
- **Lines of Code**: 5000+

---

**Built with ❤️ for economic analysis and prediction**

