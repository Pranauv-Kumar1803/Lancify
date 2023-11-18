import React, { useState } from 'react'
import ReactStars from "react-rating-stars-component";
import api from '../api/axios';
import { toast } from 'react-toastify';
import { Box, Button, Center, Flex, Heading } from '@chakra-ui/react';

const Rate = ({ order_id }) => {
    const [value, setValue] = useState(2);

    const handleRating = async () => {
        try {
            const res = await api.post(`/order/${order_id}/rate`, {rating: value});
            toast.success('Rated the Service!!', {
                position: 'top-right'
            })
            window.location.reload();
        } catch (err) {
            console.log(err.message)
        }
    }

    return (
        <Flex direction={'column'} justify={'center'} align={'center'}>
            <Heading size={'md'}> How would you like to Rate this Project?? </Heading>
            <Box padding={10}>
                <ReactStars
                    count={5}
                    onChange={(e) => setValue(e)}
                    size={24}
                    activeColor="#ffd700"
                />

            </Box>
            <Button onClick={handleRating}> Submit Rating </Button>
        </Flex>
    )
}


export default Rate