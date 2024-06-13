import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Calendar } from "@/components/ui/calendar"
import { CalendarDays, Clock } from 'lucide-react'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import GlobalApi from '@/app/_utils/GlobalApi'
import { toast } from 'sonner'
import { InlineWidget } from "react-calendly";

  

function BookAppointment({doctor}:any) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const [timeSlot, setTimeSlot]=useState<{ time: string; }[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot]=useState();
    const {user}=useKindeBrowserClient();

    useEffect(()=>{
        getTime();

    },[])

    const getTime=()=>{
        const timeList = [];
        for(let i=9;i<=12;i++){
            timeList.push({
                time:i+':00 AM'
            })
            timeList.push({
                time: i + ':30 AM'
            })
        }
        for(let i=1;i<=6;i++){
            timeList.push({
                time: i + ':00 PM'
            })
            timeList.push({
                time: i + ':30 PM'
            })
        }
        setTimeSlot(timeList);
    }

    const saveBooking=()=>{
        const data={
            data:{
                UserName:user?.given_name+" "+user?.family_name,
                Email:user?.email,
                Time:selectedTimeSlot,
                Date:date,
                doctor:doctor.id
            }
        }
        // console.log(data);
        GlobalApi.bookAppointment(data).then((resp: any)=>{
            console.log(resp);
            if(resp){
                GlobalApi.sendEmail(data).then((resp:any)=>{
                    console.log(resp);
                })
                toast("Booking Confirmation sent on Email")
            }
        })
    }

    const isPastDay=(day:any)=>{
        return day<=new Date();
    }

  return (
    <Dialog>
  <DialogTrigger>
    <Button className='mt-3 rounded-full'>Book Appointment</Button>
    </DialogTrigger>
  <DialogContent>
    <div className="App">
      <InlineWidget url="https://calendly.com/naidupavanteja" />
    </div>
    <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <div>
            <Button type="button" 
            className='text-red-500 border-red-500' variant="outline">
              Close
            </Button>

            <Button type="button" 
            onClick={()=>saveBooking()}
            >
              Submit
            </Button>
            </div>
          </DialogClose>
        </DialogFooter> 
  </DialogContent>
</Dialog>

  )
}

export default BookAppointment