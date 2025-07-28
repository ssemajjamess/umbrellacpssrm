@echo off
echo 🧹 CLEANING UP UNNECESSARY FILES
echo.

cd /d C:\umbrella-crm

echo 🗑️ Removing old batch files...
del /q *.bat
echo ✅ Old batch files removed

echo.
echo 🗑️ Removing old documentation...
del /q *.md
echo ✅ Old documentation removed

echo.
echo 🗑️ Removing build and node_modules...
if exist build rmdir /s /q build
if exist node_modules rmdir /s /q node_modules
if exist package-lock.json del package-lock.json
echo ✅ Build files removed

echo.
echo 🗑️ Removing src folder (using static HTML)...
if exist src rmdir /s /q src
echo ✅ Src folder removed

echo.
echo ✅ CLEANUP COMPLETE!
echo 📁 Only essential files remaining
echo.

pause 