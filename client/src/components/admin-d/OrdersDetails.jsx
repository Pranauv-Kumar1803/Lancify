import { Box, Button, HStack, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React, { useState } from 'react';

const OrdersDetails = ({ dataList }) => {
     const itemsPerPage = 10;
     const [currentPage, setCurrentPage] = useState(0);

     const pageCount = Math.ceil(dataList.length / itemsPerPage);
     const displayedData = dataList.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
     );

     return (
          <Box p={4} boxShadow="lg" borderRadius="md" bg="white" maxW="600px" >
               <Text fontSize="xl" fontWeight="bold" mb={4} textAlign='center'>
                    Orders
               </Text>
               <UnorderedList listStyleType="none" p={0} m={0} minH='410px'>
                    {displayedData.map((item, index) => (
                         <ListItem key={index} borderBottom="1px" color={item.pending ? 'red' : 'teal.600'} borderColor="gray.300" py={2}>
                              {`${item.user_name} , ${item.seller_name}`}
                         </ListItem>
                    ))}
               </UnorderedList>
               <HStack justifyContent="space-between" mt={4}>
                    <Button
                         onClick={() => setCurrentPage((prev) => (prev > 0 ? prev - 1 : prev))}
                         disabled={currentPage === 0}
                         colorScheme="teal"
                         variant="outline"
                    >
                         Previous
                    </Button>
                    <Text color="gray.600">{`Page ${currentPage + 1} of ${pageCount}`}</Text>
                    <Button
                         onClick={() => setCurrentPage((prev) => (prev < pageCount - 1 ? prev + 1 : prev))}
                         disabled={currentPage === pageCount - 1}
                         colorScheme="teal"
                         variant="outline"
                    >
                         Next
                    </Button>
               </HStack>
          </Box>
     );
};

export default OrdersDetails;
