# Heroku Deployment Guide

This guide shows how to deploy the BibleApp to Heroku.

## Prerequisites

1. Heroku account
2. Heroku CLI installed
3. Git repository

## Quick Deploy

[![Deploy to Heroku](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Manual Deployment Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd bible-app
   ```

2. **Create a new Heroku app**
   ```bash
   heroku create your-bible-app-name
   ```

3. **Add PostgreSQL addon**
   ```bash
   heroku addons:create heroku-postgresql:mini
   ```

4. **Set environment variables**
   ```bash
   heroku config:set NODE_ENV=production
   heroku config:set SESSION_SECRET=$(openssl rand -base64 32)
   heroku config:set ISSUER_URL=https://replit.com/oidc
   heroku config:set REPL_ID=your-repl-id
   heroku config:set REPLIT_DOMAINS=your-app-name.herokuapp.com
   ```

5. **Deploy the application**
   ```bash
   git add .
   git commit -m "Prepare for Heroku deployment"
   git push heroku main
   ```

6. **Open the application**
   ```bash
   heroku open
   ```

## Environment Variables

The application requires the following environment variables:

- `DATABASE_URL`: PostgreSQL connection string (automatically set by Heroku PostgreSQL addon)
- `SESSION_SECRET`: Secret key for session management
- `NODE_ENV`: Should be set to "production"
- `ISSUER_URL`: OIDC issuer URL (https://replit.com/oidc)
- `REPL_ID`: Your Replit application ID
- `REPLIT_DOMAINS`: Your Heroku app domain (e.g., your-app.herokuapp.com)

## Build Process

The app uses the following build process:

1. `npm install` - Install dependencies
2. `vite build` - Build the frontend
3. `esbuild server/index.ts` - Bundle the backend
4. Database seeding runs automatically on startup

## Features

- Progressive Web App (PWA) capabilities
- Offline support with service worker
- Responsive design for mobile and desktop
- User authentication with Replit Auth
- Bible reading with bookmarks and highlights
- Search functionality
- Daily verses
- Prayer request system
- Multilingual support (English/Tagalog)

## Troubleshooting

1. **Build failures**: Check that all dependencies are in the main `dependencies` section
2. **Database issues**: Ensure PostgreSQL addon is added and DATABASE_URL is available
3. **Authentication issues**: Verify REPL_ID and REPLIT_DOMAINS are correctly set
4. **Port issues**: The app automatically uses the PORT environment variable provided by Heroku

## Production Considerations

- The app seeds the database automatically on startup
- Static files are served efficiently in production mode
- Environment variables are handled securely
- Database connections use connection pooling

For more information, check the application logs:
```bash
heroku logs --tail
```