import {configureStore} from '@reduxjs/toolkit';
import appSlice, {fireStoreApi} from './features/todos/todosSlice';
import {setupListeners} from '@reduxjs/toolkit/query/react';

export const store = configureStore({
  reducer: {
    app: appSlice,
    [fireStoreApi.reducerPath]: fireStoreApi.reducer,
  },
  middleware: getDefaultMiddlware =>
    getDefaultMiddlware().concat(fireStoreApi.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
