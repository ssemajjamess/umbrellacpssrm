@echo off
echo 🧹 CLEANING UP ALL UNNECESSARY BATCH FILES
echo.

cd /d C:\umbrella-crm

echo 🗑️ Deleting old batch files...
del /q cleanup-and-deploy.bat
del /q guaranteed-deploy.bat
del /q deploy-static-html.bat
del /q disable-eslint-fix.bat
del /q final-deployment-fix.bat
del /q fix-all-imports-final.bat
del /q fix-all-unused-imports.bat
del /q clean-install-fix.bat
del /q fix-build-now.bat
del /q fix-build-warnings.bat
del /q fix-all-imports.bat
del /q fix-build-error.bat
del /q push-to-github-simple.bat
del /q start-crm-simple.bat
del /q fix-vercel-error.bat
del /q deploy-simple.bat
del /q fix-and-push.bat
del /q push-fix.bat
del /q deploy-github-vercel.bat
del /q deploy-to-firebase.bat
del /q deploy-to-vercel.bat
del /q copy-logo.bat
del /q start-crm.bat

echo ✅ All unnecessary batch files deleted!

echo.
echo 📁 Remaining essential files:
echo - deploy-final-crm.bat (main deployment)
echo - cleanup-files.bat (cleanup script)
echo - package.json
echo - vercel.json
echo - public/index.html
echo - logo-black.png

echo.
echo ✅ CLEANUP COMPLETE!
echo.

pause 