@echo off
echo 🚀 Pushing to GitHub...
echo.

cd /d C:\umbrella-crm

echo 📋 Adding all files...
git add .

echo.
echo 💾 Committing changes...
git commit -m "Update CRM files"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ Done! Your changes are on GitHub.
echo 🌐 Vercel will auto-deploy your changes.
echo.

pause 