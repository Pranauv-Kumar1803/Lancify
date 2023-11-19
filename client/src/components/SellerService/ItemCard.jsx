import {
     Box,
     HStack
} from "@chakra-ui/react"
import CardDetails from "./CardDetails"
const ItemCard = ({ data }) => {
     console.log(data)
     return (
          <Box p='10'>
               {!!data && <HStack spacing={'6'} justifyContent={'center'} mt='2' flexDir={{
                    base: "column",
                    sm: "column",
                    lg: "row"
               }} alignItems={'center'}>
                    {data.services.map((e, i) => {
                         return <CardDetails data={e.services} curItem={i} key={data._id} otherData={{
                              price: e.starting_price,
                              duration: e.min_duration
                         }} />
                    })}
               </HStack>
               }
          </Box>
     )
}

export default ItemCard