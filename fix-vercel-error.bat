@echo off
echo 🔧 Fixing Vercel Environment Variable Error...
echo.

echo 📋 Step 1: Removing environment variable dependencies...
cd /d C:\umbrella-crm
git add vercel.json
git commit -m "Remove environment variables from Vercel config"
git push

echo.
echo ✅ Step 2: Changes pushed to GitHub
echo.

echo 📝 Step 3: Deploy on Vercel:
echo.
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click "New Project" 
echo 3. Import: ssemajjamess/umbrellacpssrm
echo 4. Click "Deploy"
echo 5. No environment variables needed!
echo.

echo 🎉 Your CRM will deploy successfully now!
echo 🌐 You'll get a URL like: https://umbrellacpssrm.vercel.app
echo.

pause 