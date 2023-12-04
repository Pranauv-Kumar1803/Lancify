import React from 'react';
import { VStack, Flex, useMediaQuery, Text } from '@chakra-ui/react';
import BlogCard from './BlogCard';
import Data from './BlogData.json';
import { Link } from 'react-router-dom';

const BlogList = () => {
     const [isSmallerThan768] = useMediaQuery('(max-width: 768px)');

     return (
          <VStack spacing="4" p="4" align="center">
               <Text fontSize={'2xl'} fontWeight={'bold'}>
                    Blogs
               </Text>
               <Flex
                    direction={isSmallerThan768 ? 'column' : 'row'}
                    wrap="wrap"
                    justifyContent="center"
                    alignItems="center"
                    gap={isSmallerThan768 ? '4' : '8'}
               >
                    {Data.map((blog, id) => (
                         <Link to={`/blogs/${id}`}><BlogCard
                              key={blog.id}
                              authorName={blog.authorName}
                              blogTitle={blog.blogTitle}
                         /></Link>
                    ))}
               </Flex>
          </VStack>
     );
};

export default BlogList;
