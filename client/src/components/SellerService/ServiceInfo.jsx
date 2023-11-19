import { Box } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import api from './../../api/axios'
import { useNavigate, useParams } from "react-router-dom";
import ItemCard from "./ItemCard";
import CardSkeleton from './CardSkeleton'
const ServiceInfo = () => {
     const { service_id } = useParams()
     console.log(service_id)
     const [data, setData] = useState();
     const [loading, setLoading] = useState(false);
     const nav = useNavigate();

     const getDetails = async () => {
          try {
               setLoading(true);
               const details = await api.get(`/services/${service_id}`)
               setLoading(false);
               setData(details.data)
               return details.data;
          } catch (error) {
               setLoading(false)
               nav('/error')
          }
     }
     useEffect(() => {
          getDetails()
     }, [])
     if (!!loading) return <CardSkeleton />
     return (
          <Box>
               
               {!!data && <ItemCard data={data} />}
          </Box>
     )
}

export default ServiceInfo