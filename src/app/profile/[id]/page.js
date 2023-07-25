"use client"
import react, { useState, useEffect, useReducer } from "react";
import { useRouter } from 'next/navigation';
import ImageComponent from "@/components/ImageComponent";
import { AiOutlinePhone } from "react-icons/ai";
import childDetail from "@/app/api/childDetail";
import { useDispatch, useSelector } from "react-redux";
import { action } from '@/app/redux/features/user-slice'
import update from "@/app/api/update";
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
    const user = useSelector(state => state.userSlice)
    const auth = useSelector(state => state.authSlice)
    const [isOwner, setIsOwner] = useState(false)
    const [state, dispatch] = useReducer(reducer, user);
    const [isEdit, setEdit] = useState(false)
    const { id } = params
    const router = useRouter();
    const reduxDispatch = useDispatch()
    useEffect(() => {
        childDetail(id).then(res => {
            const picture = res.picture
            console.log(picture)
            const base64 = new Buffer.from(picture.data).toString('base64')
            const pictureSrc = `data:${picture.contentType};base64,${base64}`
            res = { ...res, picture: pictureSrc }
            dispatch({ type: 'FETCH_SUCCESS', payload: res })
            reduxDispatch(action({ type: 'FETCH_SUCCESS', payload: res }))
            if (auth.value.childId === res.childId) setIsOwner(true)
        }).catch(err => {
            dispatch({ type: 'FETCH_ERROR' })
        })
    }, [])

    const handleCancel = () => {
        dispatch({ type: 'RESET', payload: user.user });
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
        update({ ...user.user, ...state.user }).then(res => {
            const picture = res.picture
            const base64 = new Buffer.from(picture.data).toString('base64')
            const pictureSrc = `data:${picture.contentType};base64,${base64}`
            res = { ...res, picture: pictureSrc }
            reduxDispatch(action({ type: 'UPDATE', payload: res }))
            setEdit(!isEdit)
            console.log("Update complete")


        }).catch(err => console.log(err))
    }
    return (
        <div className="weak-green-background">
            <form className="card">
                <div className="flex gap-2">
                    <ImageComponent key={state.user.picture} src={state.user.picture} />
                    <div className="child-detail">
                        <label className="input-label">
                            <span className="span-child-detail">ชื่อ</span>
                            <input type="text" name="name" onChange={handleChange} placeholder="ชื่อ" value={state.user.name} disabled={!isEdit} required />
                        </label>
                        <label className="input-label">
                            <span className="span-child-detail">ชื่อเล่น</span>

                            <input type="text" name="nickName" onChange={handleChange} placeholder="ชื่อเล่น" value={state.user.nickName} disabled={!isEdit} required />
                        </label>
                        <label className="input-label">
                            <span className="span-child-detail">อายุ</span>
                            <input type="text" name="age" onChange={handleChange} placeholder="อายุ" value={state.user.age} disabled={!isEdit} required />
                        </label>
                    </div>

                </div>


                <label className="input-label">
                    <span className="span-parent-detail">ชื่อบิดา</span>
                    <input type="text" name="father" onChange={handleChange} placeholder="ชื่อบิดา" value={state.user.father} disabled={!isEdit} required />
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >เบอร์โทรบิดา <AiOutlinePhone className="hover:cursor-pointer" href={`tel:${state.user.fatherPhone}`} size={20} /></span>
                    <input type="text" name="fatherPhone" onChange={handleChange} placeholder="เบอร์โทรบิดา" value={state.user.fatherPhone} disabled={!isEdit} required />

                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >ชื่อมารดา</span>
                    <input type="text" name="mother" onChange={handleChange} placeholder="ชื่อมารดา" value={state.user.mother} disabled={!isEdit} required />
                </label>
                <label className="input-label">
                    <span className="span-parent-detail" >เบอร์โทรมารดา <AiOutlinePhone className="hover:cursor-pointer" href={`tel:${state.user.motherPhone}`} size={20} /></span>
                    <input type="text" name="motherPhone" onChange={handleChange} placeholder="เบอร์โทรมารดา" value={state.user.motherPhone} disabled={!isEdit} required />
                </label>
                {
                    isEdit ? (<label className="upload font-bold">
                        รูปภาพ
                        <input type="file" name="picture" accept="image/*" onChange={handleChangePicture} />
                    </label>) : null
                }
                {isOwner ? <div>
                    {isEdit ? <button className="primary-button" type="button" onClick={handleSubmit}  >บันทึก</button> : null}
                    {isEdit ? <button className="danger-button" type="button" onClick={editToggle}  >ยกเลิก</button> : <button className="primary-button" type="button" onClick={editToggle}  >แก้ไข</button>}

                </div> : null}

            </form>
        </div>
    )
}
