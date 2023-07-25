"use client"
import react, { useState } from "react";
import { useRouter, usePathname } from 'next/navigation';
import { navLinks } from "./nav-links";
import { AiOutlineLogin, AiOutlineLeftCircle, AiOutlineLogout } from "react-icons/ai";
import Link from "next/link";

export default function navBar() {
    const router = useRouter();
    console.log(navLinks)
    const pathName = usePathname();
    console.log(pathName)
    const id = router.query?.id;

    // Get the last part of the path (e.g., "/profile" becomes "Profile").
    const page = navLinks.find(links => pathName.match(links.pathRegex));
    const title = (<p>{page.name}</p>);

    const back = () => {
        router.back()
    }
    const logOut = () => {
        router.push("/login")
    }


    return (
        <div className="login-title">
            {pathName !== "/" ? <div className="px-8"><a className="flex w-min hover:cursor-pointer hover:text-blue-500" onClick={back} ><AiOutlineLeftCircle className="nav-icon" size={30} /><span>กลับ</span></a></div> : <div></div>}
            {page.component? page.component : title}
            {pathName === "/" || pathName === "/login" ? <div className="flex flex-row-reverse"><Link className="flex hover:cursor-pointer hover:text-blue-500" href={"/login"}>
                <span>เข้าสู่ระบบ</span><AiOutlineLogin className="nav-icon" size={30} /></Link></div> :
                <div className="flex flex-row-reverse"><a className="flex hover:cursor-pointer hover:text-blue-500" onClick={logOut}>
                    <span>ออกจากระบบ</span><AiOutlineLogout className="nav-icon" size={30} /></a></div>}

        </div>
    );
}
