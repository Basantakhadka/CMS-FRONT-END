# CMS Frontend

A modern Content Management System frontend built with React 18, TypeScript, Ant Design, and Vite.

## Features

- ⚡️ **React 18** - Latest React version with concurrent features
- 🎨 **Ant Design** - Enterprise-class UI design system
- 📝 **TypeScript** - Type safety and better developer experience
- 🎭 **Poppins Font** - Modern, clean typography
- 🔄 **Axios** - Promise-based HTTP client for API calls
- 🛣️ **React Router** - Client-side routing
- ⚡️ **Vite** - Fast build tool and dev server

## Tech Stack

- **React**: 18.2.0
- **TypeScript**: 5.9.3
- **Ant Design**: 6.1.4
- **Axios**: 1.13.2
- **React Router DOM**: 7.12.0
- **Vite**: 7.2.5


## Getting Started

### Prerequisites

- Node.js (version 18+)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Copy the environment file:

```bash
cp .env.example .env
```

4. Update the `.env` file with your API configuration:

```env
VITE_API_BASE_URL=http://localhost:3000/api
VITE_ENV=development
```

### Development

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Build

Build for production:

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/        # Reusable components
│   └── Layout/       # Layout components
├── pages/            # Page components
│   ├── Dashboard.tsx
│   ├── Users.tsx
│   └── Settings.tsx
├── services/         # API service layer
│   └── api.ts
├── utils/            # Utility functions
│   └── apiClient.ts  # Axios instance with interceptors
├── App.tsx           # Main App component
├── main.tsx          # Application entry point
└── index.css         # Global styles
```

## Features Implemented

### 1. Layout
- Responsive sidebar navigation
- Collapsible menu
- Header with toggle button

### 2. Pages
- **Dashboard**: Statistics overview with cards
- **Users**: User management with table, search, and filters
- **Settings**: Application and account settings

### 3. API Integration
- Configured axios client with interceptors
- Request/Response interceptors for auth
- Error handling
- API service layer with TypeScript types

### 4. Styling
- Ant Design theme configuration
- Poppins font integration
- Custom color scheme
- Responsive design

## API Client

The project includes a pre-configured API client with:

- Automatic token injection
- Request/Response interceptors
- Error handling
- TypeScript support

Example usage:

```typescript
import { userApi } from './services/api';

// Get all users
const users = await userApi.getAllUsers();

// Create user
const newUser = await userApi.createUser({
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user',
  status: 'active'
});
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| VITE_API_BASE_URL | Backend API base URL | http://localhost:3000/api |
| VITE_ENV | Environment | development |

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.



## node version required
 version:  > 20
