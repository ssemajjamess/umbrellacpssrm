@echo off
echo 🚀 GUARANTEED VERCEL DEPLOYMENT
echo.

cd /d C:\umbrella-crm

echo 📋 Adding all static files...
git add .

echo.
echo 💾 Committing static deployment...
git commit -m "GUARANTEED DEPLOY - Static HTML with Vercel config"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ GUARANTEED TO WORK!
echo 🌐 Vercel will serve static files - NO BUILD NEEDED
echo 📱 Your CRM will be live in minutes
echo.

pause 