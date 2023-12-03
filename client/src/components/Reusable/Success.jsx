import { Button, Flex } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import img from '../../PAYMENT-SUCCESS.png'
import { Link, useSearchParams } from 'react-router-dom'
import api from '../../api/axios'

const Success = () => {
    const [query, setQuery] = useSearchParams();
    const [order, setOrder] = useState('');

    const orderSuccess = async (serviceId, tier) => {
        try {
            const res = await api.post('/app/payment-success?'+`service=${serviceId}&tier=${tier}`);
            console.log(res.data);
            setOrder(res.data.order._id);
        } catch (err) {
            console.log(err.message);
        }
    }

    useEffect(()=>{
        const serviceId = query.get('s');
        const tier = query.get('t');

        orderSuccess(serviceId, tier);
    },[])

    return (
        <Flex justify={'center'} align={'center'} direction={'column'} padding={10} >
            <img src={img} alt="Your Payment is Successful" />
            <Link to={`/order/${order}`}>
                <Button width={'100%'} colorScheme='blue'>
                    Go Home
                </Button>
            </Link>
        </Flex>
    )
}

export default Success