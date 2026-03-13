# 🚀 Vercel Deployment Guide - Frontend

## ⚠️ IMPORTANT: Fix "Unable to connect to server" Error

The error you're seeing means the frontend can't reach the backend. Here's how to fix it:

---

## 📋 Pre-Deployment Checklist

### 1. Get Your Render Backend URL ✅

First, make sure your backend is deployed on Render and get the URL:

1. Go to https://render.com/dashboard
2. Find your backend service
3. Copy the URL (e.g., `https://gdp-backend-abc123.onrender.com`)
4. **Test it works**: Open `https://your-backend.onrender.com/` in browser
   - You should see JSON with API info

### 2. Update Environment Variables

You need to set the backend URL in **TWO places**:

#### A. Local `.env.production` file (for reference):
```env
VITE_API_BASE_URL=https://your-actual-render-url.onrender.com
```

#### B. Vercel Dashboard (REQUIRED for production):
This is the most important step!

---

## 🔧 Step-by-Step Vercel Deployment

### Step 1: Push Frontend to GitHub

Make sure your frontend code is in the repository:
```bash
cd frontend
git add .
git commit -m "Prepare frontend for Vercel deployment"
git push origin main
```

### Step 2: Connect to Vercel

1. Go to https://vercel.com/dashboard
2. Click **"Add New Project"**
3. Click **"Import Git Repository"**
4. Select: `gdp_gowth_prediction_model_frontend`
5. Click **"Import"**

### Step 3: Configure Build Settings

Vercel should auto-detect Vite. Verify these settings:

```
Framework Preset: Vite
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

**Root Directory**: Leave empty (or set to `frontend` if repo has multiple folders)

### Step 4: Add Environment Variables (CRITICAL!)

Click **"Environment Variables"** and add:

#### Required Variables:

**1. Backend URL** (MOST IMPORTANT):
```
Name: VITE_API_BASE_URL
Value: https://your-render-backend-url.onrender.com
Environment: Production, Preview, Development
```

**2. Firebase Configuration**:
```
Name: VITE_FIREBASE_API_KEY
Value: [your Firebase API key]
Environment: Production, Preview, Development

Name: VITE_FIREBASE_AUTH_DOMAIN
Value: gdp-grow-prediction-model.firebaseapp.com
Environment: Production, Preview, Development

Name: VITE_FIREBASE_PROJECT_ID
Value: gdp-grow-prediction-model
Environment: Production, Preview, Development

Name: VITE_FIREBASE_STORAGE_BUCKET
Value: gdp-grow-prediction-model.appspot.com
Environment: Production, Preview, Development

Name: VITE_FIREBASE_MESSAGING_SENDER_ID
Value: [your sender ID]
Environment: Production, Preview, Development

Name: VITE_FIREBASE_APP_ID
Value: [your app ID]
Environment: Production, Preview, Development
```

### Step 5: Deploy

1. Click **"Deploy"**
2. Wait for build to complete (2-5 minutes)
3. Vercel will give you a URL like: `https://your-app.vercel.app`

---

## 🔍 Verify Deployment

### Test 1: Check Environment Variable

1. Open your Vercel app URL
2. Open browser DevTools (F12) → Console
3. Look for: `API Base URL: https://your-backend.onrender.com`
4. If it shows `undefined` or `localhost`, environment variable is not set!

### Test 2: Check Backend Connection

1. In the app, try selecting a country
2. Open DevTools → Network tab
3. Look for requests to your Render backend
4. Check if they succeed (status 200) or fail

### Test 3: Check CORS

If you see CORS errors:
1. Go to your Render backend code
2. Update `app_scenario.py` CORS configuration with your Vercel URL
3. Redeploy backend

---

## 🚨 Troubleshooting "Unable to connect to server"

### Issue 1: Environment Variable Not Set

**Symptom**: Console shows `API Base URL: undefined` or `http://localhost:5000`

**Solution**:
1. Go to Vercel Dashboard → Your Project → Settings → Environment Variables
2. Verify `VITE_API_BASE_URL` is set correctly
3. **Important**: Redeploy after adding environment variables!
   - Go to Deployments → Click "..." → Redeploy

### Issue 2: Wrong Backend URL

