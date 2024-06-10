"use client"
import DoctorList from '@/app/_components/DoctorList';
import GlobalApi from '@/app/_utils/GlobalApi'
import React, { useEffect, useState } from 'react'

function Search({params}:any) {
  
  const [doctorList,setDoctorList]=useState([]);
  useEffect(()=>{
    console.log(params.cname);
    getDoctors();
  },[])

  const getDoctors=()=>{
    GlobalApi.getDoctorByCategory(params.cname).then((resp:any)=>{
      setDoctorList(resp.data.data);

    })
  }

  return (
    <div>
      <DoctorList doctorList={doctorList} heading={params.cname}
      />
    </div>
  )
}

export default Search