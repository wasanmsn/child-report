"use client"
import react, { useState,useEffect } from "react";
import { useRouter } from 'next/navigation';
import { Toast } from "@/components/Toast";
import childDetail from "./api/childDetail";
import LoadingModal from '@/components/Loading';
import { useSelector } from "react-redux";

export default function Home() {
  const [childId, setChildId] = useState('');
  const [validation,setValidation] = useState({valid:true});
  const router = useRouter();
  const auth = useSelector(state => state.authSlice.value)
  const [errorMessages, setErrorMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (errorMessages.length > 0) {
      const timer = setTimeout(() => {
        setErrorMessages([]); // Clear all error messages
      }, 5000); // hide the toast after 5 seconds

      return () => {
        clearTimeout(timer); // this will clear the timeout if the component is unmounted before the time is up
      }
    }
  }, [errorMessages]);

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
    if(!childId){
      setErrorMessages([{ isError: true, message: 'โปรดใส่เลขประจำตัวเด็ก' }]);
      return;
    }
    if(!validating()) return;
    setLoading(true); // start loading before async call
    childDetail(childId)
      .then(res => {
        setLoading(false); // stop loading after async call
        router.push('/profile/'+childId+"?nickName="+res.nickName);
      })
      .catch(err => {
        setLoading(false); // stop loading if there was an error
      });
  }

  return (
    <div className="weak-green-background">
      <Toast messages={errorMessages} onClose={(index) => {
        setErrorMessages(errorMessages.filter((_, i) => i !== index));
      }} />
      {loading && <LoadingModal />}
      <div className="text-center title">
        <h1>"ระบบตามหา"</h1>
        <h1>ผู้ปกครอง</h1>
      </div>
      <form className="card">
        <label className="font-bold child-title">
          Children ID
        </label>
        <label className="input-label">
          <input autoFocus type="text" name="childId" onChange={handleChangeChildId} placeholder="กรุณากรอกเลขประจำตัว" />
        </label>
        <button className="primary-button" type="button" onClick={handleSubmit}  >ตรวจสอบ</button>
        <button className="primary-button" type="button" onClick={() => {
          router.push(!auth.isAuth ? '/register' : '/profile/'+auth.childId)
        }}  >{!auth.isAuth ? "สมัครสมาชิก":"โปรไฟล์"}</button>
        <a className="primary-button text-center" href="https://line.me/R/ti/p/"   >ติดต่อสอบถาม</a>


      </form>
    </div>
  );
}
