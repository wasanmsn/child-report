"use client"
import react, { useState,useReducer, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { AiOutlinePhone } from "react-icons/ai";
import ImageComponent from "@/components/ImageComponent";
import { useDispatch, useSelector } from "react-redux";
import {action} from '@/app/redux/features/user-slice'
import { callRegister } from "@/app/redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";
const initialState = {
    isLoading: true,
    user: {
        nickName: '',
        age: '',
        picture: '/User-avatar.svg.png',
        father: '',
        fatherPhone: '',
        mother: '',
        motherPhone: '',
    }
};
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_SUCCESS':
            return { isLoading: false, user: action.payload };
        case 'FETCH_ERROR':
            return { ...state, isLoading: false };
        case 'UPDATE_FIELD':
            return { ...state, user: { ...state.user, [action.field]: action.payload } };
        case 'RESET':
            return { ...state, user: action.payload };
        default:
            return state;
    }
};
export default function page() {
    const user = useSelector(state => state.userSlice.user)
    const [state, dispatch] = useReducer(reducer, initialState);

    const regisProgress = useSelector(state => state.userSlice.progress)
    const reduxDispatch = useDispatch()
    const router = useRouter();

    const handleChangePicture = (e) => {
        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                dispatch({ type: 'UPDATE_FIELD', field: 'picture', payload: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            dispatch({ type: 'UPDATE_FIELD', field: 'picture', payload: null });
        }
    }
    
    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_FIELD', field: e.target.name, payload: e.target.value });
    };

    const handleSubmit = (e) => {
        reduxDispatch(action({ type: 'UPDATE', payload: state.user }))
        reduxDispatch(callRegister({...user,...state.user})).then(unwrapResult).then(obj => {
            reduxDispatch(action({ type: 'COMPLETE', payload: true , field:'page2'}))
            router.push('/register/success');
        }).catch(err => {
            console.log(err.toString())
        })
        
    }
    useEffect(() => {
        if(!regisProgress.page1) router.push('/register')
    },[])
    return (
        <div className="weak-green-background">
            <form  className="card">
            <div className="flex gap-2">
                    <ImageComponent key={state.user.picture} src={state.user.picture} />
                    <div className="child-detail">
                        <label className="input-label">
                            <span className="span-child-detail">ชื่อเล่น</span>

                           <input type="text" name="nickName" onChange={handleChange} placeholder="ชื่อเล่น" required />
                        </label>
                        <label className="input-label">
                            <span className="span-child-detail">อายุ</span>
                            <input type="text" name="age" onChange={handleChange} placeholder="อายุ" required/>
                        </label>
                    </div>
                </div>
                <label className="input-label">
                    <span className="span-parent-detail">ชื่อบิดา</span>
                    <input type="text" name="father" onChange={handleChange} placeholder="ชื่อบิดา" required/>
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >เบอร์โทรบิดา <AiOutlinePhone size={20} /></span>
                    <input type="text" name="fatherPhone" onChange={handleChange} placeholder="เบอร์โทรบิดา" required/>
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >ชื่อมารดา</span>
                    <input type="text" name="mother" onChange={handleChange} placeholder="ชื่อมารดา" required/>
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >เบอร์โทรมารดา <AiOutlinePhone size={20} /></span>
                    <input type="text" name="motherPhone" onChange={handleChange} placeholder="เบอร์โทรมารดา" required/>
                </label>
                <label className="upload font-bold">
                    รูปภาพ
                    <input type="file" accept="image/*" onChange={handleChangePicture} required/>
                </label>

                <button className="primary-button" type="button" onClick={handleSubmit}  >ถัดไป</button>
            </form>
        </div>
    )
}
