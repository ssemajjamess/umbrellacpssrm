@echo off
echo 🚀 DEPLOYING CRM WITH NOTES SYSTEM & ROLE PERMISSIONS
echo.

cd /d C:\umbrella-crm

echo 📋 Adding notes CRM files...
git add .

echo.
echo 💾 Committing notes CRM...
git commit -m "NOTES CRM - Activity feed, customer notes, role permissions, appointments"

echo.
echo 📤 Pushing to GitHub...
git push

echo.
echo ✅ NOTES CRM DEPLOYED!
echo 📝 Real-time activity feed
echo 👥 Customer notes system
echo 📅 Upcoming appointments
echo 🔐 Role-based permissions
echo 👤 Sales reps: Only their jobs
echo 👨‍💼 Managers: All customers + their jobs
echo 👑 Admins: Everything + system settings
echo.

pause 