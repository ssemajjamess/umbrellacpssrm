@echo off
echo 🚀 Fixing Build - Clean Configuration...
echo.

cd /d C:\umbrella-crm

echo 📋 Adding clean build files...
git add .

echo.
echo 💾 Committing clean build config...
git commit -m "Clean build - remove problematic dependencies"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ Clean build configuration pushed!
echo 🌐 Vercel will now build successfully.
echo.

pause 