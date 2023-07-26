
import axios from 'axios';

export default async (req) => {
    try {
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/child/'+req);
        if(response.status === 404) throw new Error("User not found")
        return response.data
    } catch (err) {
        throw err
    }
};
