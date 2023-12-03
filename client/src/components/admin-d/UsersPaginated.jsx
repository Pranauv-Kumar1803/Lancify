import { Box, Button, HStack, ListItem, Text, UnorderedList } from '@chakra-ui/react';
import React, { useState } from 'react';

const UsersPaginated = ({ dataList, type }) => {
     const itemsPerPage = 10;
     const [currentPage, setCurrentPage] = useState(0);

     const pageCount = Math.ceil(dataList.length / itemsPerPage);
     const displayedData = dataList.slice(
          currentPage * itemsPerPage,
          (currentPage + 1) * itemsPerPage
     );

     return (
          <Box p={4} boxShadow="lg" borderRadius="md" bg="white" maxW="600px">
               <Text fontSize="xl" fontWeight="bold" mb={4} textAlign='center'>
                    {type === "seller" ? "Sellers" : "Users"}
               </Text>
               <UnorderedList listStyleType="none" p={0} m={0} minH='410px'>
                    {displayedData.map((item, index) => (
                         <ListItem key={index} borderBottom="1px" borderColor="gray.300" py={2}>
                              {type === "seller" ? `${item.seller_fname} ${item.seller_lname}` : `${item.username}`}
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

export default UsersPaginated;
