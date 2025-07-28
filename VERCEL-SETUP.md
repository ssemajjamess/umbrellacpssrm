# 🔧 Fix Vercel Environment Variables Error

## ❌ Error: "REACT_APP_FIREBASE_API_KEY" references Secret "firebase-api-key", which does not exist.

## ✅ Solution: Set up Firebase in Vercel

### **Step 1: Create Firebase Project**
1. Go to: https://console.firebase.google.com/
2. Click "Create a project"
3. Name it: `umbrella-crm-prod`
4. Follow setup wizard

### **Step 2: Get Firebase Config**
1. In Firebase Console, click the gear icon ⚙️
2. Click "Project settings"
3. Scroll down to "Your apps"
4. Click "Add app" → Web app
5. Register app with name: `umbrella-crm`
6. Copy the config object

### **Step 3: Set Vercel Environment Variables**
1. Go to: https://vercel.com/dashboard
2. Click your project: `umbrellacpssrm`
3. Go to "Settings" tab
4. Click "Environment Variables"
5. Add these variables:

```
REACT_APP_FIREBASE_API_KEY=your_api_key_here
REACT_APP_FIREBASE_AUTH_DOMAIN=umbrella-crm-prod.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=umbrella-crm-prod
REACT_APP_FIREBASE_STORAGE_BUCKET=umbrella-crm-prod.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### **Step 4: Redeploy**
1. Go to Vercel dashboard
2. Click "Deployments"
3. Click "Redeploy" on your latest deployment

### **🎯 Quick Fix (Temporary)**
If you want to deploy without Firebase for now:

1. **Edit:** `src/firebase.js`
2. **Comment out** the Firebase initialization
3. **Push to GitHub**
4. **Redeploy on Vercel**

### **📞 Need Help?**
- **Firebase Setup:** https://firebase.google.com/docs/web/setup
- **Vercel Environment Variables:** https://vercel.com/docs/concepts/projects/environment-variables

---

**After fixing this, your CRM will be live! 🚀** 