import {
     Box,
     Button,
     HStack,
     List,
     ListIcon,
     ListItem,
     Stack,
     Text,
     VStack,
     useColorModeValue
} from '@chakra-ui/react';
import { FaCheckCircle } from 'react-icons/fa';
import { MdOutlineCurrencyRupee } from "react-icons/md";

import PriceWrapper from './WrapperCard';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { useEffect } from 'react';
import api from '../../api/axios';

export default function CardPricing({ data }) {
     const services = data.services;
     const [tier0, tier1, tier2] = services;
     const { currentUser } = useSelector(state => state.user);
     const [disable, setDisable] = useState(false);

     useEffect(() => {
          if (currentUser && currentUser.user_type != 'seller') {
               setDisable(false);
          }
          else if (currentUser && currentUser.user_type == 'seller' && currentUser.user_id == data.seller_id) {
               setDisable(true);
          }
     }, [])

     const handleClick = async () => {
          try {
               console.log('inside');
               const res = await api.post
          } catch (err) {

          }
     }

     return (
          <Box py={12}>
               <VStack spacing={2} textAlign="center">
                    <Text fontSize="lg" color={'gray.500'}>
                         Various plans to fit your needs
                    </Text>
               </VStack>
               <Stack
                    direction={{ base: 'column', md: 'row' }}
                    textAlign="center"
                    justify="center"
                    spacing={{ base: 4, lg: 10 }}
                    py={10}>
                    <PriceWrapper>
                         <Box py={4} px={12}>
                              <Text fontWeight="500" fontSize="2xl">
                                   Basic
                              </Text>
                              <HStack justifyContent="center">
                                   <Text fontSize="2xl" fontWeight="900">
                                        <HStack>
                                             <Text>{tier0.starting_price}</Text>
                                             <MdOutlineCurrencyRupee />
                                        </HStack>
                                   </Text>
                              </HStack>
                         </Box>
                         <VStack
                              bg={useColorModeValue('gray.50', 'gray.700')}
                              py={4}
                              borderBottomRadius={'xl'}>
                              <List spacing={3} textAlign="start" px={12}>

                                   {tier0.services.map(e => <ListItem key={e}>
                                        <ListIcon as={FaCheckCircle} color="green.500" />
                                        {e}
                                   </ListItem>)}

                              </List>
                              <Box w="80%" pt={7}>
                                   <Button w="full" isDisabled={disable} onClick={handleClick} colorScheme="blue" variant="outline">
                                        Buy
                                   </Button>
                              </Box>
                         </VStack>
                    </PriceWrapper>

                    <PriceWrapper>
                         <Box position="relative">
                              <Box
                                   position="absolute"
                                   top="-16px"
                                   left="50%"
                                   style={{ transform: 'translate(-50%)' }}>
                                   <Text
                                        textTransform="uppercase"
                                        bg={useColorModeValue('blue.400', 'blue.700')}
                                        px={3}
                                        py={1}
                                        color={useColorModeValue('gray.900', 'gray.300')}
                                        fontSize="sm"
                                        fontWeight="600"
                                        rounded="xl">
                                        Most Popular
                                   </Text>
                              </Box>
                              <Box py={4} px={12}>
                                   <Text fontWeight="500" fontSize="2xl">
                                        Pro
                                   </Text>
                                   <HStack justifyContent="center">
                                        <Text fontSize="2xl" fontWeight="900">
                                             <HStack>
                                                  <Text>{tier1.starting_price}</Text>
                                                  <MdOutlineCurrencyRupee />
                                             </HStack>
                                        </Text>
                                   </HStack>
                              </Box>
                              <VStack
                                   bg={useColorModeValue('gray.50', 'gray.700')}
                                   py={4}
                                   borderBottomRadius={'xl'}>
                                   <List spacing={3} textAlign="start" px={12}>
                                        {tier1.services.map(e => <ListItem key={e}>
                                             <ListIcon as={FaCheckCircle} color="green.500" />
                                             {e}
                                        </ListItem>)}
                                   </List>
                                   <Box w="80%" pt={7}>
                                        <Button isDisabled={disable} onClick={handleClick} w="full" colorScheme="blue">
                                             Buy
                                        </Button>
                                   </Box>
                              </VStack>
                         </Box>
                    </PriceWrapper>
                    <PriceWrapper>
                         <Box py={4} px={12}>
                              <Text fontWeight="500" fontSize="2xl">
                                   WoW
                              </Text>
                              <HStack justifyContent="center">
                                   <Text fontSize="2xl" fontWeight="900">
                                        <HStack>
                                             <Text>{tier2.starting_price}</Text>
                                             <MdOutlineCurrencyRupee />
                                        </HStack>
                                   </Text>
                              </HStack>
                         </Box>
                         <VStack
                              bg={useColorModeValue('gray.50', 'gray.700')}
                              py={4}
                              borderBottomRadius={'xl'}>
                              <List spacing={3} textAlign="start" px={12}>
                                   {tier2.services.map(e => <ListItem key={e}>
                                        <ListIcon as={FaCheckCircle} color="green.500" />
                                        {e}
                                   </ListItem>)}
                              </List>
                              <Box w="80%" pt={7}>
                                   <Button isDisabled={disable} onClick={handleClick} w="full" colorScheme="blue" variant="outline">
                                        Buy
                                   </Button>
                              </Box>
                         </VStack>
                    </PriceWrapper>
               </Stack>
          </Box>
     )
}

