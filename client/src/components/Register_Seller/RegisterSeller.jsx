import {
  Progress,
  Box,
} from "@chakra-ui/react";

import Form1 from "./Form1";
import Form2 from "./Form2";
import Form3 from "./Form3";
import { useState, useEffect } from "react";
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function RegisterSeller() {
  const nav = useNavigate();

  const [step, setStep] = useState(1);
  const [progress, setProgress] = useState(33.33);
  const {currentUser} = useSelector(state=>state.user);
  const [data, setData] = useState({fname: '', lname: '', desc: '', profile: null, languages: [], occupation: '', country: '', inst_name: '', title: '', major: '', year: '', certs: null, portfolio: '', github: '', twitter: '', linkedin: '' })


  useEffect(()=>{
    if(currentUser.user_type=='seller') {
      nav('/app/dashboard')
      toast.warning('Already logged in!');
    }
  },[])

  return (
    <>
      <Box
        borderWidth="1px"
        rounded="lg"
        shadow="1px 1px 3px rgba(0,0.2,0.3,0.4)"
        maxWidth={800}
        p={6}
        m="10px auto" 
        as="form"
      >
        <Progress
          colorScheme="blue"
          variant="outline"
          size="sm"
          value={progress}
          mb="5%"
          mx="5%"
          isAnimated
        ></Progress>
        {step === 1 ? <Form1 step={step} setStep={setStep} progress={progress} setProgress={setProgress} data={data} setData={setData} /> : step === 2 ? <Form2 step={step} setStep={setStep} progress={progress} setProgress={setProgress} data={data} setData={setData} /> : <Form3 step={step} setStep={setStep} progress={progress} setProgress={setProgress} data={data} setData={setData} />}
      </Box>
    </>
  );
}
