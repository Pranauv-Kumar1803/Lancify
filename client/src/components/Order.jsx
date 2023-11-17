import React, { useEffect, useState } from 'react'
import Timeline from './Timeline'
import { useParams } from 'react-router-dom';
import { Box, Card, CardBody, CardHeader, Center, Heading, Stack, StackDivider, Text } from '@chakra-ui/react';
import api from '../api/axios';
import Loader from './loader/Loader';

const Order = () => {
    const param = useParams();
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = async (id) => {
        try {
            setLoading(true);
            const res = await api.get('/order/' + id);
            console.log(res.data);
            setData(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err.message);
        }
    }

    useEffect(() => {
        const id = param.id;

        fetchData(id);
    }, [])

    return (
        <>
            {loading ? <Loader />
                :
                <>
                    <Center p={5}>
                        <Card w={{ base: 'xl', md: '2xl' }}>
                            <CardHeader>
                                <Heading size='md' textAlign={'center'}>Order Report</Heading>
                            </CardHeader>

                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Order Details
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            View a summary of all your clients over the last month.
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
                    </Center>
                    {data!={} && data.order ? <Timeline timeline={data.order.timeline} /> : <Loader /> } 
                </>}

        </>
    )
}

export default Order;