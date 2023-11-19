import { Box, useColorModeValue } from '@chakra-ui/react'
function PriceWrapper(props) {
     const { children } = props

     return (
          <Box
               minWidth={{
                    base: '90%',
                    sm: '80%',
                    md: '28%'
               }}
               minH={'24vw'}
               maxW={{
                    base: '80%',
                    sm: '70%',
                    md: '30%'
               }}
               mb={4}
               shadow="base"
               borderWidth="1px"
               alignSelf={{ base: 'center', lg: 'flex-start' }}
               borderColor={useColorModeValue('gray.200', 'gray.500')}
               borderRadius={'xl'}>
               {children}
          </Box>
     )
}

export default PriceWrapper