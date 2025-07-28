@echo off
echo 🔧 Fixing Firebase environment variable error...
echo.
cd /d C:\umbrella-crm
git add src/firebase.js
git commit -m "Fix Firebase environment variables - use demo mode"
git push
echo.
echo ✅ Fixed! Your CRM should now deploy without errors.
echo 🌐 Check Vercel for your live CRM URL.
pause 