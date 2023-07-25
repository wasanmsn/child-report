"use client"
import react, { useState } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useDispatch,useSelector } from "react-redux";
import { callLogins } from "@/app/redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.authSlice)
  const router = useRouter();

  const dispatch = useDispatch()


  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    // Here, you'd typically send this data to your server or an auth API
    try {
      dispatch(callLogins({ email: email, password: password })).then(unwrapResult).then(obj => {
        console.log(obj)
        router.push('/profile/'+obj.childId)
      }).catch(err => {
        console.log("Invalid login")
      })
      
      // router.push('/user');

    } catch (error) {
      console.log("Err" + error.toString())
    }

    // You might want to move this line into a `.then()` block if you're calling an API.
  }

  return (
    <div className="weak-green-background">
      <form className="card">
        <label className="input-label">
          <input type="text" name="email" onChange={handleChangeEmail} placeholder="Email" />
        </label>
        <label className="input-label">
          <input type="password" name="password" onChange={handleChangePassword} placeholder="Password" />
        </label>
        <button className="primary-button" type="button" onClick={handleSubmit}  >เข้าสู่ระบบ</button>
        <Link className=" underline  underline-offset-1 " href={"/register"}  >สมัครสมาชิก</Link>
        {auth.error.message}


      </form>
    </div>
  );
}
