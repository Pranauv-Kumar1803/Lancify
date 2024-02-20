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
     const [loading, setLoading] = useState(false)
    //  const [data, setData] = useState(netReq);
    const nav = useNavigate();
    const { currentUser } = useSelector(state => state.user);

    //  const sellers = data?.sellers
    //  const services = data?.services
    //  const users = data?.users
    //  const orders = data?.orders
    //  const dataX = []
    //  services?.forEach(e => {
    //       dataX.push(e.starting_price)
    //  })
    //  console.log(dataX)

    const func = async () => {
        try {
            const res = await api.get('/app/seller-analytics');
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        func();
    }, [])

    return (<>
        {loading ? <Loader /> :
            <>
                <HStack alignItems='center' mt='6' mb='6' justifyContent='space-around' flexDir={{base: 'column', lg: 'row'}} >
                    <SellerAnalytics />
                </HStack >
                <Flex alignItems={'center'} mt={6} mb='6' justifyContent='space-around' direction={{base: 'column', lg: 'row'}} >
                    <MonthlyRevenue />
                </Flex>
            </>
        }
    </>)
}

export default SellerDash;