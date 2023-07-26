import axios from 'axios';

export default async (req) => {
    const { childId, ...updatedFields } = req;
    try {
      const response = await axios.put(process.env.NEXT_PUBLIC_SERVER_URL+`/update/${childId}`, updatedFields, {withCredentials:true});
      return(response.data);
    } catch (err) {
        throw err
    }
};