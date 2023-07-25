// store.js
import { configureStore } from '@reduxjs/toolkit'
import authSlice from './features/auth-slice';
import userSlice from './features/user-slice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    authSlice: authSlice,
    userSlice: userSlice
});
const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authSlice', 'userSlice']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
});

export const persistor = persistStore(store)