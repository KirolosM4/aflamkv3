import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import {
    Card,
    Button,
    Typography,
    Spinner
} from "@material-tailwind/react";
import Swal from 'sweetalert2'

const ContactUs = () => {
    const form = useRef();
    const [loading,setLoading] = useState(false);
    const [emailType,setEmailType] = useState(false)
    const [subjectType,setSubjectType] = useState(false);
    const [messageType,setMessageType] = useState(false);
    let time;
    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(!loading);
        emailjs.sendForm(
            "service_llc1u9e",
            "template_1skow3q",
            e.target,
            "1a8xf7OAPJCoDXIPS"
        ).then(
            () => {
                setLoading(false);
                Swal.fire({
                    title: "success send message...thank you",
                    icon: "success",
                    draggable: true
                  });
            },
            () => {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Something went wrong!",
                  });
                  setLoading(false);
            }
        );
    };
    useEffect(()=>{
        clearTimeout(time);
        time = setTimeout(()=>{
            setEmailType(false);
        },2000)
    },[emailType])
    return(
        <div className="bg-[#1A1E21]">
            <div className="container mx-auto flex flex-col items-center h-screen">
                <p className="text-[#0d6efd] text-center text-2xl py-11 font-bold">Contact With The Website Developer!</p>
                <Card color="transparent" className="shadow-2xl shadow-black w-[70%] lg:w-[35%] px-5">
                        <form ref={form} onSubmit={(e)=>sendEmail(e)} className="mt-8 mb-2 w-full">
                        <div className="mb-1 flex flex-col gap-6">
                        <Typography variant="h6" color="white" className="-mb-3">
                            {emailType ? <p className='text-[#0d6efd]'>typing...</p> : "Email Address"}
                        </Typography>
                        <input type="text" name='email' className="p-2 rounded bg-[#1A1E21] border-2 border-[#0D6EFD] focus:outline-none focus:ring focus:ring-violet-300" onChange={()=>setEmailType(true)} on  />
                        
                        <Typography variant="h6" color="white" className="-mb-3">
                            Your Subject
                        </Typography>
                        <input type="text" name='subject' className="p-2 rounded bg-[#1A1E21] border-2 border-[#0D6EFD] focus:outline-none focus:ring focus:ring-violet-300"  />
                        <Typography variant="h6" color="white" className="-mb-3">
                            Your Message
                        </Typography>
                        <textarea name='message' rows={5} className="p-2 rounded bg-[#1A1E21] border-2 border-[#0D6EFD] focus:outline-none focus:ring focus:ring-violet-300"  ></textarea>
                        </div>
                        <div className="flex justify-center">
                            <Button type='submit' className="flex justify-center p-2 rounded bg-[#1A1E21] border-2 border-[#0D6EFD] focus:outline-none focus:ring focus:ring-violet-300 my-5 p-3 w-[50%]">
                                {loading ? <Spinner className='text-white'/> : "Submit"}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    )
}

export default ContactUs;