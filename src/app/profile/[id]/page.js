"use client"
import react, { useState, useEffect, useReducer } from "react";
import { useRouter } from 'next/navigation';
import ImageComponent from "@/components/ImageComponent";
import { AiOutlinePhone } from "react-icons/ai";
import childDetail from "@/app/api/childDetail";
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
export default function page({ params }) {
    const [state, dispatch] = useReducer(reducer, initialState);
    const [isEdit, setEdit] = useState(false)
    const { id } = params
    const router = useRouter();
    useEffect(()=>{
        childDetail(id).then(res => {
            dispatch({type:'FETCH_SUCCESS',payload:res})
        }).catch(err => {
            dispatch({type:'FETCH_ERROR'})
        })
    },[])

    const handleCancel = () => {
        dispatch({ type: 'RESET', payload: initialState.user });
    };

    const handleChange = (e) => {
        dispatch({ type: 'UPDATE_FIELD', field: e.target.name, payload: e.target.value });
    };

    const handleChangePicture = (e) => {
        console.log(e.target.files);

        const file = e.target.files[0];
        if (file && file.type.substr(0, 5) === 'image') {
            const reader = new FileReader();
            reader.onloadend = () => {
                console.log(reader.result);
                dispatch({ type: 'UPDATE_FIELD', field: "picture", payload: reader.result });
            };
            reader.readAsDataURL(file);
        } else {
            setPicture(null);
        }
    }
    const editToggle = () => {
        if (isEdit) {
            handleCancel()
        }
        setEdit(!isEdit);
    }


    const handleSubmit = (e) => {
        e.preventDefault();
        // Here, you'd typically send this data to your server or an auth API
        // console.log({ email, password });

        // You might want to move this line into a `.then()` block if you're calling an API.
        router.push('/register/success');
    }
    return (
        <div className="weak-green-background">

            <form onSubmit={handleSubmit} className="card">
                <div className="flex gap-2">
                    <ImageComponent key={state.user.picture} src={state.user.picture} />
                    <div className="child-detail">
                        <label className="input-label">
                            <span className="span-child-detail">ชื่อ</span>
                            <input type="text" name="name" onChange={handleChange} placeholder="ชื่อ" value={state.user.name} disabled={!isEdit} />
                        </label>
                        <label className="input-label">
                            <span className="span-child-detail">ชื่อเล่น</span>

                            <input type="text" name="nickName" onChange={handleChange} placeholder="ชื่อเล่น" value={state.user.nickName} disabled={!isEdit} />
                        </label>
                        <label className="input-label">
                            <span className="span-child-detail">อายุ</span>
                            <input type="text" name="age" onChange={handleChange} placeholder="อายุ" value={state.user.age} disabled={!isEdit} />
                        </label>
                    </div>

                </div>


                <label className="input-label">
                    <span className="span-parent-detail">ชื่อบิดา</span>
                    <input type="text" name="father" onChange={handleChange} placeholder="ชื่อบิดา" value={state.user.father} disabled={!isEdit} />
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >เบอร์โทรบิดา <AiOutlinePhone className="hover:cursor-pointer" href={`tel:${state.user.fatherPhone}`} size={20} /></span>
                    <input type="text" name="fatherPhone" onChange={handleChange} placeholder="เบอร์โทรบิดา" value={state.user.fatherPhone} disabled={!isEdit} />

                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >ชื่อมารดา</span>
                    <input type="text" name="mother" onChange={handleChange} placeholder="ชื่อมารดา" value={state.user.mother} disabled={!isEdit} />
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >เบอร์โทรมารดา <AiOutlinePhone className="hover:cursor-pointer" href={`tel:${state.user.motherPhone}`} size={20} /></span>
                    <input type="text" name="motherPhone" onChange={handleChange} placeholder="เบอร์โทรมารดา" value={state.user.motherPhone} disabled={!isEdit} />
                </label>
                {
                    isEdit ? (<label className="upload font-bold">
                        รูปภาพ
                        <input type="file" name="picture" accept="image/*" onChange={handleChangePicture} />
                    </label>) : null
                }
                {isEdit ? <button className="danger-button" type="button" onClick={editToggle}  >ยกเลิก</button> : <button className="primary-button" type="button" onClick={editToggle}  >แก้ไข</button>}
                {isEdit ? <button className="primary-button" type="submit"  >บันทึก</button> : null}
            </form>
        </div>
    )
}
