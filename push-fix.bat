@echo off
echo 🚀 Pushing Firebase fix to GitHub...
cd /d C:\umbrella-crm
git add .
git commit -m "Fix Firebase environment variables"
git push
echo ✅ Done! Your CRM should now deploy without errors.
pause 