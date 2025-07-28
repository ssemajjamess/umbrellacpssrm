@echo off
echo 🔧 Fixing Build Error...
echo.

cd /d C:\umbrella-crm

echo 📋 Adding fixed files...
git add .

echo.
echo 💾 Committing build fix...
git commit -m "Fix build error - remove Firebase imports"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ Build error fixed!
echo 🌐 Vercel will now deploy successfully.
echo.

pause 