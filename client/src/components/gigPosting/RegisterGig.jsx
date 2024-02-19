import React, { useEffect, useState } from 'react';
import {
     Box,
     FormControl,
     Text,
     FormLabel,
     Input,
     Textarea,
     Button,
     VStack,
     Center,
} from '@chakra-ui/react';
import api from '../../api/axios';

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const RegisterGig = () => {
     const [data, setData] = useState({
          title: '',
          tier1Price: '',
          tier1Services: '',
          tier2Price: '',
          tier2Services: '',
          tier3Price: '',
          tier3Services: ''
     });
     const [gigImage, setGigImage] = useState(null);
     const { currentUser } = useSelector(state => state.user);
     const nav = useNavigate();
     const [errors, setErrors] = useState({});

     const handleFile = async(e) => {
          setGigImage(e.target.files[0]);
     }

     const handleChange = (e) => {
          setData({
               ...data,
               [e.target.name]: e.target.value,
          });
     };

     useEffect(() => {
          if (currentUser && currentUser.user_type != "seller") {
               toast.warning('You are not a seller and cannot create gigs')
               nav('/');
          }
     })

     const handleSubmit = async (e) => {
          e.preventDefault();
          const newErrors = {};
          for (const key in data) {
               if (key.includes('Price') && isNaN(Number(data[key]))) {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be a number`;
               } else if (data[key].trim() === '') {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`;
               }
          }

          if (Object.keys(newErrors).length === 0) {
               console.log('Form is valid:', data);
               setErrors({})
               
               console.log(gigImage);
               const formData = new FormData();
               formData.append('image', gigImage);
               formData.append('data', JSON.stringify(data));
               console.log(formData);

               try {
                    const res = await api.post('/postGig', formData, { headers: {'Content-Type': 'multipart/form-data'}});
                    console.log(res.data);
               } catch (err) {
                    console.log(err.message);
               }
          
          } else {
               setErrors(newErrors);
          }
     };

     return (
          <Center>
               <VStack
                    spacing={2}
                    align="start"
                    w="40%"
                    p={8}
                    m="3"
                    boxShadow="lg"
                    borderRadius="md"
                    bg="white"
               >
                    <Box justifyContent={'center'} w={'100%'}>
                         <Text fontSize={'2xl'} textAlign={'center'}> Create Gig</Text>
                    </Box>

                    {/* add important fields like delivery time in hours, sub category of service that hes offering, etc from the old create Gig form prsent in the views>pages>createGig.ejs from the ejs files ----- this is reqd as we already have code for creategig in the backend.... */}

                    <form onSubmit={handleSubmit}>
                         <FormControl id="title" isRequired>
                              <FormLabel fontSize={'sm'}>Title</FormLabel>
                              <Input
                                   type="text"
                                   name="title"
                                   value={data.title}
                                   onChange={handleChange}
                              />
                              {errors.title && <Box color="red">{errors.title}</Box>}
                         </FormControl>

                         <FormControl id="image" isRequired>
                              <FormLabel fontSize={'sm'}>Gig Image</FormLabel>
                              <Input
                                   type="file"
                                   name="image"
                                   onChange={handleFile}
                              />
                              {errors.gigImage && <Box color="red">{errors.gigImage}</Box>}
                         </FormControl>

                         <FormControl id="tier1Price" isRequired>
                              <FormLabel fontSize='sm'>Tier 1 Price</FormLabel>
                              <Input
                                   type="text"
                                   name="tier1Price"
                                   value={data.tier1Price}
                                   onChange={handleChange}
                              />
                              {errors.tier1Price && <Box color="red">{errors.tier1Price}</Box>}
                         </FormControl>

                         <FormControl id="tier1Services" isRequired>
                              <FormLabel fontSize='sm'>Tier 1 Services - comma separated</FormLabel>
                              <Textarea
                                   type="text"
                                   name="tier1Services"
                                   value={data.tier1Services}
                                   onChange={handleChange}
                              />
                              {errors.tier1Services && (
                                   <Box color="red">{errors.tier1Services}</Box>
                              )}
                         </FormControl>

                         <FormControl id="tier2Price" isRequired>
                              <FormLabel fontSize='sm'>Tier 2 Price</FormLabel>
                              <Input
                                   type="text"
                                   name="tier2Price"
                                   value={data.tier2Price}
                                   onChange={handleChange}
                              />
                              {errors.tier2Price && <Box color="red">{errors.tier2Price}</Box>}
                         </FormControl>

                         <FormControl id="tier2Services" isRequired>
                              <FormLabel fontSize='sm'>Tier 2 Services - comma separated</FormLabel>
                              <Textarea
                                   type="text"
                                   name="tier2Services"
                                   value={data.tier2Services}
                                   onChange={handleChange}
                              />
                              {errors.tier2Services && (
                                   <Box color="red">{errors.tier2Services}</Box>
                              )}
                         </FormControl>

                         <FormControl id="tier3Price" isRequired>
                              <FormLabel fontSize='sm'>Tier 3 Price</FormLabel>
                              <Input
                                   type="text"
                                   name="tier3Price"
                                   value={data.tier3Price}
                                   onChange={handleChange}
                              />
                              {errors.tier3Price && <Box color="red">{errors.tier3Price}</Box>}
                         </FormControl>

                         <FormControl id="tier3Services" isRequired>
                              <FormLabel fontSize='sm'>Tier 3 Services - comma separated</FormLabel>
                              <Textarea
                                   type="text"
                                   name="tier3Services"
                                   value={data.tier3Services}
                                   onChange={handleChange}
                              />
                              {errors.tier3Services && (
                                   <Box color="red">{errors.tier3Services}</Box>
                              )}
                         </FormControl>

                         <Button colorScheme="blue" type='submit' w={'100%'}>
                              Submit
                         </Button>
                    </form>
               </VStack>
          </Center>
     );
};

export default RegisterGig;
