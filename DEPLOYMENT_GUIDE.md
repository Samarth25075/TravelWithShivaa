# Deployment Guide: Shiv Travel (FastAPI + React)

Follow these steps to deploy your application to [Render](https://render.com/), with the frontend and backend as separate services.

## Architecture
- **Backend**: FastAPI (Python) - deployed as a **Web Service**.
- **Frontend**: React (Vite) - deployed as a **Static Site**.
- **Database**: PostgreSQL (configured via Neon).

---

## 1. Project Configuration Checklist

Before deploying, ensure you have pushed all your latest changes (including `render.yaml` and `main.py`) to your GitHub repository.

### Key Files Updated:
- `render.yaml`: Contains the service settings for Render.
- `backend/main.py`: Supports `ALLOWED_ORIGIN` for CORS security.

---

## 2. Deploy the Backend (Python Web Service)

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository.
4. Set the following configuration:
   - **Name**: `shiv-travel-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn -w 4 -k uvicorn.workers.UvicornWorker main:app`
5. Click **Advanced** and add **Environment Variables**:
   - `DATABASE_URL`: *Your Neon PostgreSQL connection string*
   - `PORT`: `10000`
   - `ALLOWED_ORIGIN`: *Leave blank for now, or put '*' for testing.*
6. Click **Create Web Service**.
7. **Copy your Backend URL** (e.g., `https://shiv-travel-backend.onrender.com`).

---

## 3. Deploy the Frontend (Static Site)

1. In the Render Dashboard, click **New +** and select **Static Site**.
2. Connect your GitHub repository.
3. Set the following configuration:
   - **Name**: `shiv-travel-frontend`
   - **Root Directory**: `react-frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Click **Advanced** and find **Redirects/Rewrites**:
   - **Add Rule 1** (API Proxy):
     - **Source**: `/api/*`
     - **Destination**: `https://your-backend-url.onrender.com/api/*` (Replace with your actual backend URL).
     - **Action**: `Rewrite`
   - **Add Rule 2** (SPA Routing):
     - **Source**: `/*`
     - **Destination**: `/index.html`
     - **Action**: `Rewrite`
5. Click **Create Static Site**.
6. **Copy your Frontend URL** (e.g., `https://shiv-travel-frontend.onrender.com`).

---

## 4. Final Security Step (CORS)

1. Go to your **Backend Service** settings on Render.
2. In the **Environment Variables** section, update `ALLOWED_ORIGIN` with your actual frontend URL (e.g., `https://shiv-travel-frontend.onrender.com`).
3. Save the changes. Render will redeploy the backend automatically.

---

## 5. (Optional) Database Migration

To seed your production database with initial data:
1. Update your local `backend/.env` with the production `DATABASE_URL`.
2. Run the seed script:
   ```bash
   cd backend
   python seed_data.py
   ```

---

## Troubleshooting
- **Build Failures**: Check that you are in the correct `Root Directory` in Render settings.
- **API Errors**: Ensure the rewrite rule in the Frontend service points to the correct Backend URL.
- **CORS Errors**: Check that the `ALLOWED_ORIGIN` in your Backend precisely matches your Frontend URL (including `https://`).
