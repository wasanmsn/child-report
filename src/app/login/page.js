"use client"
import react, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { callLogins } from "@/app/redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Toast } from '@/components/Toast'

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.authSlice)
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState([]);
  const dispatch = useDispatch()
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

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      // Show login fail toast and return early
      setErrorMessages([{ isError: true, message: 'Please fill in all fields.' }]);
      return;
    }
    // Here, you'd typically send this data to your server or an auth API
    try {
      dispatch(callLogins({ email: email, password: password })).then(unwrapResult).then(obj => {
        console.log(obj)
        setErrorMessages([{ isError: false, message: 'Login successful.' }]); // Show a success message
        const timer = setTimeout(() => { // Set a timer to redirect after the message has shown
          router.push('/profile/' + obj.childId);
        }, 3000); // Wait 3 seconds before redirecting
      }).catch(err => {
        console.log("Invalid login")
        setErrorMessages([{ isError: true, message: 'Invalid login.' }]);
      })



      // router.push('/user');

    } catch (error) {
      console.log("Err" + error.toString())
      setErrorMessages([{ isError: true, message: error.toString() }]);
    }

    // You might want to move this line into a `.then()` block if you're calling an API.
  }

  return (
    <div className="weak-green-background">
      <Toast messages={errorMessages} onClose={(index) => {
        setErrorMessages(errorMessages.filter((_, i) => i !== index));
      }} />

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
