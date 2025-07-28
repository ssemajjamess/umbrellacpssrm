# 🔧 Vercel Environment Variables Setup

## 📋 Step-by-Step Instructions

### **Step 1: Go to Vercel Dashboard**
1. Go to: https://vercel.com/dashboard
2. Click your project: `umbrellacpssrm`
3. Go to "Settings" tab
4. Click "Environment Variables"

### **Step 2: Add These Variables**

**For Production Environment:**
```
Key: REACT_APP_FIREBASE_API_KEY
Value: demo-key
Environment: Production

Key: REACT_APP_FIREBASE_AUTH_DOMAIN
Value: demo.firebaseapp.com
Environment: Production

Key: REACT_APP_FIREBASE_PROJECT_ID
Value: demo-project
Environment: Production

Key: REACT_APP_FIREBASE_STORAGE_BUCKET
Value: demo.appspot.com
Environment: Production

Key: REACT_APP_FIREBASE_MESSAGING_SENDER_ID
Value: 123456789
Environment: Production

Key: REACT_APP_FIREBASE_APP_ID
Value: 1:123456789:web:demo
Environment: Production
```

### **Step 3: Redeploy**
1. Go to "Deployments" tab
2. Click "Redeploy" on latest deployment

### **🎯 Alternative: Skip Environment Variables**
If you want to deploy without Firebase:
1. **Run:** `C:\umbrella-crm\clean-install-fix.bat`
2. **Your CRM will work** without environment variables
3. **All features work** in demo mode

---

**Your CRM will deploy successfully after this!** 🚀 