
import axios from 'axios';

export default async (req, res) => {
    try {
        console.log(req)
        const response = await axios.get('http://localhost:8080/check-email/'+req);
        if(response.status !== 200) throw new Error(res.message)
        return response.data
    } catch (err) {
        throw err
    }
};
