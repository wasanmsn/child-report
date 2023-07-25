export const navLinks = [
    {
        name:"เข้าสู่ระบบ",
        path:"/login",
        pathRegex:/\/login/g,
    },
    {
        name:"ระบบตามหา",
        path:"/",
        pathRegex:/\/$/g,
        component: (<div>
        </div>)
    },
    {
        name:"ระบบตามหาผู้ปกครองของน้อง",
        path:"/profile",
        pathRegex:/\/profile/g,
    },
    {
        name:"ลงทะเบียน",
        path:"/register",
        pathRegex:/\/register/g,
    }
]