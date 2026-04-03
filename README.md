# Shiv Travel - Modern React & FastAPI Migration

This project has been migrated from a PHP/MySQL setup to a modern frontend/backend architecture.

## Tech Stack
- **Frontend**: React (Vite), Framer Motion, Lucide Icons, Axios
- **Backend**: FastAPI (Python), SQLAlchemy, SQLite (Portable)
- **Database**: SQLite (Automated setup)

## Project Structure
- `/backend`: FastAPI source code
- `/react-frontend`: React source code
- `/uploads`: Image storage (shared)

## Getting Started

### 1. Install Dependencies

**Backend:**
```bash
cd backend
pip install -r requirements.txt
```

**Frontend:**
```bash
cd react-frontend
npm install
```

### 2. Running the Project

You can run both concurrently using the root package.json:

**Running Backend:**
```bash
npm run dev:backend
```

**Running Frontend:**
```bash
npm run dev:frontend
```

## Admin Access
Go to `/admin` in the browser to manage packages.
The backend uses SQLite by default, so you don't need to configure any database server.

Happy Traveling!
