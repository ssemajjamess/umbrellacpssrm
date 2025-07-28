@echo off
echo 🔧 Fixing All Import Errors...
echo.

cd /d C:\umbrella-crm

echo 📋 Adding all fixed files...
git add .

echo.
echo 💾 Committing import fixes...
git commit -m "Fix unused import warnings - Photos, Reports, Scheduling, Settings"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ All import errors fixed!
echo 🌐 Vercel will now build successfully.
echo.

pause 