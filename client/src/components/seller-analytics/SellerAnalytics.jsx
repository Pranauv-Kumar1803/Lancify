import { Button, Card, CardBody, CardFooter, CardHeader, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import React from 'react'
import { FaDollarSign, FaClock, FaChevronUp, FaCheckSquare, FaMoneyCheckAlt } from "react-icons/fa";

const SellerAnalytics = () => {
    return (
        <>
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
                        <Heading size='md' textAlign={'center'}> $450 </Heading>
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
                        <Heading size='md' textAlign={'center'}> 5 </Heading>
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
                        <Heading size='md' textAlign={'center'}> 3 </Heading>
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
                        <Heading size='md' textAlign={'center'}> 30 </Heading>
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
                        <Heading size='md' textAlign={'center'}> $3000 </Heading>
                    </CardHeader>
                </Card>
            </SimpleGrid>
        </>
    )
}


export default SellerAnalytics