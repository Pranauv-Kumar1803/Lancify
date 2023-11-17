import React, { useEffect, useState } from 'react'
import Timeline from './Timeline'
import { useParams } from 'react-router-dom';
import { Box, Button, Card, CardBody, CardFooter, CardHeader, Center, Divider, Flex, FormControl, FormLabel, Heading, Image, Input, Radio, RadioGroup, SimpleGrid, Stack, StackDivider, Text, useColorModeValue } from '@chakra-ui/react';
import api from '../api/axios';
import Loader from './loader/Loader';
import { toast } from 'react-toastify';

const Order = () => {
    const param = useParams();
    const [data, setData] = useState({});
    const [input, setInput] = useState({ title: '', message: '', files: [] });
    const [loading, setLoading] = useState(false);
    const bg = useColorModeValue('gray.100', 'gray.900');

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    const fetchData = async (id) => {
        try {
            const res = await api.get('/order/' + id);
            console.log(res.data);
            setData(res.data);
        } catch (err) {
            setLoading(false);
            console.log(err.message);
        }
    }

    useEffect(() => {
        const id = param.id;
        setLoading(true);
        fetchData(id);
        setLoading(false);
        console.log(data);
    }, [])

    const handleSubmit = async () => {
        try {
            setLoading(true);
            const res = await api.post(`/order/${param.id}/addTimeline`, input);
            toast.success('Added to Order Timeline',{
                position: 'top-right'
            })
            setLoading(false);
            setInput({title: '', message: '', files:null})
        } catch (err) {
            setLoading(false);
            toast.error('some error occurred',{
                position: 'top-right'
            });
        }
    }

    const handleChange = (e) => {
        setInput(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    const handleFiles = async (e)=>{
        const f = e.target.files;

        let files = []
        for (let i = 0; i < f.length; i++) {
            const file = f[i];
            const b = await toBase64(file);
            files.push(b);
        }
        setInput(prev=>{
            return {...prev, files: files}
        })
    }

    return (
        <>
            {loading ? <Loader />
                :
                !data.order ? <Loader />
                    :
                    <>
                        <Center p={5}>
                            <Box width={{ base: 'xl', md: '4xl' }} bg={bg} rounded={'md'} >
                                <Center>
                                    <Heading size='md'>Order Report</Heading>
                                </Center>
                                <Flex direction={{ base: 'column', md: 'row' }} padding={10} gap={10} justify={'space-around'} align={'center'}>
                                    <Image
                                        src={data.order.service_id.main_img}
                                        alt="Green double couch with wooden legs"
                                        borderRadius="lg"
                                        width={{ base: '100%', md: '40%' }}
                                        height={'40%'}
                                        objectFit={'cover'}
                                        margin={'0 auto'}
                                    />
                                    <Stack p="6" spacing="3" direction={'column'}>
                                        <Heading size="md">{data.order.service_id.seller_title}</Heading>
                                        <Heading as="h4" size="sm">
                                            {data.order.service_id.seller_desc}
                                        </Heading>
                                    </Stack>
                                    <Box>
                                        <Text fontSize={'xl'}> 1 No. </Text>
                                    </Box>
                                    <Box>
                                        <Text fontSize={'xl'}>₹{data.order.grand_total}</Text>
                                    </Box>
                                </Flex>
                            </Box>
                        </Center>
                        <Center p={5}>
                            <Box width={{ base: 'xl', md: '4xl' }} bg={bg} padding={10} rounded={'md'} >
                                <Center>
                                    <Heading size='md'>Summary</Heading>
                                </Center>
                                <Flex direction={'row'} justify={'space-between'} padding={5}>
                                    <Heading size="md" fontWeight={'small'}>Subtotal</Heading>
                                    <Heading as="p" size="sm">
                                        ₹{data.order.payment.price}
                                    </Heading>
                                </Flex>
                                <Flex direction={'row'} justify={'space-between'} padding={5}>
                                    <Heading size="md" fontWeight={'small'}>Taxes</Heading>
                                    <Heading as="p" size="sm">
                                        ₹{data.order.payment.taxes}
                                    </Heading>
                                </Flex>
                                <Box paddingTop={5}>
                                    <Divider color={'#000'} bgColor={'#000'}></Divider>
                                </Box>
                                <Flex direction={'row'} justify={'space-between'} padding={5} >
                                    <Heading size="md" fontWeight={'medium'}>Total</Heading>
                                    <Heading as="p" size="sm">
                                        ₹{data.order.grand_total}
                                    </Heading>
                                </Flex>
                            </Box>
                        </Center>
                        {data != {} && data.order ? <Timeline timeline={data.order.timeline} /> : <Loader />}
                        <Center p={5}>
                            <Flex width={{ base: 'xl', md: '3xl' }} direction={'column'} justify={'center'} align={'center'} bg={bg} rounded={'md'}>
                                <Heading size="md" fontWeight={'medium'}>Add to Timeline</Heading>
                                <form id="new-note">
                                    <FormControl padding={10}>
                                        <FormLabel>Title</FormLabel>
                                        <Input
                                            type="text"
                                            name="title"
                                            bgColor={'white'}
                                            value={input.title}
                                            onChange={handleChange}
                                        />
                                        <FormLabel>Message</FormLabel>
                                        <Input
                                            type="text"
                                            name="message"
                                            bgColor={'white'}
                                            value={input.message}
                                            onChange={handleChange}
                                        />
                                        <FormLabel>Add a File</FormLabel>
                                        <Input
                                            type="file"
                                            name="message"
                                            onChange={handleFiles}
                                        />
                                        <Button onClick={handleSubmit} colorScheme='blue' > Add! </Button>
                                        {loading && <Loader />}
                                    </FormControl>
                                </form>
                            </Flex>
                        </Center>
                    </>}

        </>
    )
}

export default Order;