import { useEffect, useState } from "react"
import { Flex, Heading } from '@chakra-ui/react'
import { HStack, Box } from '@chakra-ui/react'
import Loader from '../Loader/Loader'
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

import api from '../../api/axios'
import SellerAnalytics from "./SellerAnalytics"
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

    return (<>
        {loading ? <Loader /> :
            <>
                <HStack alignItems='center' mt='6' mb='6' justifyContent='space-around' flexDir={{ base: 'column', lg: 'row' }} >
                    <SellerAnalytics data={data} />
                </HStack >
                <Flex alignItems={'center'} mt={6} mb='6' justifyContent='space-around' direction={{ base: 'column', lg: 'row' }} >
                    <MonthlyRevenue data={data} />
                </Flex>
            </>
        }
    </>)
}

export default SellerDash;