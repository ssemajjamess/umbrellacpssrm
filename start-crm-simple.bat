@echo off
echo 🚀 Starting Umbrella CRM...
echo.

cd /d C:\umbrella-crm

echo 📦 Installing dependencies...
npm install

echo.
echo 🌐 Starting development server...
echo 📱 Your CRM will open at: http://localhost:3000
echo.

npm start

pause 