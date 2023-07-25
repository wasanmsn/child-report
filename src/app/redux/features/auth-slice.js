import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'


import login from '@/app/api/login';
import logout from '@/app/api/logout';
import register from '@/app/api/register';

const initialState = {
    value: {
        isAuth: false,
        email: '',
        childId: ''
    },
    error:{
        message:'',
        isError:false
    }
}

export const callLogins = createAsyncThunk("callLogins", async (logins) => {
    try {
        const res = await login(logins)
        return res
    } catch (error) {
        console.log(error)
        throw error
    }

})

export const callLoggouts = createAsyncThunk("callLoggouts", async () => {
    try {
        return await logout()

    } catch (error) {
        throw error
    }
})
export const callRegister = createAsyncThunk('callRegister',async (user) => {
    try {
        return await register(user)
    } catch (error) {
        throw error
    }
})
export const auth = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(callLogins.fulfilled, (state, action) => {
            console.log("Logged in")
            return {
                value: {
                    isAuth: true,
                    email: action.payload.email,
                    childId: action.payload.childId
                },
                error:{
                    message:'',
                    isError:false
                }
            }
        }),
            builder.addCase(callLogins.rejected, (state, action) => {
                return {...initialState,
                    error:{
                        message:"Invalid login",
                        isError:true
                    }}
            }),
            builder.addCase(callLoggouts.fulfilled, (state, action) => {
                return initialState
            }),
            builder.addCase(callLoggouts.rejected, (state, action) => {
                return initialState
            }),
            builder.addCase(callRegister.fulfilled,(state,action) => {
                console.log(action.payload)
                return {
                    value: {
                        isAuth: true,
                        email: action.payload.email,
                        childId: action.payload.childId
                    },
                    error:{
                        message:'',
                        isError:false
                    }
                }
            })
    }
})

export default auth.reducer;