**Symptom**: Network errors, 404, or connection refused

**Solution**:
1. Test backend URL directly in browser: `https://your-backend.onrender.com/`
2. Should return JSON, not error
3. If backend is down, check Render dashboard
4. Render free tier sleeps after 15 min - first request may be slow

### Issue 3: CORS Error

**Symptom**: Console shows "blocked by CORS policy"

**Solution**:
1. Update backend `app_scenario.py`:
```python
CORS(app, resources={
    r"/*": {
        "origins": [
            "http://localhost:5173",
            "https://*.vercel.app",
            "https://your-actual-app.vercel.app"  # Add your Vercel URL
        ],
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type", "Authorization"]
    }
})
```
2. Commit and push to GitHub
3. Render will auto-redeploy

### Issue 4: Build Fails

**Symptom**: Vercel build fails with errors

**Solution**:
1. Check build logs in Vercel dashboard
2. Common issues:
   - Missing dependencies: Run `npm install` locally first
   - TypeScript errors: Fix in code
   - Environment variables: Set in Vercel dashboard

---

## 📝 Environment Variables Reference

### Where to Get Firebase Values:

1. Go to https://console.firebase.google.com/
2. Select your project: `gdp-grow-prediction-model`
3. Click ⚙️ (Settings) → Project Settings
4. Scroll to "Your apps" → Web app
5. Copy the config values

### Example Firebase Config:
```javascript
const firebaseConfig = {
  apiKey: "AIza...",  // → VITE_FIREBASE_API_KEY
  authDomain: "gdp-grow-prediction-model.firebaseapp.com",
  projectId: "gdp-grow-prediction-model",
  storageBucket: "gdp-grow-prediction-model.appspot.com",
  messagingSenderId: "123...",  // → VITE_FIREBASE_MESSAGING_SENDER_ID
  appId: "1:123..."  // → VITE_FIREBASE_APP_ID
};
```

---

## 🔄 Redeploying After Changes

### Method 1: Git Push (Automatic)
```bash
git add .
git commit -m "Update configuration"
git push origin main
```
Vercel will automatically redeploy.

### Method 2: Manual Redeploy
1. Go to Vercel Dashboard → Deployments
2. Click "..." on latest deployment
3. Click "Redeploy"

### Method 3: Redeploy with Cache Clear
Use this if environment variables aren't updating:
1. Vercel Dashboard → Deployments
2. Click "..." → "Redeploy"
3. Check "Use existing Build Cache" → **Uncheck it**
4. Click "Redeploy"

---

## ✅ Success Checklist

Your deployment is successful when:

- [ ] Vercel build completes without errors
- [ ] App loads at your Vercel URL
- [ ] Console shows correct backend URL (not localhost)
- [ ] Country dropdown populates with real data
- [ ] Historical charts display data
- [ ] Scenario simulation works
- [ ] No CORS errors in console
- [ ] Firebase authentication works (if enabled)

---

## 🎯 Quick Fix Summary

**If you see "Unable to connect to server":**

1. ✅ **Set environment variable in Vercel**:
   - Name: `VITE_API_BASE_URL`
   - Value: Your Render backend URL
   - Environment: All (Production, Preview, Development)

2. ✅ **Redeploy** after adding environment variable

3. ✅ **Verify** in browser console: Should show your Render URL, not localhost

4. ✅ **Test backend** directly: Open backend URL in browser, should return JSON

5. ✅ **Update CORS** in backend if needed

---

## 📞 Need Help?

**Vercel Issues**: https://vercel.com/docs
**Check Logs**: Vercel Dashboard → Your Project → Deployments → View Function Logs

**Quick Debug Commands**:
```bash
# Test backend from command line
curl https://your-backend.onrender.com/

# Test countries endpoint
curl https://your-backend.onrender.com/api/countries
```

**In Browser Console**:
```javascript
// Check environment variable
console.log(import.meta.env.VITE_API_BASE_URL);

// Should show your Render URL, not undefined or localhost
```

---

## 🎉 After Successful Deployment

1. **Update Backend CORS** with your final Vercel URL
2. **Test all features** thoroughly
3. **Share your app** - it's live!
4. **Monitor** Render backend logs for any issues

Your app should now be fully functional! 🚀
