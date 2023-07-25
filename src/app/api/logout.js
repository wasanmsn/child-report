
import axios from 'axios';

export default async (req, res) => {
  if (req.method === 'POST') {
    try {
      const response = await axios.get('http://localhost:8080/logout');
      return response.data
    } catch (err) {
      throw err
    }
  } else {
    throw new Error('Method not allowed')
  }
};
