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

import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

const RegisterGig = () => {
     const [formData, setFormData] = useState({
          title: '',
          tier1Price: '',
          tier1Services: '',
          tier2Price: '',
          tier2Services: '',
          tier3Price: '',
          tier3Services: '',
     });
     const { currentUser } = useSelector(state => state.user);
     const nav = useNavigate();
     const [errors, setErrors] = useState({});

     const handleChange = (e) => {
          setFormData({
               ...formData,
               [e.target.name]: e.target.value,
          });
     };

     useEffect(() => {
          if (currentUser && currentUser.user_type != "seller") {
               toast.warning('You are not a seller and cannot create gigs')
               nav('/');
          }
     })

     const handleSubmit = () => {
          const newErrors = {};
          for (const key in formData) {
               if (key.includes('Price') && isNaN(Number(formData[key]))) {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} must be a number`;
               } else if (formData[key].trim() === '') {
                    newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} cannot be empty`;
               }
          }

          if (Object.keys(newErrors).length === 0) {
               console.log('Form is valid:', formData);
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

                    <FormControl id="title" isRequired>
                         <FormLabel fontSize={'sm'}>Title</FormLabel>
                         <Input
                              type="text"
                              name="title"
                              value={formData.title}
                              onChange={handleChange}
                         />
                         {errors.title && <Box color="red">{errors.title}</Box>}
                    </FormControl>

                    <FormControl id="tier1Price" isRequired>
                         <FormLabel fontSize='sm'>Tier 1 Price</FormLabel>
                         <Input
                              type="text"
                              name="tier1Price"
                              value={formData.tier1Price}
                              onChange={handleChange}
                         />
                         {errors.tier1Price && <Box color="red">{errors.tier1Price}</Box>}
                    </FormControl>

                    <FormControl id="tier1Services" isRequired>
                         <FormLabel fontSize='sm'>Tier 1 Services</FormLabel>
                         <Textarea
                              type="text"
                              name="tier1Services"
                              value={formData.tier1Services}
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
                              value={formData.tier2Price}
                              onChange={handleChange}
                         />
                         {errors.tier2Price && <Box color="red">{errors.tier2Price}</Box>}
                    </FormControl>

                    <FormControl id="tier2Services" isRequired>
                         <FormLabel fontSize='sm'>Tier 2 Services</FormLabel>
                         <Textarea
                              type="text"
                              name="tier2Services"
                              value={formData.tier2Services}
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
                              value={formData.tier3Price}
                              onChange={handleChange}
                         />
                         {errors.tier3Price && <Box color="red">{errors.tier3Price}</Box>}
                    </FormControl>

                    <FormControl id="tier3Services" isRequired>
                         <FormLabel fontSize='sm'>Tier 3 Services</FormLabel>
                         <Textarea
                              type="text"
                              name="tier3Services"
                              value={formData.tier3Services}
                              onChange={handleChange}
                         />
                         {errors.tier3Services && (
                              <Box color="red">{errors.tier3Services}</Box>
                         )}
                    </FormControl>

                    <Button colorScheme="blue" onClick={handleSubmit} w={'100%'}

                    >
                         Submit
                    </Button>
               </VStack>
          </Center>
     );
};

export default RegisterGig;
