import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { FaDollarSign, FaClock, FaChevronUp, FaCheckSquare, FaMoneyCheckAlt } from "react-icons/fa";

const SellerAnalytics = ({ data }) => {
    return (
        <Flex direction={'column'} justify={'center'} align={'center'} gap={5}>
            <Heading size={'lg'}>A few Statistics about yourself!</Heading>
            <Flex direction={{base: 'column', lg: 'row'}} gap={5}>
                <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardBody textAlign={'center'}>
                            <Flex direction={'row'} align={'center'} gap={2}>
                                <FaDollarSign />
                                <p>
                                    Earned This Month
                                </p>
                            </Flex>
                        </CardBody>
                        <CardHeader paddingTop={0}>
                            <Heading size='md' textAlign={'center'}> ₹{data.this_month_total} </Heading>
                        </CardHeader>
                    </Card>
                </SimpleGrid>
                <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardBody textAlign={'center'}>
                            <Flex direction={'row'} align={'center'} gap={2}>
                                <FaChevronUp />
                                <p>
                                    Orders Received this Month
                                </p>
                            </Flex>
                        </CardBody>
                        <CardHeader paddingTop={0}>
                            <Heading size='md' textAlign={'center'}> {data.newOrders} No(s). </Heading>
                        </CardHeader>
                    </Card>
                </SimpleGrid>
                <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardBody textAlign={'center'}>
                            <Flex direction={'row'} align={'center'} gap={2}>
                                <FaClock />
                                <p>
                                    Total Pending Orders
                                </p>
                            </Flex>
                        </CardBody>
                        <CardHeader paddingTop={0}>
                            <Heading size='md' textAlign={'center'}> {data.pending} No(s). </Heading>
                        </CardHeader>
                    </Card>
                </SimpleGrid>
                <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardBody textAlign={'center'}>
                            <Flex direction={'row'} align={'center'} gap={2}>
                                <FaCheckSquare />
                                <p>
                                    Total Completed Orders
                                </p>
                            </Flex>
                        </CardBody>
                        <CardHeader paddingTop={0}>
                            <Heading size='md' textAlign={'center'}> {data.completed} No(s). </Heading>
                        </CardHeader>
                    </Card>
                </SimpleGrid>
                <SimpleGrid templateColumns='repeat(auto-fill, minmax(200px, 1fr))'>
                    <Card>
                        <CardBody textAlign={'center'}>
                            <Flex direction={'row'} align={'center'} gap={2}>
                                <FaMoneyCheckAlt />
                                <p>
                                    Total Balance
                                </p>
                            </Flex>
                        </CardBody>
                        <CardHeader paddingTop={0}>
                            <Heading size='md' textAlign={'center'}> ₹ {data.seller_total} </Heading>
                        </CardHeader>
                    </Card>
                </SimpleGrid>
            </Flex>
        </Flex>
    )
}


export default SellerAnalytics