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
     Flex,
} from '@chakra-ui/react';
import api from '../../api/axios';

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const RegisterGig = () => {
     const [data, setData] = useState({
          title: '',
          main_img: '',
          desc: '',
          tier1Price: '',
          tier1duration: '',
          tier1Services: '',
          tier2Price: '',
          tier2duration: '',
          tier2Services: '',
          tier3Price: '',
          tier3duration: '',
          tier3Services: ''
     });
     const [gigImage, setGigImage] = useState(null);
     const { currentUser } = useSelector(state => state.user);
     const nav = useNavigate();
     const [errors, setErrors] = useState({});

     const handleFile = async (e) => {
          setGigImage(e.target.files[0]);

          const main_img = await toBase64(e.target.files[0]);
          setData((prev) => {
               return { ...prev, ['main_img']: main_img }
          });
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

     const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
     });

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
               setErrors({})
               const formData = new FormData();
               formData.append('image', gigImage);
               formData.append('data', JSON.stringify(data));

               try {
                    const res = await api.post('/postGig', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
                    console.log(res.data);
                    toast.success('Register Gig Successfully! Please wait for Admin to Approve it!');
                    nav('/app/dashboard')
               } catch (err) {
                    console.log(err.message);
                    toast.success('Register Gig Unseccessful! Please try later!');
                    nav('/app/dashboard')
               }
          } else {
               setErrors(newErrors);
          }
     };

     return (
          <Center backgroundColor={'#DCDCDC'}>
               <VStack
                    spacing={2}
                    align="start"
                    width={{ base: "100%", lg: "50%" }}
                    p={8}
                    m="3"
                    boxShadow="lg"
                    borderRadius="lg"
                    bg="white"
               >
                    <Box justifyContent={'center'} w={'100%'}>
                         <Text fontSize={'2xl'} textAlign={'center'}> Create A New Gig! </Text>
                    </Box>

                    <Flex width='100%' direction={'column'} justify={'center'} align={'center'}>
                         <form style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} onSubmit={handleSubmit}>
                              <FormControl id="title" isRequired paddingBottom={10}>
                                   <FormLabel fontSize={'sm'}>Title</FormLabel>
                                   <Input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleChange}
                                   />
                                   {errors.title && <Box color="red">{errors.title}</Box>}
                              </FormControl>

                              <FormControl id="desc" isRequired paddingBottom={10}>
                                   <FormLabel fontSize={'sm'}>Description</FormLabel>
                                   <Input
                                        type="text"
                                        name="desc"
                                        value={data.desc}
                                        onChange={handleChange}
                                   />
                                   {errors.desc && <Box color="red">{errors.desc}</Box>}
                              </FormControl>

                              <FormControl id="desc" isRequired paddingBottom={10}>
                                   <FormLabel fontSize={'sm'}>Sub Category</FormLabel>
                                   <select name="sub-category" onChange={handleChange} style={{ border: '0.5px solid black', padding: '10px' }} id="sub-category" required>
                                        <optgroup label="Graphics and design">
                                             <option value="gd-logo_design">Logo Design</option>
                                             <option value="gd-web_design">web design</option>
                                        </optgroup>
                                        <optgroup label="Programming And Tech">
                                             <option value="pt-web_dev">web development</option>
                                             <option value="pt-app_dev">App development</option>
                                        </optgroup>
                                        <optgroup label="Content and Digital Writing">
                                             <option value="cdw-blogs_articles">Blogs and articles</option>
                                             <option value="cdw-resume_cover">Resume</option>
                                        </optgroup>
                                        <optgroup label="Video and animation">
                                             <option value="va-video_editing">video editing</option>
                                             <option value="va-animation">Animation</option>
                                        </optgroup>
                                        <optgroup label="Digital Marketing">
                                             <option value="dm-seo">SEO</option>
                                             <option value="dm-social_marketing">Social Media Marketing</option>
                                        </optgroup>
                                   </select>

                                   {errors.desc && <Box color="red">{errors.desc}</Box>}
                              </FormControl>

                              <FormControl id="image" isRequired paddingBottom={10}>
                                   <FormLabel fontSize={'sm'}>Gig Image</FormLabel>
                                   <Input
                                        type="file"
                                        name="image"
                                        onChange={handleFile}
                                   />
                                   {errors.gigImage && <Box color="red">{errors.gigImage}</Box>}
                              </FormControl>

                              <FormControl id="tier1Price" isRequired paddingBottom={10}>
                                   <FormLabel fontSize='sm'>Tier 1 Price</FormLabel>
                                   <Input
                                        type="number"
                                        name="tier1Price"
                                        value={data.tier1Price}
                                        onChange={handleChange}
                                   />
                                   {errors.tier1Price && <Box color="red">{errors.tier1Price}</Box>}
                              </FormControl>

                              <FormControl id="tier1duration" isRequired paddingBottom={10}>
                                   <FormLabel fontSize='sm'>Tier 1 Delivery Time</FormLabel>
                                   <Input
                                        type="number"
                                        name="tier1duration"
                                        min="0"
                                        placeholder='Delivery Time (in hours)'
                                        value={data.tier1duration}
                                        onChange={handleChange}
                                   />
                                   {errors.tier1duration && <Box color="red">{errors.tier1duration}</Box>}
                              </FormControl>

                              <FormControl id="tier1Services" isRequired paddingBottom={10}>
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

                              <FormControl id="tier2Price" isRequired paddingBottom={10}>
                                   <FormLabel fontSize='sm'>Tier 2 Price</FormLabel>
                                   <Input
                                        type="number"
                                        name="tier2Price"
                                        value={data.tier2Price}
                                        onChange={handleChange}
                                   />
                                   {errors.tier2Price && <Box color="red">{errors.tier2Price}</Box>}
                              </FormControl>

                              <FormControl id="tier2duration" isRequired paddingBottom={10}>
                                   <FormLabel fontSize='sm'>Tier 2 Delivery Time</FormLabel>
                                   <Input
                                        type="number"
                                        name="tier2duration"
                                        min="0"
                                        placeholder='Delivery Time (in hours)'
                                        value={data.tier2duration}
                                        onChange={handleChange}
                                   />
                                   {errors.tier2duration && <Box color="red">{errors.tier2duration}</Box>}
                              </FormControl>

                              <FormControl id="tier2Services" isRequired paddingBottom={10}>
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

                              <FormControl id="tier3Price" isRequired paddingBottom={10}>
                                   <FormLabel fontSize='sm'>Tier 3 Price</FormLabel>
                                   <Input
                                        type="number"
                                        name="tier3Price"
                                        value={data.tier3Price}
                                        onChange={handleChange}
                                   />
                                   {errors.tier3Price && <Box color="red">{errors.tier3Price}</Box>}
                              </FormControl>

                              <FormControl id="tier3duration" isRequired paddingBottom={10}>
                                   <FormLabel fontSize='sm'>Tier 3 Delivery Time</FormLabel>
                                   <Input
                                        type="number"
                                        name="tier3duration"
                                        min="0"
                                        placeholder='Delivery Time (in hours)'
                                        value={data.tier3duration}
                                        onChange={handleChange}
                                   />
                                   {errors.tier3duration && <Box color="red">{errors.tier3duration}</Box>}
                              </FormControl>

                              <FormControl id="tier3Services" isRequired paddingBottom={10}>
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
                    </Flex>
               </VStack>
          </Center>
     );
};

export default RegisterGig;
