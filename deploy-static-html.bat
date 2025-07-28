@echo off
echo 🚀 DEPLOYING STATIC HTML VERSION
echo.

cd /d C:\umbrella-crm

echo 📋 Adding static HTML files...
git add .

echo.
echo 💾 Committing static HTML version...
git commit -m "DEPLOY STATIC HTML - Working CRM demo"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ STATIC HTML DEPLOYED!
echo 🌐 Vercel will now build successfully.
echo 📱 This is a working demo version.
echo.

pause 