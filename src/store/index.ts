import { configureStore } from '@reduxjs/toolkit';
import generalReducer from './slices/generalSlice';
import usersReducer from './slices/usersSlice';
import rolesReducer from './slices/rolesSlice';
import contractReducer from './slices/contractSlice';
import contractAlertReducer from './slices/contractAlertSlice';

export const store = configureStore({
    reducer: {
        general: generalReducer,
        users: usersReducer,
        roles: rolesReducer,
        contracts: contractReducer,
        alerts: contractAlertReducer,
        
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
