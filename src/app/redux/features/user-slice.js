import {createSlice} from '@reduxjs/toolkit'




const initialState = {
        isLoading: true,
        user: {
            name: '',
            nickName: '',
            age: '',
            picture: '/User-avatar.svg.png',
            father: '',
            fatherPhone: '',
            mother: '',
            motherPhone: '',
            childId:'',
            password:'',
            password2:''
        }
}


const reducer =  (state, action) => {
    switch (action.payload.type) {
        case 'FETCH_SUCCESS':
            return { isLoading: false, user: action.payload.payload };
        case 'FETCH_ERROR':
            return { ...state, isLoading: false };
        case 'UPDATE':
            console.log(action)
            return {...state,user:{...state.user,...action.payload.payload}}
        case 'RESET':
            return { ...state, user: action.payload.payload };
        default:
            return state;
    }
};
export const user = createSlice({
    name:'user',
    initialState,
    reducers:{
        action: reducer
    }

})

export const {action }  = user.actions;
export default user.reducer;