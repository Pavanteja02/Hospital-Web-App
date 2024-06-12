

import { default as axios } from "axios";

const API_KEY=process.env.NEXT_PUBLIC_STRAPI_API_KEY;

const axiosClient=axios.create({
    baseURL:'https://doctor-appointment-admin-q59f.onrender.com/api',
    headers:{
        'Authorization':`Bearer ${API_KEY}`
    }
})

const getCategory=()=>axiosClient.get('/categories?populate=*');
const getDoctorList=()=>axiosClient.get('/doctors?populate=*');
const getDoctorByCategory=(category:any)=>axiosClient.get('/doctors?filters[categories][Name][$in]='+category+"&populate=*");
const getDoctorById=(id:any)=>axiosClient.get('/doctors/'+id+"?populate=*");
const bookAppointment=(data:any)=>axiosClient.post('/appointments',data);
const sendEmail=(data:any)=>axios.post('/api/sendEmail',data)

export default{
    getCategory,
    getDoctorList,
    getDoctorByCategory,
    getDoctorById,
    bookAppointment,
    sendEmail
}