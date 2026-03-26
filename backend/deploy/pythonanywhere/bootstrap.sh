#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"

PYTHON_BIN="${PYTHON_BIN:-python3.13}"
VENV_DIR="${VENV_DIR:-$BACKEND_DIR/.venv}"

echo "Using backend directory: $BACKEND_DIR"
echo "Using Python binary: $PYTHON_BIN"
echo "Using virtualenv path: $VENV_DIR"

cd "$BACKEND_DIR"

if [ ! -d "$VENV_DIR" ]; then
  "$PYTHON_BIN" -m venv "$VENV_DIR"
fi

source "$VENV_DIR/bin/activate"
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

if [ ! -f ".env" ]; then
  cp "deploy/pythonanywhere/.env.pythonanywhere.example" ".env"
  echo "Created backend/.env from deploy/pythonanywhere/.env.pythonanywhere.example"
  echo "Edit backend/.env before reloading the web app."
fi

python manage.py migrate
python manage.py seed_portfolio
python manage.py collectstatic --noinput

echo
echo "Bootstrap finished."
echo "Next:"
echo "1. Edit backend/.env with your PythonAnywhere/Vercel domains."
echo "2. Copy deploy/pythonanywhere/pythonanywhere_wsgi.py.template into your PythonAnywhere WSGI file."
echo "3. Add static and media mappings on the PythonAnywhere Web tab."
echo "4. Reload the PythonAnywhere web app."
