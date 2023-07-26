
import axios from 'axios';

export default async (req) => {
    try {
        console.log(req)
        const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/check-email/'+req);
        if(response.status !== 200) throw new Error(response.message)
        return response.data
    } catch (err) {
        throw err
    }
};
