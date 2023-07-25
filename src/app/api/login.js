
import axios from 'axios';

export default async (req, res) => {
    try {
        const response = await axios.post('http://localhost:8080/login', req);
        if(response.status !== 200) throw new Error("Invalid login")
        return response.data
    } catch (err) {
        throw err
    }
};
