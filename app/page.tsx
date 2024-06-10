"use client"
import { useState, useEffect } from "react";
import CategorySearch from "./_components/CategorySearch";
import DoctorList from "./_components/DoctorList";
import Hero from "./_components/Hero";
import GlobalApi from "./_utils/GlobalApi";


export default function Home() {
  
  const [doctorList,setDoctorList]=useState([]);
  useEffect(()=>{
      getDoctorList()
  },[])

  const getDoctorList=()=>{
    GlobalApi.getDoctorList().then((resp: any)=>{
        console.log(resp.data.data);
        setDoctorList(resp.data.data);
    })
}
  return (
    <div>
      <Hero/>
      <CategorySearch/>
      <DoctorList doctorList={doctorList}/>
    </div>
  );
}
