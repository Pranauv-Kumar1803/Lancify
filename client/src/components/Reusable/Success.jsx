import { Button, Flex } from '@chakra-ui/react'
import React from 'react'
import img from '../PAYMENT-SUCCESS.png'
import { Link } from 'react-router-dom'

const Success = () => {
    return (
        <Flex justify={'center'} align={'center'} direction={'column'} padding={10} >
            <img src={img} alt="Your Payment is Successful" />
            <Link to={'/app/profile'}>
                <Button width={'100%'} colorScheme='blue'>
                    Go Home
                </Button>
            </Link>
        </Flex>
    )
}

export default Success