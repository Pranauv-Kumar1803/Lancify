import React, { useState } from 'react';
import { VStack, HStack, Text, Button, Container, Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';

const PaginatedOrders = ({ data, type }) => {
     const [currentPage, setCurrentPage] = useState(1);
     const itemsPerPage = 5;
     const totalPages = Math.ceil(data.length / itemsPerPage);

     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = Math.min(startIndex + itemsPerPage, data.length);
     const currentOrders = data.slice(startIndex, endIndex);

     const handleNextPage = () => {
          if (currentPage < totalPages) {
               setCurrentPage(currentPage + 1);
          }
     };

     const handlePrevPage = () => {
          if (currentPage > 1) {
               setCurrentPage(currentPage - 1);
          }
     };

     return (
          <Container p={4} maxW={'max-content'} borderWidth="1px" borderColor="gray.300" borderRadius="md">
               <VStack align="stretch" spacing={8}>
                    <Text as="h3" fontSize="xl" fontWeight="normal" color="gray.700">
                         {type === 'ongoing' ? 'Ongoing Orders' : 'Completed Orders'}
                    </Text>
                    {currentOrders.map((order, index) => (
                         <Accordion key={index} allowToggle>
                              <AccordionItem border="1px solid" borderColor="gray.300" borderRadius="md">
                                   <AccordionButton _hover={{ bg: "gray.100" }} borderRadius="md">
                                        <Box flex="1" textAlign="left">
                                             <Text fontSize="md" fontWeight="bold">{order.user_name}</Text>
                                             <Text fontSize="sm" color="gray.600">{order.seller_name}</Text>
                                        </Box>
                                        <AccordionIcon />
                                   </AccordionButton>
                                   <AccordionPanel pb={4} paddingBottom={'2'}>
                                        <Text fontSize="sm" color="gray.600" fontWeight="bold">Seller Name</Text>
                                        <span fontSize="sm">{order.seller_name}</span>
                                        <Text fontSize="sm" color="gray.600" fontWeight="bold">Grand Total</Text>
                                        <span fontSize="sm">{order.grand_total}</span>
                                        <Text fontSize="sm" color="gray.600" fontWeight="bold">Service Type</Text>
                                        <span fontSize="sm">{order.service_type.toUpperCase()}</span>
                                        <Text fontSize="sm" color="gray.600" fontWeight="bold">Order Date</Text>
                                        <span fontSize="sm">{new Date(order.order_date).toLocaleDateString()}</span>
                                   </AccordionPanel>
                              </AccordionItem>
                         </Accordion>
                    ))}
                    <HStack justify="center" spacing={4}>
                         <Button
                              onClick={handlePrevPage}
                              disabled={currentPage === 1}
                              colorScheme="teal"
                              variant="outline"
                         >
                              Previous
                         </Button>
                         <Text fontSize="sm">
                              Page {currentPage} of {totalPages}
                         </Text>
                         <Button
                              onClick={handleNextPage}
                              disabled={currentPage === totalPages || totalPages === 0}
                              colorScheme="teal"
                              variant="outline"
                         >
                              Next
                         </Button>
                    </HStack>
               </VStack>
          </Container>
     );
};

export default PaginatedOrders;
