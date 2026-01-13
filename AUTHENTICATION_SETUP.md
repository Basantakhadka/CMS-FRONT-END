# Authentication & Responsive Layout Setup

## Features Implemented

✅ **Login Page** - Fully responsive login page with form validation
✅ **Protected Routes** - Dashboard and all pages are now protected
✅ **Authentication Context** - Global auth state management
✅ **Responsive Sidebar** - Collapsible sidebar with mobile overlay
✅ **User Menu** - Dropdown with profile and logout options
✅ **Mobile-Friendly** - All pages optimized for mobile, tablet, and desktop

## Login Credentials

For testing, use these demo credentials:
- **Username:** `admin`
- **Password:** `admin123`

## How It Works

### 1. Authentication Flow
- User visits the app → redirected to `/login` if not authenticated
- After successful login → redirected to `/dashboard`
- User data is stored in `localStorage` for persistence
- Logout clears the session and redirects to login

### 2. Protected Routes
All dashboard routes (`/dashboard`, `/users`, `/settings`) are wrapped with `ProtectedRoute` component that checks authentication status.

### 3. Responsive Design
- **Desktop (> 1024px)**: Full sidebar with labels
- **Tablet (768px - 1024px)**: Collapsible sidebar
- **Mobile (< 768px)**: Hidden sidebar with overlay menu, responsive tables

## Project Structure

```
src/
├── context/
│   └── AuthContext.tsx          # Authentication context & hooks
├── components/
│   ├── ProtectedRoute.tsx       # Route protection wrapper
│   └── Layout/
│       ├── MainLayout.tsx       # Main layout with sidebar
│       └── MainLayout.css       # Responsive styles
├── pages/
│   ├── Login.tsx               # Login page
│   ├── Login.css               # Login styles
│   ├── Dashboard.tsx           # Dashboard (protected)
│   ├── Users.tsx               # Users management (protected)
│   └── Settings.tsx            # Settings (protected)
└── App.tsx                     # Main app with routing
```

## Usage

### Using Authentication in Components

```tsx
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, logout, isAuthenticated } = useAuth();
  
  return (
    <div>
      <p>Welcome, {user?.username}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Adding New Protected Routes

```tsx
// In App.tsx
<Route
  path="/new-route"
  element={
    <ProtectedRoute>
      <NewPage />
    </ProtectedRoute>
  }
/>
```

## Customization

### Change Login Credentials
Edit the validation logic in [src/pages/Login.tsx](src/pages/Login.tsx#L23-L29):

```tsx
if (values.username === 'your-username' && values.password === 'your-password') {
  // Login logic
}
```

### Integrate with Real API
Replace the mock authentication in `Login.tsx` with your API call:

```tsx
const response = await axios.post('/api/auth/login', values);
login(response.data);
```

### Modify Theme Colors
Update theme in [src/App.tsx](src/App.tsx#L13-L15):

```tsx
theme={{
  token: {
    colorPrimary: '#your-color',
    borderRadius: 8,
  },
}}
```

## Responsive Breakpoints

- **xs**: < 576px (Mobile)
- **sm**: 576px - 768px (Large mobile)
- **md**: 768px - 992px (Tablet)
- **lg**: 992px - 1200px (Small desktop)
- **xl**: > 1200px (Large desktop)

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

Visit `http://localhost:5173` and login with the demo credentials.
