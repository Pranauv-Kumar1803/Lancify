import React from 'react';
import { useParams } from 'react-router-dom';
import { Box, Heading, Text, VStack, Container, Avatar, Flex } from '@chakra-ui/react';
import Data from './BlogData.json';

const BlogDetail = () => {
     const { blogId } = useParams();
     const blogData = Data[blogId];

     if (!blogData) {
          return <div>Blog not found</div>;
     }

     const { authorName, blogTitle, content } = blogData;
     const paragraphs = content.split('\n');

     return (
          <Container maxW="container.xl" centerContent my={'3'}>
               <Box
                    w="100%"
                    p="8"
                    borderWidth="1px"
                    borderRadius="lg"
                    overflow="hidden"
                    boxShadow="lg"
                    bg="white"
               >
                    <VStack align="start" spacing="4">
                         <Heading as="h1" size="2xl" color="blue.500">
                              {blogTitle}
                         </Heading>
                         <Flex align="center">
                              <Avatar size="sm" name={authorName} src="https://placekitten.com/50/50" />
                              <Text fontSize="md" color="gray.600" ml="2">
                                   By {authorName}
                              </Text>
                         </Flex>
                         {paragraphs.map((paragraph, index) => (
                              <Text key={index} fontSize="sm" color="black">
                                   {paragraph}
                              </Text>
                         ))}
                    </VStack>
               </Box>
          </Container>
     );
};

export default BlogDetail;
