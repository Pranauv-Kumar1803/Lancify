import { Card, CardBody, Text, Button, Heading, List, ListItem, ListIcon, CardFooter, HStack } from '@chakra-ui/react'
import { MdCheckCircle } from 'react-icons/md'
import { BsCurrencyRupee } from "react-icons/bs";
import { GrDeploy } from "react-icons/gr";
import { GiMoneyStack } from "react-icons/gi";

const mpp = new Map()
mpp.set(0, 'Basic');
mpp.set(1, 'Super')
mpp.set(2, 'Ultimate')


const CardDetails = ({ curItem, data, otherData }) => {
     return (<Card borderRadius={'6px'} minW={'348px'} maxW={'360px'} minH='380px' maxH='435px' boxShadow='2xl' p='2' rounded='md' bg='white'>
          <CardBody>
               <Heading size={'md'} mb='3' p={3} fontSize={'xl'}>{mpp.get(curItem)}</Heading>
               <List spacing={2} >
                    {
                         data.map((current) =>
                              <ListItem key={current}>
                                   <ListIcon as={MdCheckCircle} color='green.500' />
                                   {current}
                              </ListItem>)

                    }
                    <ListItem>
                         <ListIcon as={GrDeploy} color='green.500' />
                         {`Delivery Duration : ${otherData.duration}h`}
                    </ListItem>
                    <ListItem>
                         <HStack alignItems={'center'}>
                              <ListIcon as={GiMoneyStack} color='green.500' />
                              <Text>{`Starting Price : ${otherData.price}`}</Text>
                              < BsCurrencyRupee />
                         </HStack>
                    </ListItem>
               </List>
          </CardBody>
          <CardFooter>
               <Button>Buy</Button>
          </CardFooter>
     </Card>
     )
}

export default CardDetails