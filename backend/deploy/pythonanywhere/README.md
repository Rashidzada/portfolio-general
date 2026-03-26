# PythonAnywhere Deployment Helpers

This folder is designed to reduce PythonAnywhere setup to one short console command plus one WSGI paste.

## Fastest Path

After cloning the repo on PythonAnywhere:

```bash
cd ~/REPOSITORY_NAME
bash backend/deploy/pythonanywhere/bootstrap.sh
```

Then:

1. Edit `backend/.env`
2. Open the PythonAnywhere Web tab
3. Use the generated Python version and virtualenv for the web app
4. Replace the contents of the PythonAnywhere WSGI file with `pythonanywhere_wsgi.py.template`
5. Add static/media mappings
6. Reload

## Static File Mappings

- URL: `/static/`
- Path: `/home/YOURUSERNAME/REPOSITORY_NAME/backend/staticfiles`

- URL: `/media/`
- Path: `/home/YOURUSERNAME/REPOSITORY_NAME/backend/media`

## Why a template WSGI file?

PythonAnywhere’s official deployment flow uses the platform WSGI file from the Web tab, not your project’s own `config/wsgi.py`. This template is prepared for that exact step.
