import { HStack } from '@chakra-ui/react'
import React from 'react'

const DescriptionSeller = () => {
  return (
    <HStack justifyContent={'center'}  flexDir={{
      base: "column",
      sm: "column",
      lg: "row"
    }}></HStack>
  )
}

export default DescriptionSeller