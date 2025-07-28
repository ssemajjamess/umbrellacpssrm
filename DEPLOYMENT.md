# 🚀 Umbrella CRM - Deployment Guide

## 📋 **Files Ready for Wix Deployment**

Your CRM is now ready for deployment! Here are all the files you need:

### **📁 Production Build Files**
- `build/` - Complete production build (ready to upload)
- `public/logo-black.png` - Your logo with black background
- `vercel.json` - Vercel deployment configuration
- `firebase.json` - Firebase hosting configuration
- `.firebaserc` - Firebase project settings

### **🎯 Deployment Options**

#### **Option 1: Vercel (Recommended)**
1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy to Vercel:**
   ```bash
   vercel --prod
   ```

3. **Get your URL:** `https://your-project.vercel.app`

#### **Option 2: Firebase Hosting**
1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase:**
   ```bash
   firebase login
   ```

3. **Deploy to Firebase:**
   ```bash
   firebase deploy
   ```

4. **Get your URL:** `https://umbrella-crm-prod.web.app`

### **🔗 Wix Domain Integration**

#### **Step 1: Get Your CRM URL**
After deploying, you'll get a URL like:
- Vercel: `https://umbrella-crm.vercel.app`
- Firebase: `https://umbrella-crm-prod.web.app`

#### **Step 2: Connect to Wix**
1. **Login to Wix Dashboard**
2. **Go to Domains → Manage Domains**
3. **Click on your domain:** `roofsbyumbrella.com`
4. **Add Subdomain:**
   - **Subdomain:** `crm` or `dashboard`
   - **Points to:** Your CRM URL (from Step 1)
   - **Type:** CNAME Record

#### **Step 3: DNS Settings**
Add these DNS records in Wix:

**For Vercel:**
```
Type: CNAME
Name: crm
Value: cname.vercel-dns.com
```

**For Firebase:**
```
Type: CNAME
Name: crm
Value: umbrella-crm-prod.web.app
```

### **🌐 Final URLs**
- **Main Website:** `www.roofsbyumbrella.com`
- **CRM Dashboard:** `crm.roofsbyumbrella.com` or `dashboard.roofsbyumbrella.com`

### **🔧 Environment Variables**
Set these in your hosting platform:

```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=umbrella-crm-prod
REACT_APP_FIREBASE_STORAGE_BUCKET=umbrella-crm-prod.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

### **📱 Features Ready**
✅ **Professional Web Design** (no mobile status bars)
✅ **Your Logo with Black Background**
✅ **All Customer Fields** from spreadsheets
✅ **Editable Dropdowns** with your data
✅ **Mobile Responsive**
✅ **Dark Theme** like your insurance portal
✅ **Complete CRM Functionality**

### **🎨 Design Features**
- **Black background** with your logo
- **Professional web layout** (no mobile elements)
- **Clean iOS-style design**
- **Glassmorphism effects**
- **Your company branding** throughout

### **📞 Support**
If you need help with deployment:
1. **Vercel Support:** https://vercel.com/support
2. **Firebase Support:** https://firebase.google.com/support
3. **Wix Support:** https://support.wix.com

---

**Your CRM is ready for production! 🎉** 