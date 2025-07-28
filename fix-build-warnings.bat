@echo off
echo 🔧 Fixing Build Warnings and Optimizing Deployment...
echo.

cd /d C:\umbrella-crm

echo 📋 Adding all optimized files...
git add .

echo.
echo 💾 Committing build optimizations...
git commit -m "Fix build warnings - optimize Vercel deployment"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ Build warnings fixed!
echo 🌐 Vercel will now deploy with optimized settings.
echo 📦 Smaller build size and faster deployment.
echo.

pause 