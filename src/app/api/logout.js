
import axios from 'axios';

export default async () => {
    try {
      const response = await axios.get(process.env.NEXT_PUBLIC_SERVER_URL+'/logout');
      return response.data
    } catch (err) {
      throw err
    }
};
