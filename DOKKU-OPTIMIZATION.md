# Dokku Optimization for 1GB RAM Servers

## 🎯 Overview

This guide provides optimizations for running your Django + React application on Dokku with a 1GB RAM server.

## 📊 Memory Allocation Strategy

- **Backend (Django)**: 512MB
- **Frontend (Nginx)**: 256MB
- **Database (PostgreSQL)**: 256MB
- **System overhead**: ~256MB

## 🚀 Quick Setup

### 1. Run the Optimization Script

```bash
# On your Dokku server
chmod +x dokku-memory-optimization.sh
./dokku-memory-optimization.sh
```

### 2. Configure Environment Variables

```bash
# Backend environment
dokku config:set api DJANGO_SETTINGS_MODULE=init_backend.settings
dokku config:set api PYTHONUNBUFFERED=1
dokku config:set api DJANGO_DEBUG=False
dokku config:set api DATABASE_URL=postgres://user:pass@host:port/db

# Frontend environment
dokku config:set web NODE_ENV=production
dokku config:set web VITE_API_URL=https://your-api-domain.com
```

### 3. Set Resource Limits

```bash
# Backend limits
dokku resource:limit api memory=512m
dokku resource:limit api cpu=0.5

# Frontend limits
dokku resource:limit web memory=256m
dokku resource:limit web cpu=0.3

# Database limits (if using PostgreSQL)
dokku resource:limit init-db memory=256m
dokku resource:limit init-db cpu=0.3
```

## 🔧 Key Optimizations Made

### Backend (Django)

- ✅ Single Gunicorn worker to reduce memory usage
- ✅ Optimized Docker build with multi-stage
- ✅ Non-root user for security
- ✅ Memory-efficient Python settings

### Frontend (React/Vite)

- ✅ Alpine Linux base image (smaller)
- ✅ Optimized Vite build configuration
- ✅ Code splitting for better caching
- ✅ Terser minification with console removal

### Infrastructure

- ✅ Simplified deployment using git push (no Docker image import)
- ✅ Memory limits for all containers
- ✅ Optimized Nginx configuration
- ✅ Docker daemon optimization

## 📈 Monitoring Commands

```bash
# Check resource usage
dokku resource:report

# Monitor containers
docker stats

# Check system memory
free -h

# View app logs
dokku logs api
dokku logs web
```

## 🚨 Troubleshooting

### High Memory Usage

```bash
# Check which containers use most memory
docker stats --no-stream

# Restart problematic containers
dokku ps:restart api
dokku ps:restart web
```

### Build Failures

```bash
# Clear build cache
dokku builder:clear-cache api
dokku builder:clear-cache web

# Check build logs
dokku builder:report api
```

### Database Issues

```bash
# Check PostgreSQL status
dokku postgres:info init-db

# Backup and restore if needed
dokku postgres:backup init-db
```

## 🔄 Deployment Workflow

1. **Push to main branch** → Triggers GitHub Actions
2. **GitHub Actions** → Builds and deploys via git push to Dokku
3. **Dokku** → Builds optimized Docker images
4. **Automatic restart** → Apps restart with new code

## 📝 Environment Variables

### Backend (.env)

```env
DJANGO_SETTINGS_MODULE=init_backend.settings
PYTHONUNBUFFERED=1
DJANGO_DEBUG=False
DATABASE_URL=postgres://user:pass@host:port/db
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=your-domain.com
```

### Frontend (.env)

```env
NODE_ENV=production
VITE_API_URL=https://your-api-domain.com
```

## 🎉 Success Indicators

- ✅ Apps deploy without memory errors
- ✅ Response times under 2 seconds
- ✅ Memory usage stays under 900MB total
- ✅ No OOM (Out of Memory) kills

## 📞 Support

If you encounter issues:

1. Check the logs: `dokku logs api` or `dokku logs web`
2. Monitor resources: `dokku resource:report`
3. Restart services if needed: `dokku ps:restart api`

---

**Note**: These optimizations are specifically designed for 1GB RAM servers. For production with higher traffic, consider upgrading to 2GB+ RAM.
