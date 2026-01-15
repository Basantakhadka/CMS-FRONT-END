# Identity and Access Module

This module provides comprehensive Identity and Access Management (IAM) functionality with three sub-modules:

## Structure

```
IdentityAccess/
├── General/
│   ├── components/
│   │   ├── PasswordPolicyForm.tsx
│   │   ├── MFASettingsForm.tsx
│   │   └── OTPSettingsForm.tsx
│   ├── containers/
│   │   └── GeneralContainer.tsx
│   └── services/
│       └── generalService.ts
├── Users/
│   ├── components/
│   │   ├── UsersList.tsx
│   │   └── UserFormModal.tsx
│   ├── containers/
│   │   └── UsersContainer.tsx
│   └── services/
│       └── usersService.ts
├── Roles/
│   ├── components/
│   │   ├── RolesList.tsx
│   │   ├── RoleFormModal.tsx
│   │   └── AssignUsersModal.tsx
│   ├── containers/
│   │   └── RolesContainer.tsx
│   └── services/
│       └── rolesService.ts
└── index.ts
```

## Sub-Modules

### 1. General
Manages general security settings including:
- **Password Policy**: Configure password requirements (length, complexity, expiry, reuse prevention)
- **Multi-Factor Authentication (MFA)**: Enable/disable MFA, configure authentication methods (SMS, Email, Authenticator)
- **OTP Settings**: Configure OTP behavior for merchants and users (expiry time, max attempts, delivery methods)

**Routes**: `/iam/general`

### 2. Users
Complete user management functionality:
- **Create Users**: Add new users with username, email, name, phone, password, and role assignment
- **Edit Users**: Update user information and status (active, inactive, suspended)
- **Delete Users**: Remove users from the system
- **Assign Roles**: Assign multiple roles to users
- **View Users**: List all users with pagination, search, and filtering

**Routes**: `/iam/users`

### 3. Roles
Role and permission management:
- **Create Roles**: Define new roles with permissions
- **Edit Roles**: Modify role details and permissions
- **Delete Roles**: Remove custom roles (system roles cannot be deleted)
- **Assign Users**: Assign roles to multiple users
- **View Roles**: List all roles with permission counts and user counts

**Routes**: `/iam/roles`

## Redux Integration

Each sub-module has its own Redux slice for state management:

- **generalSlice**: Manages password policy, MFA settings, and OTP settings state
- **usersSlice**: Manages users list, pagination, and CRUD operations
- **rolesSlice**: Manages roles, permissions, and role assignments

### Usage

```typescript
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { fetchUsers, createUser } from '@/store/slices/usersSlice';

// In component
const dispatch = useAppDispatch();
const { users, loading } = useAppSelector(state => state.users);

// Fetch users
dispatch(fetchUsers({ page: 1, pageSize: 10 }));
```

## API Endpoints

### General
- `GET /api/iam/general/password-policy` - Get password policy
- `PUT /api/iam/general/password-policy` - Update password policy
- `GET /api/iam/general/mfa-settings` - Get MFA settings
- `PUT /api/iam/general/mfa-settings` - Update MFA settings
- `GET /api/iam/general/otp-settings` - Get OTP settings
- `PUT /api/iam/general/otp-settings` - Update OTP settings

### Users
- `GET /api/iam/users` - Get all users (with pagination)
- `GET /api/iam/users/:id` - Get user by ID
- `POST /api/iam/users` - Create new user
- `PUT /api/iam/users/:id` - Update user
- `DELETE /api/iam/users/:id` - Delete user
- `POST /api/iam/users/:id/roles` - Assign roles to user

### Roles
- `GET /api/iam/roles` - Get all roles (with pagination)
- `GET /api/iam/roles/:id` - Get role by ID
- `GET /api/iam/permissions` - Get all permissions
- `POST /api/iam/roles` - Create new role
- `PUT /api/iam/roles/:id` - Update role
- `DELETE /api/iam/roles/:id` - Delete role
- `POST /api/iam/roles/:id/users` - Assign role to users

## Features

- ✅ Redux Toolkit for state management
- ✅ TypeScript for type safety
- ✅ Ant Design components for UI
- ✅ Pagination and search functionality
- ✅ Form validation
- ✅ Error handling
- ✅ Loading states
- ✅ Modal dialogs for create/edit
- ✅ Responsive design
- ✅ Permission-based access control
