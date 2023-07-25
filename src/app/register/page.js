"use client"
import react, { useState, useReducer } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useRouter } from 'next/navigation';
import Validator from "@/components/validator";
import { action } from '@/app/redux/features/user-slice'
import isEmailValid from "../api/isEmailValid";
const reducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE_FIELD':
            return { ...state, user: { ...state.user, [action.field]: action.payload } };
        case 'INVALID':
            return { ...state, valid: { ...state.valid, [action.field]: action.payload } };
        default:
            return state;
    }
};
export default function page() {
    const router = useRouter();
    const user = useSelector(state => state.userSlice)
    const [state, dispatch] = useReducer(reducer, user);
    const reduxDispatch = useDispatch()
    const handleChangeConfirmPassword = (e) => {
        const password = e.target.value
        dispatch({ type: 'UPDATE_FIELD', field: e.target.name, payload: password });
        //TODO check password here
        if (password === state.user.password) {
            dispatch({ type: 'INVALID', field: 'password', payload: 'Password does match.' })
        } else {
            dispatch({ type: 'INVALID', field: 'password', payload: 'Password does not match.' })
        }
    }
    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_FIELD', field: e.target.name, payload: e.target.value });
    };

    const handleSubmit = (e) => {
        if (state.valid.password === 'Password does match.') {
            isEmailValid(state.user.email).then(res => {
                if(res){
                    reduxDispatch(action({ type: 'COMPLETE', payload: true , field:'page1'}))
                    reduxDispatch(action({ type: 'UPDATE', payload: state.user }))
                    return router.push('/register/detail')
                }
                //display error message here "This email is already used"
                console.log("Email already used")
            })
        };
    }
    return (
        <div className="weak-green-background">
            <form  className="card">
                <label className="input-label">
                    <span className="span-child-detail">ชื่อ</span>
                    <input type="text" name="name" onChange={handleChange} placeholder="ชื่อ" required />
                </label>
                <label className="input-label">
                    <span className="span-child-detail">Email</span>

                    <input type="text" name="email" onChange={handleChange} placeholder="Email" required />
                </label>
                <label className="input-label">
                    <span className="span-child-detail">Password</span>

                    <input type="password" name="password" onChange={handleChangeConfirmPassword} placeholder="Password" required />
                </label>
                <label className="input-label">
                    <span className="span-child-detail">ConfirmPassword</span>

                    <input type="password" name="password2" onChange={handleChangeConfirmPassword} placeholder="Confirm Password" required />
                    <Validator validation={{ valid: state.valid.password === 'Password does match.', message: state.valid.password }} />
                </label>

                <button className="primary-button" onClick={handleSubmit} type="button" >ถัดไป</button>
            </form>
        </div>
    )
}
