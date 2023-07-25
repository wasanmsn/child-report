"use client"
import react, { useState } from "react";
import { useRouter } from 'next/navigation';
import Validator from "@/components/validator";

export default function Home() {
  const [childId, setChildId] = useState('');
  const [validation,setValidation] = useState({valid:true});
  const router = useRouter();

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


  const handleSubmit = (e) => {
    e.preventDefault();
    if(!validating()) return

    // You might want to move this line into a `.then()` block if you're calling an API.
    router.push('/profile/'+childId);
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
          router.push('/register')
        }}  >สมัครสมาชิก</button>
        <button className="primary-button" type="button"  >ติดต่อสอบถาม</button>


      </form>
    </div>
  );
}
