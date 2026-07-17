# Digital Menu Admin Portal

A modern, corporate-styled admin interface for managing restaurant menus, built with React, Vite, and TailwindCSS.

## Features

- **Authentication**: Secure login with JWT token management
- **Dashboard**: Overview with statistics for menu items, categories, orders, and ratings
- **Menu Management**: Full CRUD operations for menu items with image upload
- **Category Management**: Organize menu items with categories and images
- **QR Code Generation**: Generate QR codes for restaurant menu landing pages
- **Comments & Ratings**: Placeholder pages ready for backend implementation
- **Protected Routing**: All admin pages are protected with authentication
- **Responsive Design**: Mobile-friendly with sidebar navigation
- **Corporate Styling**: Professional blue/gray color scheme with TailwindCSS

## Tech Stack

- React 18
- Vite
- React Router DOM
- Context API (for state management)
- Axios (for API calls)
- TailwindCSS
- React Icons

## Setup Instructions

1. **Install Dependencies**:
   ```bash
   cd admin
   npm install
   ```

2. **Environment Configuration**:
   The `.env` file is already configured with:
   ```
   VITE_API_BASE=http://localhost:5000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

4. **Build for Production**:
   ```bash
   npm run build
   ```

## Project Structure

```
admin/
├── src/
│   ├── context/          # Context providers (Auth, Notifications)
│   ├── components/       # Reusable components (Layout, Forms, etc.)
│   ├── pages/            # Page components (Dashboard, MenuItems, etc.)
│   ├── lib/              # Utilities and API configuration
│   ├── App.jsx           # Main app with routing
│   └── main.jsx          # Entry point
├── public/               # Static assets
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
├── tailwind.config.js    # TailwindCSS configuration
└── .env                  # Environment variables
```

## API Integration

The admin interface connects to the backend API at `/api`:

- **Authentication**: `/api/admin/login`
- **Categories**: `/api/admin/categories` (CRUD)
- **Menu Items**: `/api/admin/items` (CRUD)
- **Comments**: `/api/admin/comments` (placeholder)
- **Ratings**: `/api/admin/ratings` (placeholder)
- **QR Codes**: `/api/admin/qr/generate`, `/api/admin/qr/download`

## Authentication

The admin uses JWT token-based authentication:
- Tokens are stored in localStorage
- All API requests include the token in the Authorization header
- Protected routes automatically redirect to login if not authenticated
- Tokens are automatically cleared on logout

## Features Status

- ✅ Login/Authentication
- ✅ Dashboard with statistics
- ✅ Menu Items CRUD
- ✅ Categories CRUD
- ✅ QR Code Generation (UI ready, backend pending)
- ⏳ Comments Management (UI placeholder, backend pending)
- ⏳ Ratings Overview (UI placeholder, backend pending)

## Development Notes

- The backend API should be running on `http://localhost:5000`
- Image uploads use Cloudinary (configured in backend)
- All forms include validation and error handling
- Loading states are implemented for async operations
- Toast notifications provide user feedback

## Corporate Design System

The interface uses a professional color scheme:
- **Primary**: Blue tones (#3b82f6 to #1e3a8a)
- **Secondary**: Gray tones (#f8fafc to #0f172a)
- **Success**: Green
- **Warning**: Yellow
- **Error**: Red

All components follow consistent spacing, typography, and interaction patterns for a cohesive user experience.
