import React, { useEffect, useState } from 'react';
import {
  Box,
  chakra,
  Container,
  Link,
  Text,
  HStack,
  VStack,
  Flex,
  Icon,
  useColorModeValue
} from '@chakra-ui/react';
// Here we have used react-icons package for the icons
import { FaRegNewspaper } from 'react-icons/fa';
import { BsGithub } from 'react-icons/bs';
import { IconType } from 'react-icons';

const Timeline = ({ timeline }) => {
  const [data, setData] = useState([]);

  useEffect(()=>{
    const newTimeline = timeline.map((t)=>{
      const name = t.title.split(':')[0];
      const title = t.title.split(':')[1];
      const p = {...t, title, name};
      return p;
    })

    setData(newTimeline);

  },[timeline])

  return (
    <Container maxWidth="xl" p={{ base: 2, sm: 10 }}>
      <chakra.h3 fontSize="lg" fontWeight="bold" mb={18} textAlign="center">
        Order Timeline
      </chakra.h3>
      {data.map((milestone, index) => {
        return <Flex key={index} mb="10px">
          <LineWithDot />
          <Card {...milestone} />
        </Flex>

      })}
    </Container>
  );
};

const Card = ({ title, name, description, date }) => {
  return (
    <HStack
      p={{ base: 3, sm: 6 }}
      bg={useColorModeValue('gray.100', 'gray.800')}
      spacing={5}
      rounded="lg"
      alignItems="center"
      pos="relative"
      _before={{
        content: `""`,
        w: '0',
        h: '0',
        borderColor: `transparent ${useColorModeValue('#edf2f6', '#1a202c')} transparent`,
        borderStyle: 'solid',
        borderWidth: '15px 15px 15px 0',
        position: 'absolute',
        left: '-15px',
        display: 'block'
      }}
    >
      <Box>
        <HStack spacing={2} mb={1}>
          <Text fontSize="sm">
            {name}
          </Text>
        </HStack>
        <VStack spacing={2} mb={3} textAlign="left">
          <chakra.h1
            fontSize="lg"
            lineHeight={1.2}
            fontWeight="bold"
            w="100%"
          >
            {title}
          </chakra.h1>
          <Text fontSize="md" noOfLines={2}>
            {description}
          </Text>
        </VStack>
        <Text fontSize="sm">{new Date(date).toDateString()}</Text>
      </Box>
    </HStack>
  );
};

const LineWithDot = () => {
  return (
    <Flex pos="relative" alignItems="center" mr="40px">
      <chakra.span
        position="absolute"
        left="50%"
        height="calc(100% + 10px)"
        border="1px solid"
        borderColor={useColorModeValue('gray.200', 'gray.700')}
        top="0px"
      ></chakra.span>
      <Box pos="relative" p="10px">
        <Box
          pos="absolute"
          width="100%"
          height="100%"
          bottom="0"
          right="0"
          top="0"
          left="0"
          backgroundSize="cover"
          backgroundRepeat="no-repeat"
          backgroundPosition="center center"
          backgroundColor="rgb(255, 255, 255)"
          borderRadius="100px"
          border="3px solid rgb(4, 180, 180)"
          backgroundImage="none"
          opacity={1}
        ></Box>
      </Box>
    </Flex>
  );
};

export default Timeline;