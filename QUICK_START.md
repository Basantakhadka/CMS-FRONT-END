# Quick Start Guide - Identity and Access Module

## 🚀 Getting Started

### 1. Install Dependencies (Already Done)
```bash
npm install
```

The following packages have been installed:
- `@reduxjs/toolkit`
- `react-redux`

### 2. Start Development Server
```bash
npm run dev
```

### 3. Access the Application

1. **Login Page** (First Page)
   - URL: `http://localhost:5173/` or `http://localhost:5173/login`
   - The root path now redirects to login

2. **After Login** - Navigate to IAM Module:
   - General Settings: `http://localhost:5173/iam/general`
   - User Management: `http://localhost:5173/iam/users`
   - Role Management: `http://localhost:5173/iam/roles`

---

## 📋 Module Features Overview

### 🛡️ General Settings (`/iam/general`)

**Password Policy:**
- Configure minimum length, complexity requirements
- Set password expiry and reuse prevention

**MFA Settings:**
- Enable/disable multi-factor authentication
- Choose methods: SMS, Email, Authenticator App
- Set as mandatory for all users

**OTP Settings:**
- Configure OTP expiry and max attempts
- Enable SMS/Email/Merchant OTP

### 👥 User Management (`/iam/users`)

**Features:**
- ➕ Create new users
- ✏️ Edit user details
- 🗑️ Delete users
- 🔍 Search users
- 📄 Pagination
- 🏷️ Assign roles
- 📊 View user status

**Available Actions:**
1. Click "Add User" to create new user
2. Click edit icon to modify user
3. Click delete icon to remove user
4. Use search bar to filter users

### 🔐 Role Management (`/iam/roles`)

**Features:**
- ➕ Create roles with permissions
- ✏️ Edit role details
- 🗑️ Delete custom roles
- 👥 Assign users to roles
- 🔍 Search roles
- 📄 Pagination

**Available Actions:**
1. Click "Add Role" to create new role
2. Select permissions from available list
3. Click user icon to assign users to role
4. Edit or delete custom roles

---

## 🎨 Menu Navigation

Access IAM features from the sidebar:

```
📊 Dashboard
└── Main dashboard

🔒 Identity & Access
├── 🛡️ General       → Security settings
├── 👤 Users         → User management
└── 👥 Roles         → Role management

👤 Users              → Legacy users page
⚙️ Settings           → Application settings
```

---

## 🔧 Development Tips

### Redux DevTools
Install Redux DevTools browser extension to inspect state:
- View all actions
- Time-travel debugging
- State inspection

### Checking State
```typescript
// In any component
import { useAppSelector } from '@/store/hooks';

const { users } = useAppSelector(state => state.users);
const { roles } = useAppSelector(state => state.roles);
const { passwordPolicy } = useAppSelector(state => state.general);
```

### Dispatching Actions
```typescript
import { useAppDispatch } from '@/store/hooks';
import { fetchUsers } from '@/store/slices/usersSlice';

const dispatch = useAppDispatch();

// Fetch users
dispatch(fetchUsers({ page: 1, pageSize: 10 }));
```

---

## 🐛 Troubleshooting

### Issue: Can't see IAM menu items
**Solution:** Make sure you're logged in and on a protected route

### Issue: API errors (404, 500)
**Solution:** Backend APIs need to be implemented. Currently using mock endpoints.

### Issue: Redux state not updating
**Solution:** Check Redux DevTools, ensure actions are dispatched

### Issue: TypeScript errors
**Solution:** All TypeScript errors have been resolved. Run `npm run build` to verify

---

## 📝 Mock Data for Testing

Until backend is ready, you can add mock data in the service files:

```typescript
// Example: src/modules/IdentityAccess/Users/services/usersService.ts
export const usersService = {
  getUsers: async (params) => {
    // Return mock data for testing
    return {
      data: [
        {
          id: '1',
          username: 'admin',
          email: 'admin@example.com',
          firstName: 'Admin',
          lastName: 'User',
          status: 'active',
          roles: ['Admin'],
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        }
      ],
      total: 1,
      page: 1,
      pageSize: 10
    };
  },
  // ... other methods
};
```

---

## 🔄 Workflow Examples

### Creating a New User
1. Navigate to `/iam/users`
2. Click "Add User" button
3. Fill in the form:
   - Username
   - Email
   - First Name
   - Last Name
   - Phone (optional)
   - Password
   - Select Roles
4. Click "OK" to save

### Assigning Roles to User
1. Go to `/iam/users`
2. Click edit icon on user row
3. Select roles from dropdown
4. Click "OK"

### Creating a Role
1. Navigate to `/iam/roles`
2. Click "Add Role" button
3. Enter role name and description
4. Select permissions
5. Click "OK" to save

### Assigning Users to Role
1. Go to `/iam/roles`
2. Click user icon on role row
3. Transfer users from left to right
4. Click "OK"

---

## 📚 File Structure Reference

```
Key Files You'll Work With:

Services (API calls):
- src/modules/IdentityAccess/General/services/generalService.ts
- src/modules/IdentityAccess/Users/services/usersService.ts
- src/modules/IdentityAccess/Roles/services/rolesService.ts

Redux Slices (State):
- src/store/slices/generalSlice.ts
- src/store/slices/usersSlice.ts
- src/store/slices/rolesSlice.ts

Containers (Business Logic):
- src/modules/IdentityAccess/General/containers/GeneralContainer.tsx
- src/modules/IdentityAccess/Users/containers/UsersContainer.tsx
- src/modules/IdentityAccess/Roles/containers/RolesContainer.tsx

Components (UI):
- src/modules/IdentityAccess/*/components/*.tsx
```

---

## 🎯 Next Steps

### Immediate
1. ✅ Run the development server
2. ✅ Test login functionality
3. ✅ Navigate through IAM menus
4. ✅ Test UI components

### Backend Integration
1. Implement REST API endpoints (see IAM_MODULE_SUMMARY.md)
2. Update service files with real API calls
3. Add authentication tokens to requests
4. Handle API errors properly

### Production
1. Add unit tests for components
2. Add integration tests for Redux
3. Add E2E tests for workflows
4. Set up CI/CD pipeline
5. Configure environment variables

---

## 🆘 Support

For detailed information, refer to:
- [IAM_MODULE_SUMMARY.md](./IAM_MODULE_SUMMARY.md) - Complete implementation details
- [src/modules/IdentityAccess/README.md](./src/modules/IdentityAccess/README.md) - Module documentation

---

## ✨ Features Ready to Use

✅ Login page as entry point
✅ Protected routes
✅ Redux state management
✅ Three IAM sub-modules
✅ CRUD operations for users and roles
✅ Security settings management
✅ Search and pagination
✅ Form validation
✅ Error handling
✅ Loading states
✅ TypeScript support
✅ Responsive design

**Happy Coding! 🚀**
