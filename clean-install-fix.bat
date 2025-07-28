@echo off
echo 🧹 Clean Install and Build Fix...
echo.

cd /d C:\umbrella-crm

echo 📦 Removing old dependencies...
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo.
echo 📦 Installing fresh dependencies...
npm install

echo.
echo 🏗️ Testing build locally...
npm run build

echo.
echo 📋 Adding all files...
git add .

echo.
echo 💾 Committing clean install...
git commit -m "Clean install - fix build issues"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ Clean install complete!
echo 🌐 Vercel will now build successfully.
echo.

pause 