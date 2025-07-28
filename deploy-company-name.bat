@echo off
echo 🚀 DEPLOYING UPDATED COMPANY NAME
echo.

cd /d C:\umbrella-crm

echo 📋 Adding company name update...
git add .

echo.
echo 💾 Committing company name change...
git commit -m "COMPANY NAME - Updated to Claims & Property Solutions LLP"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ COMPANY NAME UPDATED!
echo 🏢 Claims & Property Solutions LLP
echo 📝 Updated on login page
echo.

pause 