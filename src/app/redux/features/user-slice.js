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
            password2:'',
            email:''
        },
        valid: {
            password: '',
        },
        progress:{
            page1:false,
            page2:false
        }
}


const reducer =  (state, action) => {
    switch (action.payload.type) {
        case 'FETCH_SUCCESS':
            console.log(action.payload)
            return { ...state,isLoading: false, user: action.payload.payload };
        case 'FETCH_ERROR':
            return { ...state, isLoading: false };
        case 'UPDATE':
            return {...state,user:{...state.user,...action.payload.payload}}
        case 'RESET':
            return { ...state, user: action.payload.payload };
        case 'COMPLETE':
            return {...state,progress:{...state.progress,[action.payload.field]:action.payload.payload}}
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