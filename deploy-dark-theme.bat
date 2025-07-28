@echo off
echo 🚀 DEPLOYING DARK THEME CRM
echo.

cd /d C:\umbrella-crm

echo 📋 Adding dark theme CRM files...
git add .

echo.
echo 💾 Committing dark theme CRM...
git commit -m "DARK THEME CRM - Matches insurance portal design"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ DARK THEME CRM DEPLOYED!
echo 🌐 Matches your insurance portal design
echo 📱 Dark theme with blue/red branding
echo 🔐 Login page with umbrella logo
echo.

pause 