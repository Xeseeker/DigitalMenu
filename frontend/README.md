# Digital Menu Frontend

A modern, fully responsive restaurant menu application built with React Router, Vite, and styled with custom CSS. Designed to work seamlessly after QR code scanning.

## Features

✨ **Hero Section**

- Auto-scrolling image carousel (4-second intervals)
- Manual navigation with prev/next buttons
- Dot indicators for slide navigation
- Responsive design with fallback gradients

🏠 **Home Page**

- Sticky navigation bar
- Hero carousel section
- About restaurant section
- Call-to-action buttons

🍽️ **Menu Page**

- Real-time search by item name/description
- Advanced filtering by:
  - Category (multi-select checkboxes)
  - Price range (dual-handle slider)
- Dual layout mode:
  - **Grid Layout**: 3 columns (desktop), 2 columns (tablet), 1 column (mobile)
  - **List Layout**: Thumbnail + details in row format
- Layout toggle persisted in Context
- No results messaging

📋 **Menu Items**

- High-quality item images (or emoji placeholders)
- Item name, description, and price
- Category badges
- Star ratings (4.5/5 average)
- Hover effects and smooth animations
- Clickable cards for item details

📖 **Item Details Page**

- Large item image with fallback
- Full description and availability status
- Category badge
- Star rating with review count
- Interactive rating component (user can rate)
- Add to Order & Share buttons
- Back button to menu

## Responsive Design

**Breakpoints**

- Mobile: 320px - 767px
- Tablet: 768px - 1023px
- Desktop: 1024px+

**Mobile-First Approach**

- Touch-friendly buttons (48px minimum)
- Stacked layouts on mobile
- Collapsible filter sidebar (mobile)
- Adaptive font sizes and spacing

## Architecture

```
src/
├── components/
│   ├── Navbar.jsx              # Sticky header with mobile toggle
│   ├── Hero.jsx                # Auto-carousel section
│   ├── About.jsx               # Restaurant info
│   ├── MenuCard.jsx            # Individual menu item card
│   ├── MenuGrid.jsx            # Grid layout container
│   ├── MenuList.jsx            # List layout container
│   ├── SearchBar.jsx           # Search input with icon
│   ├── FilterSidebar.jsx       # Category & price filters
│   ├── ItemDetail.jsx          # Item details page
│   └── StarRating.jsx          # Reusable star rating component
├── pages/
│   ├── Home.jsx                # Home page (Hero + About)
│   ├── Menu.jsx                # Menu page (Search + Filters + Items)
│   └── ItemDetailsPage.jsx     # Item detail page
├── hooks/
│   └── useApi.js               # Custom hook for API calls
├── context/
│   └── MenuContext.jsx         # Global state management
├── styles/
│   ├── global.css              # Global styles & variables
│   ├── responsive.css          # Media queries & utilities
│   └── components.css          # Component-specific styles
└── App.jsx                     # Main app with routing
```

## State Management

**MenuContext provides:**

- `categories`: List of all categories
- `allItems`: All menu items from API
- `filteredItems`: Filtered results (search + category + price)
- `filters`: Current filter state { categories, priceRange, searchTerm }
- `layoutMode`: Current layout 'grid' or 'list'
- `updateFilters()`: Update any filter
- `applyFilters()`: Combine all filters

**Filtering Logic**

- Real-time filtering whenever filters change
- Search term matches name OR description
- Category filter supports multi-select
- Price ranges are inclusive (min ≤ price ≤ max)

## Routing

| Route           | Component       | Purpose                          |
| --------------- | --------------- | -------------------------------- |
| `/`             | Home            | Landing page with hero and about |
| `/menu`         | Menu            | Browse all items with filters    |
| `/menu/:itemId` | ItemDetailsPage | View full item details           |

## API Integration

**Backend Endpoints** (via `useApi` hook)

```javascript
// Fetch all categories
GET /customer/categories

// Fetch all menu items (with category join)
GET /customer/items

// Fetch items by category
GET /customer/categories/:categoryId/items

// Fetch single item details
GET /customer/items/:itemId

// Get item ratings
GET /customer/items/:itemId/ratings

// Add rating to item
POST /customer/items/:itemId/rating
```

**Environment**

- `.env.local`: Contains `VITE_API_BASE_URL`
- Default: `http://localhost:5000/api`

## Styling

**CSS Variables** (in `global.css`)

- Colors: primary, secondary, accent, light, dark, gray
- Shadows: sm, md, lg
- Spacing: xs to 2xl
- Typography: Poppins (body), Playfair Display (headings)

**Utilities**

- Grid layouts (grid-1, grid-2, grid-3, grid-4)
- Flexbox helpers (flex-center, flex-between, flex-col)
- Text utilities (text-center, line-clamp-2, no-wrap)
- Responsive classes (grid-col-mobile, etc.)

## Getting Started

### Installation

```bash
cd frontend
npm install
```

### Development

```bash
npm run dev
```

Opens `http://localhost:5173` automatically

### Production Build

```bash
npm run build
npm run preview
```

## Asset Placement

**Hero Images**

- Place in: `/public/assets/hero/`
- Referenced: `slide-1.jpg`, `slide-2.jpg`, `slide-3.jpg`
- Fallback: SVG placeholders + gradient overlays

**Menu Item Images**

- Fetched from backend API
- Fallback: Emoji emoji (🍽️)

## Performance

- Lazy image loading ready
- CSS animations are GPU-accelerated
- Minimal dependencies (React, React Router, Axios, Lucide React)
- Gzipped bundle size: ~76KB

## Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast compliance
- Touch targets 48px minimum (mobile)
- Reduced motion preferences respected

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design: 320px and up

## Future Enhancements

1. **Image Optimization**
   - Responsive images with srcset
   - WebP format support
   - Lazy loading implementation

2. **Caching**
   - localStorage for categories/items
   - Session state persistence

3. **Rating System**
   - Implement backend rating endpoints
   - User authentication for ratings
   - Review comments display

4. **Cart & Ordering**
   - Shopping cart functionality
   - Order placement flow
   - Payment integration

5. **Analytics**
   - Pagination for large datasets
   - Sorting options (popularity, price, rating)
   - Advanced filters (allergens, dietary restrictions)

## Notes

- All data is fetched from the backend API
- Layout mode preference is persisted in Context during the session
- Price filter automatically adjusts based on available items
- Search is case-insensitive and matches partial text
- Images missing from API gracefully show emoji placeholders

## Technologies

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Build Tool**: Vite
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Styling**: Custom CSS with CSS Variables
- **Package Manager**: npm

---

**Built with ❤️ for amazing dining experiences**
