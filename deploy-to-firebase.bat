@echo off
echo 🚀 Deploying Umbrella CRM to Firebase...
echo.

echo 📦 Installing Firebase CLI...
npm install -g firebase-tools

echo.
echo 🔐 Logging into Firebase...
firebase login

echo.
echo 🌐 Deploying to Firebase...
firebase deploy

echo.
echo ✅ Deployment complete!
echo 📋 Your CRM is live at: https://umbrella-crm-prod.web.app
echo 🔗 You can now connect this to your Wix domain
pause 