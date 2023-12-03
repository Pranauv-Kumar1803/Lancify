import { useEffect, useState } from "react"
import { Heading } from '@chakra-ui/react'
import { HStack, Box } from '@chakra-ui/react'
import netReq from './data.json'
import api from './../../api/axios'
import Loader from './../Loader/Loader'
import UserAnalytics from "./userAnalytics"
import OrderAnalytics from "./orderAnalytics"
import ServicePriceScatter from './ServicePriceScatter'
import UsersPaginated from "./UsersPaginated"
import OrdersDetails from "./OrdersDetails"

const AdDashBoard = () => {
     const [loading, setLoading] = useState(false)
     const [data, setData] = useState(netReq);
     const sellers = data?.sellers
     const services = data?.services
     const users = data?.users
     const orders = data?.orders
     const dataX = []
     services?.forEach(e => {
          dataX.push(e.starting_price)
     })
     console.log(dataX)

     useEffect(() => {
          // setLoading(true)
          // api.get('/admin/analytics').then(e => {
          //      setData(e.data)
          //      setLoading(false)
          // }).catch(e => console.log(e));
          setData(netReq);
     }, [])
     return (<>
          {loading ? <Loader /> :
               <>
                    <HStack alignItems='center' mt='6' mb='6' justifyContent='space-around' flexDir={{
                         base: 'column',
                         lg: 'row'
                    }} >
                         {(orders) && <OrderAnalytics orders={orders} />}
                         {services && <ServicePriceScatter data={dataX} />}
                         {(users && sellers) && <UserAnalytics users={users} sellers={sellers} />}
                    </HStack >
                    <HStack mb='6' justifyContent='space-around' flexDir={{
                         base: 'column',
                         lg: 'row'
                    }} >
                         <UsersPaginated dataList={sellers} type={"seller"} />
                         <UsersPaginated dataList={users} type={"user"} />
                         <OrdersDetails dataList={orders} />
                    </HStack>
               </>

          }
     </>)
}

export default AdDashBoard