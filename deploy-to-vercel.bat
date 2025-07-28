@echo off
echo 🚀 Deploying Umbrella CRM to Vercel...
echo.

echo 📦 Installing Vercel CLI...
npm install -g vercel

echo.
echo 🌐 Deploying to Vercel...
vercel --prod

echo.
echo ✅ Deployment complete!
echo 📋 Check the URL above for your live CRM
echo 🔗 You can now connect this to your Wix domain
pause 