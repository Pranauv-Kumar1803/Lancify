import { useEffect, useState } from "react"
import { HStack } from '@chakra-ui/react'
import netReq from './data.json'
import api from './../../api/axios'
import Loader from './../Loader/Loader'
import UserAnalytics from "./userAnalytics"
import OrderAnalytics from "./orderAnalytics"
import ServicePriceScatter from './ServicePriceScatter'

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
               <HStack alignItems='top' mt='6' mb='6' justifyContent='space-around'>
                    {services && <ServicePriceScatter data={dataX} />}
                    {(orders) && <OrderAnalytics orders={orders} />}
                    {(users && sellers) && <UserAnalytics users={users} sellers={sellers} />}


               </HStack >
          }
     </>)
}

export default AdDashBoard