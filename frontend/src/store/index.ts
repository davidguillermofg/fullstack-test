import { configureStore } from '@reduxjs/toolkit';
import appInfoReducer from './slices/appInfoSlice';
import suppliersReducer from './slices/suppliersSlice';

export const store = configureStore({
  reducer: {
    appInfo: appInfoReducer,
    suppliers: suppliersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
