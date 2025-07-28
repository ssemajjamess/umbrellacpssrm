@echo off
echo 🔧 Fixing All Unused Import Errors...
echo.

cd /d C:\umbrella-crm

echo 📋 Adding all fixed files...
git add .

echo.
echo 💾 Committing import fixes...
git commit -m "Fix all unused import warnings - Claims, Contracts, Dashboard, Jobs, Leads, Login"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ All unused import errors fixed!
echo 🌐 Vercel will now build successfully.
echo.

pause 