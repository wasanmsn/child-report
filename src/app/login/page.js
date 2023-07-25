"use client"
import react, { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { callLogins } from "@/app/redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import { Toast } from '@/components/Toast'
import LoadingModal from '@/components/Loading';

export default function page() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const auth = useSelector((state) => state.authSlice)
  const router = useRouter();
  const [errorMessages, setErrorMessages] = useState([]);
  const dispatch = useDispatch()
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

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  }

  const handleChangePassword = (e) => {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMessages([{ isError: true, message: 'Please fill in all fields.' }]);
      return;
    }
    setLoading(true); // start loading before async call
    try {
      dispatch(callLogins({ email: email, password: password }))
        .then(unwrapResult)
        .then(obj => {
          console.log(obj)
          setLoading(false); // stop loading after async call
          setErrorMessages([{ isError: false, message: 'Login successful.' }]);
          const timer = setTimeout(() => {
            router.push('/profile/' + obj.childId);
          }, 3000);
        })
        .catch(err => {
          console.log("Invalid login")
          setLoading(false); // stop loading if there was an error
          setErrorMessages([{ isError: true, message: 'Invalid login.' }]);
        })
    } catch (error) {
      console.log("Err" + error.toString())
      setLoading(false); // stop loading if there was an error
      setErrorMessages([{ isError: true, message: error.toString() }]);
    }
  }
  

  return (
    <div className="weak-green-background">
      <Toast messages={errorMessages} onClose={(index) => {
        setErrorMessages(errorMessages.filter((_, i) => i !== index));
      }} />
      {loading && <LoadingModal />}

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
