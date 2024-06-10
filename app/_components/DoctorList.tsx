import Image from 'next/image'
import React from 'react'

function DoctorList({doctorList}:any) {
  return (
    <div className='mb-10 px-8'>
        <h2 className='font-bold text-xl'>Popular Doctors</h2>
        <div className='grid grid-cols-2 md:grid-cols-2
                gap-7 mt-4
                lg:grid-cols-4'>
            {doctorList && doctorList.map((doctor:any,index:any)=>(
                <div className='border-[1px] rounded-lg p-3
                cursor-pointer hover:border-primary hover:shadow-lg
                transition-all ease-in-out'
                key={index}>
                    <Image src={doctor.attributes?.Image?.data?.attributes?.url}
                    alt='doctor'
                    width={500}
                    height={200}
                    className='h-[200px] w-full object-cover rounded-lg'/>
                    <div className='mt-3 items-baseline flex flex-col gap-1'>
                        <h2 className='text-[10px] bg-blue-100 p-1 rounded-full
                        px-2 text-primary'>{doctor.attributes?.categories.data[0].attributes?.Name}</h2>
                        <h2 className='font-bold'>{doctor.attributes.Name}</h2>
                        <h2 className='text-primary text-sm'>{doctor.attributes?.Years_of_Experience} years</h2>
                        <h2 className='text-gray-500 text-sm'>{doctor.attributes?.Address}</h2>

                        <h2 className='p-2 px-3 border-[1px] border-primary
                        text-primary rounded-full w-full text-center
                        text-[11px] mt-2 cursor-pointer hover:bg-primary
                        hover:text-white'>Book Now</h2>
                    </div>
                </div>

            ))}
        </div>
    </div>
  )
}

export default DoctorList