import { useEffect, useState } from "react"
import { Button, Card, CardBody, CardFooter, Flex, Heading, Image, SimpleGrid, Stack, Text } from '@chakra-ui/react'
import { HStack, Box } from '@chakra-ui/react'
import Loader from '../Loader'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import api from '../../api/axios'
import SellerAnalytics from "./SellerAnalytics"
import SellerAnalytics2 from "./SellerAnalytics2"
import MonthlyRevenue from "./MonthlyRevenue"

const SellerDash = () => {
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(null);
    const nav = useNavigate();

    const func = async () => {
        try {
            const res = await api.get('/app/seller-analytics');

            setData(res.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        func();
        console.log(data);
    }, [])

    return (<div style={{backgroundColor: '#f5f5f5'}}>
        {loading ? <Loader /> :
            <>
                <HStack alignItems='center' pt='6'  justifyContent='space-around' flexDir={{ base: 'column', lg: 'row' }} >
                    <SellerAnalytics data={data} />
                </HStack >
                <Flex alignItems={'center'} justifyContent='space-around' direction={{ base: 'column', lg: 'row' }} >
                    <MonthlyRevenue data={data} />
                </Flex>
                <Flex alignItems={'center'} justifyContent='space-around' direction={{ base: 'column', lg: 'row' }} >
                    <SellerAnalytics2 data={data} />
                </Flex>
                <Flex style={{backgroundColor: '#f5f5f5'}} alignItems={'center'} pt={6} pb='6' justifyContent='space-around' direction={{ base: 'column' }} >
                    <Heading size={'lg'} pb={3}> Your Most Rated Services </Heading>
                    <SimpleGrid spacing={5} columns={{ base: 1, lg: 3 }}>
                        {data && data.servicesLiked &&
                            data.servicesLiked.map((liked) => {
                                return <Card maxW='sm' textAlign={'center'} >
                                    <CardBody>
                                        <Image
                                            src={liked.main_img}
                                            borderRadius='lg'
                                        />
                                        <Stack mt='6' spacing='3'>
                                            <Heading size={'md'}>
                                                Avg Rating: {liked.rating}
                                            </Heading>
                                            <Heading size='md'>{liked.seller_title}</Heading>
                                            <Text>
                                                {liked.seller_desc}
                                            </Text>
                                        </Stack>
                                    </CardBody>
                                    <Flex direction={'column'} justify={'center'} align={'center'}>
                                        <CardFooter>
                                            <Button variant='solid' onClick={(e)=>{e.preventDefault(); window.location.href='/services/'+`${liked._id}` }} colorScheme='blue'>
                                                Check out!
                                            </Button>
                                        </CardFooter>
                                    </Flex>
                                </Card>
                            })
                        }
                    </SimpleGrid>
                </Flex>
            </>
        }
    </div>)
}

export default SellerDash;