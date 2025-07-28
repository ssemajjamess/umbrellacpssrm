@echo off
echo 🚀 Simple Vercel Deployment Fix
echo.

echo 📋 Step 1: Pushing latest changes to GitHub...
cd /d C:\umbrella-crm
git add .
git commit -m "Fix deployment issues"
git push

echo.
echo ✅ Step 2: Changes pushed to GitHub
echo.

echo 📝 Step 3: Vercel Deployment Instructions:
echo.
echo 1. Go to: https://vercel.com/dashboard
echo 2. Click "New Project"
echo 3. Import: ssemajjamess/umbrellacpssrm
echo 4. Click "Deploy"
echo 5. Wait for deployment to complete
echo.

echo 🎯 If you get environment variable errors:
echo - Click "Skip" or "Deploy Anyway"
echo - Your CRM will work without Firebase
echo.

echo 🌐 After deployment, you'll get a URL like:
echo https://umbrellacpssrm.vercel.app
echo.

echo 🔗 Then connect to Wix domain: crm.roofsbyumbrella.com
echo.

pause 