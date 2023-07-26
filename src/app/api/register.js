import axios from 'axios';

export default async (req) => {
    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_SERVER_URL+'/register', req);
      return response.data;
    } catch (err) {
        throw err
    }
};