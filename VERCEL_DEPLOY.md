# 🚀 Vercel Deployment Guide - Frontend

This frontend is ready to deploy on Vercel!

---

## ⚡ Quick Deploy (5 minutes)

### Option 1: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit: https://vercel.com/dashboard
   - Click **"Add New"** → **"Project"**

2. **Import Repository**
   - Click **"Import Git Repository"**
   - Paste: `https://github.com/jay192005/vikalp.ai_frontend.git`
   - Click **"Import"**

3. **Configure Project**
   - **Framework Preset**: Vite (auto-detected)
   - **Root Directory**: `./` (leave as is)
   - **Build Command**: `npm run build` (auto-filled)
   - **Output Directory**: `dist` (auto-filled)
   - **Install Command**: `npm install` (auto-filled)

4. **Add Environment Variables**
   
   Click **"Environment Variables"** and add these 8 variables:

   ```
   VITE_API_BASE_URL=https://your-backend.vercel.app
   VITE_FIREBASE_API_KEY=AIzaSyDqOF39hgHmcGGZAc4c-mXGOWEMLZ0WAKE
   VITE_FIREBASE_AUTH_DOMAIN=gdp-grow-prediction-model.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=gdp-grow-prediction-model
   VITE_FIREBASE_STORAGE_BUCKET=gdp-grow-prediction-model.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=208179229459
   VITE_FIREBASE_APP_ID=1:208179229459:web:fac142fde5119a732860e6
   VITE_FIREBASE_MEASUREMENT_ID=G-CJP3KTJNVH
   ```

   **Important**: Select all environments (Production, Preview, Development)

5. **Deploy**
   - Click **"Deploy"**
   - Wait 2-3 minutes for build
   - Your app will be live at: `https://your-project.vercel.app`

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Follow prompts, then deploy to production
vercel --prod
```

---

## 📋 Environment Variables Required

You need to set these 8 environment variables in Vercel:

| Variable | Value | Description |
|----------|-------|-------------|
| `VITE_API_BASE_URL` | `https://your-backend.vercel.app` | Backend API URL |
| `VITE_FIREBASE_API_KEY` | `AIzaSyDqOF39hgHmcGGZAc4c-mXGOWEMLZ0WAKE` | Firebase API Key |
| `VITE_FIREBASE_AUTH_DOMAIN` | `gdp-grow-prediction-model.firebaseapp.com` | Firebase Auth Domain |
| `VITE_FIREBASE_PROJECT_ID` | `gdp-grow-prediction-model` | Firebase Project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | `gdp-grow-prediction-model.firebasestorage.app` | Firebase Storage |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | `208179229459` | Firebase Sender ID |
| `VITE_FIREBASE_APP_ID` | `1:208179229459:web:fac142fde5119a732860e6` | Firebase App ID |
| `VITE_FIREBASE_MEASUREMENT_ID` | `G-CJP3KTJNVH` | Firebase Analytics |

**Note**: Update `VITE_API_BASE_URL` with your actual backend URL after deploying the backend.

---

## 🔧 Configuration Files

This repository includes:

- ✅ `vercel.json` - Vercel configuration
- ✅ `.vercelignore` - Files to exclude from deployment
- ✅ `package.json` - Dependencies and scripts
- ✅ `vite.config.ts` - Vite configuration
- ✅ `.env.example` - Environment variables template

---

## 🧪 Test Locally Before Deploying

```bash
# Install dependencies
npm install

# Create .env.development file
cp .env.example .env.development

# Edit .env.development with your values
# Set VITE_API_BASE_URL=http://localhost:5000 for local backend

# Run development server
npm run dev

# Open http://localhost:5173
```

---

## ✅ Verify Deployment

After deployment:

1. **Open your Vercel URL**
2. **Check browser console** (F12)
   - Should see: `API Base URL: https://your-backend.vercel.app`
   - Should NOT see errors

3. **Test Features**
   - Sign in (Google, Email, Phone)
   - Select country
   - Run simulation
   - Verify results display

---

## 🔄 Automatic Deployments

Once connected to GitHub:

- Every push to `main` branch auto-deploys to production
- Every PR creates a preview deployment
- View deployments in Vercel dashboard

---

## 🆘 Troubleshooting

### "Unable to connect to server"
**Solution**: 
1. Check `VITE_API_BASE_URL` is set correctly in Vercel
2. Verify backend is deployed and running
3. Redeploy frontend after updating env vars

### "Firebase not initialized"
**Solution**:
1. Verify all 8 `VITE_FIREBASE_*` variables are set
2. Check Firebase project settings
3. Redeploy after updating

### "Build failed"
**Solution**:
1. Check build logs in Vercel dashboard
2. Verify `package.json` dependencies
3. Test build locally: `npm run build`

### "CORS error"
**Solution**:
1. Update backend CORS to include your Vercel URL
2. Redeploy backend

---

## 📊 Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── App.tsx
│   │   └── components/
│   │       ├── auth/
│   │       ├── dashboard.tsx
│   │       ├── growth-calculator.tsx
│   │       └── landing-page.tsx
│   ├── config/
│   │   └── firebase.ts
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── services/
│   │   └── api.ts
│   └── styles/
├── public/
├── index.html
├── package.json
├── vite.config.ts
├── vercel.json
└── .vercelignore
```

---

## 🎯 Features

- ✅ React 18 + TypeScript
- ✅ Vite for fast builds
- ✅ Firebase Authentication (Google, Email, Phone)
- ✅ Tailwind CSS for styling
- ✅ Shadcn/ui components
- ✅ Responsive design
- ✅ Protected routes
- ✅ Real-time predictions

---

## 📚 Additional Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev
- **Firebase Documentation**: https://firebase.google.com/docs

---

## 🎉 Success!

Your frontend is deployed and ready to use!

**Live URL**: `https://your-project.vercel.app`

Share this URL with your users and start predicting GDP growth! 📈

