# 🚀 Speech Therapy Platform - Deploy Guide

## Railway Deployment

### Backend Setup
1. **Connect Repository** to Railway
2. **Set Environment Variables:**
   ```env
   MONGODB_URI=your_mongodb_atlas_connection_string
   PORT=5000
   JWT_SECRET=your_secure_secret
   NODE_ENV=production
3. Auto-deploy on main branch push

### Frontend Setup
1. **Connect Repository** to Vercel
2. **Set Environment Variables:**
   ```env
   REACT_APP_API_URL=https://your-backend.railway.app/api
   REACT_APP_WS_URL=wss://your-backend.railway.app
3. **Build Command:** npm run build
4. **Start Command:** npm run dev

### MongoDB Atlas
1. Create cluster in **MongoDB Atlas**
2. Get connection string
3. Add IP to whitelist (**0.0.0.0/0** for Railway)
4. Create database user

### Custom Domains (Optional)
- **Backend:** api.yourdomain.com
- **Frontend:** app.yourdomain.com

### Health Check URLs
- **Backend:** https://your-backend.railway.app/api/health
- **Frontend:** https://your-frontend.vercel.app

### Troubleshooting
1. Check Railway logs for errors
2. Verify environment variables
3. Confirm MongoDB connection
4. Test WebSocket connectivity
