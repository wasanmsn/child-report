import axios from 'axios';

export default async (req, res) => {
    try {
      const response = await axios.post('http://localhost:8080/register', req);
      return response.data;
    } catch (err) {
        throw err
    }
};