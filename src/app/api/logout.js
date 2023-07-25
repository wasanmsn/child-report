
import axios from 'axios';

export default async () => {
    try {
      const response = await axios.get('http://localhost:8080/logout');
      return response.data
    } catch (err) {
      throw err
    }
};
