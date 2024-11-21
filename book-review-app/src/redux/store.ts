import { configureStore } from '@reduxjs/toolkit';
import authApi from './features/auth/authApi';
import authReducer from './features/auth/authSlice';
import booksApi from './features/book/booksApi';
import reviewApi from './features/review/reviewsApi';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer, 
    auth: authReducer,
    [booksApi.reducerPath]: booksApi.reducer,
    [reviewApi.reducerPath]:reviewApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, booksApi.middleware, reviewApi.middleware), 
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {authApi: AuthApiState} (adjust based on your actual API slice structure)
export type AppDispatch = typeof store.dispatch;
