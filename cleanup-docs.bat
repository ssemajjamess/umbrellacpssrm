@echo off
echo 🧹 CLEANING UP UNNECESSARY DOCUMENTATION
echo.

cd /d C:\umbrella-crm

echo 🗑️ Deleting old documentation files...
del /q DEPLOY-NOW.md
del /q VERCEL-ENV-SETUP.md
del /q DEPLOYMENT.md
del /q VERCEL-TROUBLESHOOTING.md
del /q VERCEL-SETUP.md
del /q WIX-DEPLOYMENT-READY.md
del /q README.md

echo ✅ All unnecessary documentation deleted!

echo.
echo 📁 Remaining essential files:
echo - deploy-final-crm.bat (main deployment)
echo - cleanup-files.bat (cleanup script)
echo - cleanup-all-bat.bat (batch cleanup)
echo - cleanup-docs.bat (docs cleanup)
echo - package.json
echo - vercel.json
echo - public/index.html
echo - logo-black.png

echo.
echo ✅ DOCUMENTATION CLEANUP COMPLETE!
echo.

pause 