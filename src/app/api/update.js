import axios from 'axios';

export default async (req) => {
    const { childId, ...updatedFields } = req;
    try {
      const response = await axios.put(`http://localhost:8080/update/${childId}`, updatedFields, {withCredentials:true});
      return(response.data);
    } catch (err) {
        throw err
    }
};