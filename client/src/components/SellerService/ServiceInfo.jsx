import { Box, Center, Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import api from './../../api/axios'
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import CardSkeleton from './CardSkeleton'
import DescriptionSeller from "./DescriptionSeller";
import CardPricing from './CardPricing'
const ServiceInfo = () => {
     const { service_id } = useParams()
     console.log(service_id)
     const [data, setData] = useState();
     const [loading, setLoading] = useState(false);
     const nav = useNavigate();

     const getDetails = async () => {
          try {
               const details = await api.get(`/services/${service_id}`)
               setData(details.data)
               return details.data;
          } catch (error) {
               nav('/error')
          }
     }
     useEffect(() => {
          setLoading(true);
          getDetails()
          setLoading(false);
     }, [])
     if (!!loading) return <CardSkeleton />
     return (
          <Flex direction={'column'} justify={'center'} align={'center'}>
               {!!data && <Flex justify={'center'} align={'center'} width={{base: 'md', md: '2xl'}}>
                    <DescriptionSeller sellerImage={data.seller_img} mainImage={data.main_img} sellerDetails={{
                         sellerType: data.seller_type,
                         name: data.seller_name,
                         desc: data.seller_desc,
                         title: data.seller_title,
                         rating: data.rating,
                         minDuration: data.min_duration,
                         price: data.starting_price
                    }} />
               </Flex>}
               {/* {!!data && <ItemCard data={data} />} */}
               {!!data && <CardPricing data={data} />}

          </Flex>
     )
}

export default ServiceInfo