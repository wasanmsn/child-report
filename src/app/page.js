"use client"
import react, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useDispatch,useSelector } from "react-redux";
import Validator from "@/components/validator";
import childDetail from "./api/childDetail";
import { action } from "./redux/features/user-slice";

export default function Home() {
  const [childId, setChildId] = useState('');
  const [validation,setValidation] = useState({valid:true});
  const router = useRouter();
  const user = useSelector(state => state.userSlice.user)
  const auth = useSelector(state => state.authSlice.value)
  const dispatch = useDispatch()
  const handleChangeChildId = (e) => {
    validating()
    setChildId(e.target.value);
  }
  const validating = () =>{
    if(!childId){
      setValidation({...validation,message:"โปรดใส่เลขประจำตัวเด็ก",valid:false})
      return false
    }
    setValidation({valid:true})
    return true
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validating()) return
    childDetail(childId).then(res => {
      dispatch(action({ type: 'FETCH_SUCCESS', payload: res }))
      router.push('/profile/'+childId);
    }).catch(err => {
      dispatch(action({type:'FETCH_ERROR'}))
  })

    // You might want to move this line into a `.then()` block if you're calling an API.
  }
  

  return (
    <div className="weak-green-background">
      <div className="text-center title">
        <h1>"ระบบตามหา"</h1>
        <h1>ผู้ปกครอง</h1>
      </div>
      <form onSubmit={handleSubmit} className="card">
        <label className="font-bold child-title">
          Children ID
        </label>
        <label className="input-label">
          <input autoFocus type="text" name="childId" onChange={handleChangeChildId} placeholder="กรุณากรอกเลขประจำตัว" />
          <Validator validation={validation} />
        </label>
        <button className="primary-button" type="submit"  >ตรวจสอบ</button>
        <button className="primary-button" type="button" onClick={() => {
          router.push(!auth.isAuth ? '/register' : '/profile/'+user.childId)
        }}  >{!auth.isAuth ? "สมัครสมาชิก":"โปรไฟล์"}</button>
        <a className="primary-button text-center" href="https://line.me/R/ti/p/"   >ติดต่อสอบถาม</a>


      </form>
    </div>
  );
}
