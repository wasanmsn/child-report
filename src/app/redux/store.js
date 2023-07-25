// store.js
import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth-slice';
import userSlice from './features/user-slice';


const store = configureStore({
    reducer:{
        authSlice,
        userSlice
    }
});

export default store;