import React from 'react';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const BlogCard = ({ authorName, blogTitle }) => {
     return (
          <Box
               width="300px" // Set a fixed width for each card
               borderWidth="1px"
               borderRadius="lg"
               overflow="hidden"
               boxShadow="md"
               p="10" // Increased padding to increase the height
               bg="white"
               transition="transform 0.2s"
               _hover={{ transform: 'scale(1.05)' }}
          >
               <VStack align="start" spacing="2">
                    <Heading as="h2" size="md" color="blue.500">
                         {blogTitle}
                    </Heading>
                    <Text fontSize="sm" color="teal.400">
                         By {authorName}
                    </Text>
               </VStack>
          </Box>
     );
};

export default BlogCard;
