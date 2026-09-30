import axios from 'axios';
export const getMealPlanByMonth = async (year, month) =>{
    const res = await axios.get(`https://mealplannerserverside.onrender.com/api/v1/selectedmeals/${year}/${month}`, { withCredentials: true });
    return res.data;
};
export const getBalance = async () =>{
    const res = await axios.get(`https://mealplannerserverside.onrender.com/api/v1/getbalance`,{withCredentials:true});
    return res.data;
}

// export const addBalance = async() =>{
//     const res = await axios.put(``)
// }