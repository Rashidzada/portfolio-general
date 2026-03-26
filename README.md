# Portfolio General

Full-stack portfolio platform built with Django, Django REST Framework, React, TypeScript, Vite, and Tailwind CSS.

This project is not just a frontend portfolio template. It includes:

- a public portfolio website
- a hidden React dashboard for content management
- Django admin as a backend backup CMS
- JWT authentication for the React dashboard
- CRUD APIs for portfolio sections
- file upload and external media URL support
- contact form storage
- PythonAnywhere + Vercel deployment preparation
- SQLite-first setup for easy first deployment

## Main Stack

### Backend

- Django
- Django REST Framework
- Simple JWT
- WhiteNoise
- SQLite first

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Axios

## What This Project Includes

### Public Portfolio

- hero section
- about section
- skills
- services
- projects
- experience and education
- achievements / certificates
- testimonials
- gallery
- contact form
- floating WhatsApp button
- CV download support

### React Dashboard

The React dashboard is available at:

- `/admin/login`
- `/dashboard`

It can manage:

- profile
- section copy
- site settings
- social links
- resume files
- skill categories
- skills
- services
- projects
- project images
- education
- experience
- achievements / certificates
- testimonials
- gallery images
- inbox / contact messages

### Django Admin

Django admin is also available at:

- backend `/admin/`

The React dashboard can open Django admin directly after login without asking for a second login again.

## Project Structure

```text
portfolio-general/
  backend/
  frontend/
  DEPLOYMENT.md
  prompt.md
  README.md
```

## Backend Overview

The backend provides:

- landing API for the full public site payload
- protected dashboard CRUD APIs
- JWT auth endpoints
- admin session bridge for direct Django admin opening
- media URL normalization
- Google Drive link normalization for files and images
- contact message storage
- health check endpoint

Important backend routes:

- `/api/landing/`
- `/api/health/`
- `/api/contact/`
- `/api/auth/token/`
- `/api/auth/token/refresh/`
- `/api/auth/me/`
- `/api/auth/admin-session/`
- `/api/dashboard/overview/`

## Frontend Overview

The frontend provides:

- public responsive portfolio
- hidden admin login
- protected dashboard
- API-connected CRUD manager
- save/delete/create notifications
- centered full-screen loaders
- Vercel SPA rewrites

## Local Setup

## 1. Clone

```bash
git clone https://github.com/Rashidzada/portfolio-general.git
cd portfolio-general
```

## 2. Backend Setup

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
copy .env.example .env
python manage.py migrate
python manage.py seed_portfolio --reset
python manage.py createsuperuser
python manage.py runserver
```

Backend runs at:

- `http://127.0.0.1:8000`
- API base: `http://127.0.0.1:8000/api`

## 3. Frontend Setup

```bash
cd frontend
npm install
copy .env.example .env
npm run dev -- --host 0.0.0.0 --port 5151
```

Frontend runs at:

- `http://127.0.0.1:5151`

## Environment Variables

### Backend `.env`

Use `backend/.env.example` as the starting point.

Important local values:

- `DJANGO_DEBUG=True`
- `BACKEND_PUBLIC_URL=http://127.0.0.1:8000`
- `FRONTEND_SITE_URL=http://127.0.0.1:5151`
- `DATABASE_URL=sqlite:///db.sqlite3`

Important production values:

- `DJANGO_DEBUG=False`
- `BACKEND_PUBLIC_URL=https://YOURUSERNAME.pythonanywhere.com`
- `FRONTEND_SITE_URL=https://YOUR-FRONTEND.vercel.app`
- `DJANGO_SECURE_COOKIES=True`
- `DJANGO_SESSION_COOKIE_SAMESITE=None`
- `DJANGO_CSRF_COOKIE_SAMESITE=None`

### Frontend `.env`

Use:

- `frontend/.env.example` for local
- `frontend/.env.production.example` for production

Important value:

- `VITE_API_BASE_URL=https://YOUR-BACKEND/api`

## Media and File Handling

This project supports both:

- direct file upload
- external file / image URLs

This applies to:

- profile image
- resume file
- project thumbnails
- project gallery images
- certificate images
- certificate PDFs
- testimonials
- gallery items

Google Drive share links are normalized by the backend so they can be used more reliably for deployment.

## Dashboard Login

Login uses a Django staff or superuser account.

Create one with:

```bash
python manage.py createsuperuser
```

Then log in at:

- `http://127.0.0.1:5151/admin/login`

## Seed Data

The project includes portfolio seed data and section-copy defaults.

Run:

```bash
python manage.py seed_portfolio --reset
```

This seeds:

- profile data
- site settings
- section copy
- social links
- resume entry
- skills and categories
- services
- projects and project images
- education
- experience
- achievements
- gallery items
- demo inbox message

## Deployment

This project is prepared for:

- backend on PythonAnywhere
- frontend on Vercel

Use the detailed deployment guide here:

- [DEPLOYMENT.md](./DEPLOYMENT.md)

### PythonAnywhere Notes

- use Python 3.13
- use SQLite for first deployment
- run the provided bootstrap script
- configure static and media mappings
- paste the provided WSGI template into the PythonAnywhere WSGI file

Relevant files:

- `backend/deploy/pythonanywhere/bootstrap.sh`
- `backend/deploy/pythonanywhere/.env.pythonanywhere.example`
- `backend/deploy/pythonanywhere/pythonanywhere_wsgi.py.template`

### Vercel Notes

- root directory should be `frontend`
- framework preset is `Vite`
- output directory is `dist`
- set `VITE_API_BASE_URL` to the live PythonAnywhere backend `/api`

Relevant files:

- `frontend/vercel.json`
- `frontend/.env.production.example`

## Recommended Deployment Order

1. Push the repo to GitHub
2. Deploy backend to PythonAnywhere
3. Set the live backend URL in Vercel
4. Deploy frontend to Vercel
5. Add final frontend domain to backend trusted origins
6. Reload PythonAnywhere

## Quality and UX Notes

Current implementation includes:

- responsive public website
- responsive admin login
- responsive dashboard layout
- centered loading states
- action notifications for create, save, delete, and errors
- direct Django admin opening from the React dashboard

## Useful Commands

### Backend

```bash
python manage.py check
python manage.py migrate
python manage.py seed_portfolio --reset
python manage.py collectstatic --noinput
```

### Frontend

```bash
npm install
npm run dev -- --port 5151
npm run build
```

## First Push

After the project is ready locally:

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Rashidzada/portfolio-general.git
git push -u origin main
```

## Important Notes Before Pushing

- do not push `backend/.env`
- do not push `frontend/.env`
- do not push local SQLite database
- do not push local media files
- do not push `node_modules`
- do not push local logs

These are already ignored by `.gitignore`.
