"use client";
import react, { useEffect, useState } from "react";
import { useRouter, usePathname,useSearchParams  } from "next/navigation";
import { navLinks } from "./nav-links";
import {
  AiOutlineLogin,
  AiOutlineLeftCircle,
  AiOutlineLogout,
  AiOutlineHome,
} from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { callLoggouts } from "./redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";
import {action} from '@/app/redux/features/user-slice'

export default function navBar() {
  const router = useRouter();
  const pathName = usePathname();
  const query = useSearchParams();
  const user = useSelector((state) => state.authSlice.value);
  const auth = useSelector((state) => state.authSlice);
  const page = navLinks.find((links) => pathName.match(links.pathRegex));
  const title = (
<div className="flex items-center justify-center">
  <p className="text-sm text-center">
    {page.name} {page.detail ? query.get(page.detail) : ""}
  </p>
</div>

  );

  const dispatch = useDispatch();
  useEffect(() =>{
    if(page.name !== 'ลงทะเบียน'){
      dispatch(action({type:'RESET'}))
    }
  },[page])

  const back = () => {
    if (page.backUrl === "back") return router.back();
    return router.push(page.backUrl);
  };
  const logOut = () => {
    dispatch(callLoggouts())
      .then(unwrapResult)
      .then((obj) => {
        console.log(obj);
        router.push("/login");
      })
      .catch((err) => {
        console.log("Invalid login");
      });
  };

  return (
    <div className="login-title">
      {page.backUrl ? (
        <div className="px-8 flex gap-1">
          <a
            className="flex w-min hover:cursor-pointer hover:text-blue-500"
            onClick={back}
          >
            <AiOutlineLeftCircle className="nav-icon" size={30} />
            <span>กลับ</span>
          </a>
          <Link
            className="flex hover:cursor-pointer w-min hover:text-blue-500"
            href={"/"}
          >
            <AiOutlineHome className="nav-icon" size={30} />
            <span>Home</span>
          </Link>
        </div>
      ) : (
        <div>
          <Link
            className="flex hover:cursor-pointer w-min hover:text-blue-500"
            href={"/"}
          >
            <AiOutlineHome className="nav-icon" size={30} />
            <span>Home</span>
          </Link>
        </div>
      )}
      {page.component ? page.component : title}
      {!auth.value.isAuth ? (
        <div className="flex flex-row-reverse">
          <Link
            className="flex hover:cursor-pointer hover:text-blue-500"
            href={"/login"}
          >
            <span>เข้าสู่ระบบ</span>
            <AiOutlineLogin className="nav-icon" size={30} />
          </Link>
        </div>
      ) : (
        <div className="flex flex-row-reverse">
          <a
            className="flex hover:cursor-pointer hover:text-blue-500"
            onClick={logOut}
          >
            <span>ออกจากระบบ</span>
            <AiOutlineLogout className="nav-icon" size={30} />
          </a>
        </div>
      )}
    </div>
  );
}
