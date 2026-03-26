# Deployment Guide

This project is prepared for:

- Backend on PythonAnywhere
- Frontend on Vercel

## Recommended Order

1. Push this repository to GitHub
2. Deploy the backend to PythonAnywhere first
3. Deploy the frontend to Vercel with the live backend API URL

## Backend: PythonAnywhere

### One-command bootstrap on PythonAnywhere

After cloning your repository on PythonAnywhere:

```bash
cd ~/REPOSITORY_NAME
bash backend/deploy/pythonanywhere/bootstrap.sh
```

That script will:

- create a virtualenv inside `backend/.venv`
- install backend dependencies
- create `backend/.env` from the PythonAnywhere example if missing
- use SQLite for the first live deployment
- run migrations
- seed demo content
- collect static files

### PythonAnywhere Web App Settings

Create a new web app using **Manual configuration** and Python **3.13**.

Then configure:

- Source code: `/home/YOURUSERNAME/REPOSITORY_NAME/backend`
- Working directory: `/home/YOURUSERNAME/REPOSITORY_NAME/backend`
- Virtualenv: `/home/YOURUSERNAME/REPOSITORY_NAME/backend/.venv`

### WSGI File

PythonAnywhere uses its own WSGI file from the Web tab. Replace that file with the contents of:

- `backend/deploy/pythonanywhere/pythonanywhere_wsgi.py.template`

Update:

- `YOURUSERNAME`
- `REPOSITORY_NAME`

### Static and Media Mappings

Add these mappings in the PythonAnywhere Web tab:

- `/static/` -> `/home/YOURUSERNAME/REPOSITORY_NAME/backend/staticfiles`
- `/media/` -> `/home/YOURUSERNAME/REPOSITORY_NAME/backend/media`

### Backend Environment File

Use:

- `backend/.env.example` for generic local/production config
- `backend/deploy/pythonanywhere/.env.pythonanywhere.example` for PythonAnywhere-specific values

Important production values:

- `DJANGO_DEBUG=False`
- `BACKEND_PUBLIC_URL=https://YOURUSERNAME.pythonanywhere.com`
- `FRONTEND_SITE_URL=https://YOUR-FRONTEND.vercel.app`
- `DJANGO_ALLOWED_HOSTS=YOURUSERNAME.pythonanywhere.com`
- `DATABASE_URL=sqlite:////home/YOURUSERNAME/REPOSITORY_NAME/backend/db.sqlite3`
- `DJANGO_CSRF_TRUSTED_ORIGINS=https://YOURUSERNAME.pythonanywhere.com,https://YOUR-FRONTEND.vercel.app,https://*.vercel.app`
- `DJANGO_CORS_ALLOWED_ORIGINS=https://YOUR-FRONTEND.vercel.app`
- `DJANGO_CORS_ALLOWED_ORIGIN_REGEXES=^https://.*\.vercel\.app$`
- `DJANGO_SECURE_COOKIES=True`
- `DJANGO_SESSION_COOKIE_SAMESITE=None`
- `DJANGO_CSRF_COOKIE_SAMESITE=None`
- `DJANGO_SECURE_SSL_REDIRECT=True`

Why these matter:

- `BACKEND_PUBLIC_URL` makes uploaded media and CV links point to PythonAnywhere instead of the frontend domain.
- `FRONTEND_SITE_URL` makes Django admin "View site" open the Vercel frontend.
- the `SAMESITE=None` cookie settings let the React dashboard create a Django admin session and open backend admin without asking the user to log in again.

### Database Choice

For the first deployment, use SQLite on PythonAnywhere. This project is already configured for that path, and it keeps setup much simpler.

Use PostgreSQL later only if you outgrow SQLite or need a separate managed database.

### Health Check

After reload, check:

- `https://YOURUSERNAME.pythonanywhere.com/api/health/`

## Frontend: Vercel

### Vercel Project Settings

Create a Vercel project from the same GitHub repository with:

- Root Directory: `frontend`
- Framework Preset: `Vite`
- Install Command: `npm install`
- Build Command: `npm run build`
- Output Directory: `dist`

### Frontend Environment Variable

Set this in Vercel:

- `VITE_API_BASE_URL=https://YOURUSERNAME.pythonanywhere.com/api`

Optional:

- `VITE_SITE_URL=https://YOUR-FRONTEND.vercel.app`

### One-click Vercel Template

After you push to GitHub, replace `YOUR_GITHUB_REPO_URL` in this link:

```text
https://vercel.com/new/clone?repository-url=YOUR_GITHUB_REPO_URL&root-directory=frontend&install-command=npm%20install&build-command=npm%20run%20build&output-directory=dist
```

That opens the Vercel import screen with the important build settings prefilled.

## Final Live Wiring

When the Vercel project gives you the final frontend domain:

1. add that domain to `backend/.env` on PythonAnywhere
2. reload the PythonAnywhere web app
3. redeploy Vercel if you changed `VITE_SITE_URL`

## Files Added For Deployment

- `DEPLOYMENT.md`
- `backend/deploy/pythonanywhere/bootstrap.sh`
- `backend/deploy/pythonanywhere/pythonanywhere_wsgi.py.template`
- `backend/deploy/pythonanywhere/.env.pythonanywhere.example`
- `frontend/.env.production.example`
- `frontend/vercel.json`
