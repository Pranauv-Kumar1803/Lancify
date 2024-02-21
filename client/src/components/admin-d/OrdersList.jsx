import { useEffect, useState } from 'react'
import { Container, HStack } from '@chakra-ui/react'
import PaginatedOrders from './PaginatedOrders'

import Loader from '../Loader/Loader'
import api from '../../api/axios'

const OrdersList = ({ type }) => {
     const [orderData, setOrderData] = useState([])
     const [completedOrderData, setCompletedOrderData] = useState([]);
     useEffect(() => {
          api.get('/admin/order-analytics').then(e => {
               setOrderData(e.data.ongoing)
               setCompletedOrderData(e.data.completed)
          }).catch(e => console.log(e));
     }, [])
     return (
          orderData.length === 0 && completedOrderData.length === 0 ? <Loader /> : (
               <Container maxW="100%" p={0} m={0}>
                    <HStack justifyContent='flex-start' spacing='10'>
                         {orderData.length > 0 && <PaginatedOrders type={'ongoing'} data={orderData} />}
                         {completedOrderData.length > 0 && <PaginatedOrders type={'completed'} data={completedOrderData} />}
                    </HStack>
               </Container>

          )
     )
}

export default OrdersList