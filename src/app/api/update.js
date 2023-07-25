import axios from 'axios';

export default async (req, res) => {
    const { childId, ...updatedFields } = req.body;
    try {
      const response = await axios.put(`http://localhost:8080/update/${childId}`, updatedFields);
      return(response.data);
    } catch (err) {
        throw err
    }
};