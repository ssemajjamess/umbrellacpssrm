@echo off
echo 🧹 COMPREHENSIVE CLEANUP - REMOVING ALL UNNECESSARY FILES
echo.

cd /d C:\umbrella-crm

echo 🗑️ Deleting all unnecessary batch files...
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

echo ✅ Batch files cleaned!

echo.
echo 🗑️ Deleting unnecessary documentation...
del /q DEPLOY-NOW.md
del /q VERCEL-ENV-SETUP.md
del /q DEPLOYMENT.md
del /q VERCEL-TROUBLESHOOTING.md
del /q VERCEL-SETUP.md
del /q WIX-DEPLOYMENT-READY.md
del /q README.md

echo ✅ Documentation cleaned!

echo.
echo 🗑️ Removing build and node_modules...
if exist build rmdir /s /q build
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json

echo ✅ Build files cleaned!

echo.
echo 🗑️ Removing src folder (using static HTML)...
if exist src rmdir /s /q src

echo ✅ Src folder cleaned!

echo.
echo 🗑️ Removing Firebase files (not needed for static)...
if exist .firebaserc del .firebaserc
if exist firebase.json del firebase.json

echo ✅ Firebase files cleaned!

echo.
echo 🗑️ Removing config files (not needed for static)...
if exist postcss.config.js del postcss.config.js
if exist tailwind.config.js del tailwind.config.js

echo ✅ Config files cleaned!

echo.
echo 📁 FINAL CLEAN PROJECT STRUCTURE:
echo.
echo ✅ Essential files remaining:
echo - deploy-final-crm.bat (main deployment)
echo - cleanup-everything.bat (this cleanup script)
echo - package.json (simplified)
echo - vercel.json (static config)
echo - public/index.html (your CRM)
echo - logo-black.png (your logo)
echo - .gitignore
echo.
echo ✅ CLEANUP COMPLETE!
echo 🚀 Your project is now clean and ready!
echo.

pause 