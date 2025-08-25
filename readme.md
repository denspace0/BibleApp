# BibleApp - Digital Bible Companion

## Overview

BibleApp is a comprehensive Progressive Web App (PWA) designed as a digital Bible companion for reading, studying, and spiritual growth. The application provides access to multiple Bible translations, daily verses, prayer tools, study resources, and social sharing features. Built with a modern tech stack, it supports both English and Tagalog languages and can be installed directly from the web without requiring app store distribution.

The platform emphasizes user engagement through features like verse highlighting, bookmarking, reading progress tracking, prayer requests, and daily devotionals. It's designed to work seamlessly across desktop and mobile devices with offline support capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **State Management**: TanStack Query (React Query) for server state management with optimistic updates and caching
- **Routing**: Wouter for lightweight client-side routing
- **PWA Features**: Service worker for offline caching, web app manifest for installability
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript with ES modules for modern JavaScript features
- **Database ORM**: Drizzle ORM with PostgreSQL for type-safe database operations
- **Authentication**: Replit Auth with OpenID Connect for secure user management
- **Session Management**: Express sessions with PostgreSQL store for persistence

### Database Design
- **Primary Database**: PostgreSQL with Neon serverless hosting
- **Schema**: Normalized relational design with tables for:
  - Users with preferences (language, theme, font size)
  - Bible books and verses with multilingual support
  - User-generated content (bookmarks, highlights, reading progress)
  - Daily verses and prayer requests
  - Session storage for authentication

### Authentication System
- **Provider**: Replit Auth with OpenID Connect protocol
- **Session Management**: Secure HTTP-only cookies with PostgreSQL session store
- **User Model**: Supports profile information, preferences, and user-generated content linking

### API Architecture
- **Style**: RESTful API design with consistent endpoint patterns
- **Data Validation**: Zod schemas for request/response validation
- **Error Handling**: Centralized error handling with appropriate HTTP status codes
- **Middleware**: Authentication middleware for protected routes

### Progressive Web App Features
- **Offline Support**: Service worker caches essential resources and Bible content
- **Installability**: Web app manifest enables installation on mobile devices and desktops
- **Push Notifications**: Ready for daily verse and prayer reminder notifications
- **Responsive Design**: Mobile-first approach with seamless desktop experience

## External Dependencies

### Database & Hosting
- **Neon Database**: Serverless PostgreSQL hosting for scalable data storage
- **Replit Hosting**: Development and deployment platform with integrated authentication

### Authentication & Security
- **Replit Auth**: OpenID Connect authentication provider
- **Express Session**: Session management with secure cookie handling

### Frontend Libraries
- **Radix UI**: Accessible, unstyled UI primitives for complex components
- **Lucide React**: Icon library for consistent iconography
- **React Hook Form**: Form validation and management
- **Date-fns**: Date manipulation and formatting utilities

### Development Tools
- **TypeScript**: Static type checking across frontend and backend
- **ESBuild**: Fast JavaScript bundling for production builds
- **PostCSS**: CSS processing with Tailwind CSS integration

### Font & Icon Resources
- **Google Fonts**: Inter font family for typography
- **Font Awesome**: Icon library for UI elements and navigation

### Third-party Services Ready for Integration
- **Social Media APIs**: Facebook, Twitter, WhatsApp, Instagram for verse sharing
- **Push Notification Services**: Web Push API for daily verses and reminders
- **Bible API Services**: External Bible translation APIs for expanded content