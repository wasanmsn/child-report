"use client"
import react, { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { navLinks } from "./nav-links";
import { AiOutlineLogin, AiOutlineLeftCircle, AiOutlineLogout,AiOutlineHome } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { callLoggouts } from "./redux/features/auth-slice";
import { unwrapResult } from "@reduxjs/toolkit";
import Link from "next/link";

export default function navBar() {
    const router = useRouter();
    const pathName = usePathname();
    const id = router.query?.id;
    const user = useSelector(state => state.userSlice.user)
    const auth = useSelector(state => state.authSlice)
    const page = navLinks.find(links => pathName.match(links.pathRegex));
    const title = (<p>{page.name} {page.detail ? user[page.detail] : ''}</p>);
    const dispatch = useDispatch()

    const back = () => {
        if(page.backUrl === 'back') return router.back()
        return router.push(page.backUrl)
    }
    const logOut = () => {
        dispatch(callLoggouts()).then(unwrapResult).then(obj => {
            console.log(obj)
            router.push("/login")
        }).catch(err => {
            console.log("Invalid login")
        })

    }


    return (
        <div className="login-title">
            {page.backUrl ? <div className="px-8"><a className="flex w-min hover:cursor-pointer hover:text-blue-500" 
            onClick={back} ><AiOutlineLeftCircle className="nav-icon" size={30} />
            <span>กลับ</span></a></div> : 
            <div><Link className="flex hover:cursor-pointer hover:text-blue-500" href={"/"}>
                <AiOutlineHome className="nav-icon" size={30}/><span>Home</span></Link></div>}
            {page.component ? page.component : title}
            {!auth.value.isAuth ? 
            <div className="flex flex-row-reverse">
                <Link className="flex hover:cursor-pointer hover:text-blue-500" href={"/login"}>
                <span>เข้าสู่ระบบ</span><AiOutlineLogin className="nav-icon" size={30} />
                </Link>
                </div> 
                :
                <div className="flex flex-row-reverse">
                    <a className="flex hover:cursor-pointer hover:text-blue-500" onClick={logOut}>
                    <span>ออกจากระบบ</span><AiOutlineLogout className="nav-icon" size={30} />
                    </a>
                    </div>}

        </div>
    );
}
