import React from 'react'
import { Stack, Skeleton, HStack } from '@chakra-ui/react'

const CardSkeleton = () => {
     return (
          <HStack justifyContent={'center'} borderRadius={'6px'} p={6} spacing={6} mt='6' flexDir={{
               base: "column",
               sm: "column",
               lg: "row"
          }} alignItems={'center'}>
               <Stack maxW={'23%'} minW='300px'>
                    <Skeleton height='350px' />
               </Stack >
               <Stack maxW={'23%'} minW='300px'>
                    <Skeleton height='350px' />
               </Stack >
               <Stack maxW={'23%'} minW='300px'>
                    <Skeleton height='350px' />
               </Stack >
          </HStack>
     )
}

export default CardSkeleton