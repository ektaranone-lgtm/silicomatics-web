# Deployment Guide: GitHub Pages + Backend Hosting

## Overview

Your application uses a **split architecture**:
- **Frontend**: Deployed to GitHub Pages (static hosting)
- **Backend**: Deployed to Render/Railway (Node.js server)
- **Database**: MongoDB Atlas (cloud database)

## 🚀 Deployment Steps

### Part 1: MongoDB Atlas Setup (5 minutes)

1. **Create MongoDB Atlas Account**
   - Go to https://www.mongodb.com/cloud/atlas/register
   - Sign up for free account

2. **Create Free Cluster**
   - Choose "M0 Sandbox" (FREE forever)
   - Select closest region to your users
   - Click "Create Cluster"

3. **Create Database User**
   - Security → Database Access
   - Add New Database User
   - Username: `silicomatics_user`
   - Password: Generate secure password (save it!)
   - User Privileges: Read and write to any database

4. **Whitelist IP Addresses**
   - Security → Network Access
   - Click "Add IP Address"
   - Choose "Allow Access from Anywhere" (0.0.0.0/0)
   - (For production, restrict to your backend server's IPs)

5. **Get Connection String**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string:
     ```
     mongodb+srv://silicomatics_user:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority
     ```
   - Replace `<password>` with your actual password
   - Add your database name before the `?`, example:
     ```
     mongodb+srv://silicomatics_user:PASSWORD@cluster0.xxxxx.mongodb.net/silicomatics?retryWrites=true&w=majority
     ```

---

### Part 2: Deploy Backend to Render (10 minutes)

#### Option A: Using Render Dashboard

1. **Sign up for Render**
   - Go to https://render.com
   - Sign up with GitHub (recommended)

2. **Create New Web Service**
   - Dashboard → "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the repository

3. **Configure Service**
   - Name: `silicomatics-backend`
   - Region: Choose closest to your users
   - Branch: `main`
   - Root Directory: `backend`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`

4. **Add Environment Variables**
   Click "Advanced" → "Add Environment Variable"
   
   Required variables:
   ```
   NODE_ENV=production
   MONGODB_URI=mongodb+srv://silicomatics_user:PASSWORD@cluster0.xxxxx.mongodb.net/silicomatics?retryWrites=true&w=majority
   JWT_SECRET=your-super-secret-jwt-key-change-this-to-random-string
   FRONTEND_URL=https://YOUR-USERNAME.github.io/silicomatics-web
   PORT=5000
   
   # Email settings (for password reset)
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-specific-password
   EMAIL_FROM=noreply@silicomatics.com
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Wait 5-10 minutes for first deploy
   - Your backend URL will be: `https://silicomatics-backend.onrender.com`

#### Option B: Using render.yaml (Automated)

1. Push the `backend/render.yaml` file to your repository
2. In Render dashboard: "New +" → "Blueprint"
3. Connect repository and select `backend/render.yaml`
4. Add environment variables in Render dashboard
5. Deploy automatically

---

### Part 3: Update Frontend Configuration

1. **Update API URL**
   
   Edit `silico-frontend/.env.production`:
   ```env
   VITE_API_URL=https://silicomatics-backend.onrender.com/api
   ```

2. **Update CORS in Backend**
   
   Your backend already has CORS configured via `FRONTEND_URL` env variable.
   Make sure it's set to your GitHub Pages URL:
   ```
   FRONTEND_URL=https://YOUR-USERNAME.github.io/silicomatics-web
   ```

---

### Part 4: Deploy Frontend to GitHub Pages

1. **Update vite.config.ts** (already configured)
   
   Check that the base path matches your repo name:
   ```typescript
   base: process.env.NODE_ENV === 'production' ? '/silicomatics-web/' : '/',
   ```

2. **Push to GitHub**
   ```bash
   cd silico-frontend
   git add .
   git commit -m "Configure for production deployment"
   git push origin main
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Source: "GitHub Actions"
   - The workflow will auto-deploy

4. **Your frontend will be live at:**
   ```
   https://YOUR-USERNAME.github.io/silicomatics-web/
   ```

---

## 🔧 Testing Your Deployment

### 1. Test Backend Health
```bash
curl https://silicomatics-backend.onrender.com/api/health
```

Expected response:
```json
{
  "success": true,
  "message": "Server is running"
}
```

### 2. Test MongoDB Connection
Check Render logs for successful database connection message.

### 3. Test Frontend
- Visit your GitHub Pages URL
- Try signing up a new user
- Try logging in
- Check browser console for any CORS errors

---

## 🐛 Troubleshooting

### CORS Errors
- Ensure `FRONTEND_URL` in backend matches your exact GitHub Pages URL
- Include `/silicomatics-web` if that's your repo name
- No trailing slash

### Backend Won't Start
- Check Render logs for errors
- Verify all environment variables are set
- Check MongoDB connection string is correct

### "Cannot connect to server"
- Verify backend is running on Render
- Check the API URL in frontend `.env.production`
- Note: Free Render services sleep after 15 min - first request takes 30-60 seconds

### MongoDB Connection Failed
- Verify connection string format
- Check password doesn't contain special characters (URL encode if needed)
- Ensure IP whitelist includes 0.0.0.0/0 or Render's IPs

---

## 💰 Cost Breakdown

- **MongoDB Atlas (M0)**: FREE forever (512MB)
- **Render (Free tier)**: FREE (sleeps after 15 min inactivity)
- **GitHub Pages**: FREE for public repos
- **Total**: $0/month (with free tiers)

### Upgrading Later
- **Render Starter**: $7/month (no sleep, better performance)
- **MongoDB M2**: $9/month (2GB storage, better performance)
- **Custom Domain**: ~$12/year (optional)

---

## 🔒 Security Best Practices

1. **Environment Variables**
   - Never commit `.env` files
   - Use strong JWT_SECRET (32+ random characters)
   - Rotate secrets periodically

2. **MongoDB**
   - Use strong passwords
   - In production, whitelist only Render's IP addresses
   - Enable MongoDB Atlas encryption at rest

3. **HTTPS**
   - GitHub Pages and Render provide HTTPS by default
   - Never use HTTP in production

4. **Rate Limiting**
   - Already configured in your backend
   - Consider adding more aggressive limits

---

## 📊 Monitoring

### Render Dashboard
- View logs in real-time
- Monitor CPU/Memory usage
- Set up alerts

### MongoDB Atlas
- Monitor connections
- Query performance
- Set up alerts for storage

---

## 🚀 Custom Domain (Optional)

### For Frontend (GitHub Pages)
1. Buy domain (e.g., silicomatics.com)
2. Add CNAME record: `YOUR-USERNAME.github.io`
3. In GitHub: Settings → Pages → Custom domain
4. Update `FRONTEND_URL` in backend env vars

### For Backend (Render)
1. In Render: Settings → Custom Domain
2. Add your domain (e.g., api.silicomatics.com)
3. Update DNS with Render's values
4. Update `VITE_API_URL` in frontend

---

## 📝 Environment Variables Reference

### Backend (Render)
```env
# Required
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=random-secret-string-32-chars-minimum
FRONTEND_URL=https://username.github.io/repo-name
PORT=5000

# Optional (for password reset)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=app-specific-password
EMAIL_FROM=noreply@silicomatics.com
```

### Frontend (GitHub Pages)
Create `silico-frontend/.env.production`:
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## 🎯 Next Steps

1. ✅ Set up MongoDB Atlas
2. ✅ Deploy backend to Render
3. ✅ Configure environment variables
4. ✅ Update frontend API URL
5. ✅ Deploy frontend to GitHub Pages
6. ✅ Test complete flow
7. 🚀 Share your live URL!

---

## 🆘 Need Help?

- **MongoDB Atlas Docs**: https://docs.atlas.mongodb.com
- **Render Docs**: https://render.com/docs
- **GitHub Pages Docs**: https://docs.github.com/pages

Your architecture is production-ready! 🎉
