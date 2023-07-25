
import axios from 'axios';

export default async (req, res) => {
    try {
        console.log(req)
        const response = await axios.get('http://localhost:8080/child/'+req);
        if(response.status === 404) throw new Error("User not found")
        return response.data
    } catch (err) {
        throw err
    }
};
