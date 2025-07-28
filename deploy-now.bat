@echo off
echo 🚀 DEPLOYING UMBRELLA CRM TO VERCEL
echo.

cd /d C:\umbrella-crm

echo 📋 Adding all files...
git add .

echo.
echo 💾 Committing current version...
git commit -m "REDEPLOY - Full CRM with AccuLynx login, user system, notes panel"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ CRM DEPLOYED!
echo 🌐 Your CRM should be available at: umbrellacrm-cps.vercel.app
echo 🔐 Demo login available
echo 📝 Full functionality with notes panel
echo.

pause 