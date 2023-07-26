
import axios from 'axios';

export default async (req) => {
    try {
        const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/login', req);
        if(response.status !== 200) throw new Error("Invalid login")
        return response.data
    } catch (err) {
        throw err
    }
};
