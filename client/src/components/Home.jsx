import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Container,
    Box, SimpleGrid, Icon
} from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcInTransit } from 'react-icons/fc'

const Feature = ({ title, text, icon }) => {
    return (
        <Stack>
            <Flex
                w={16}
                h={16}
                align={'center'}
                justify={'center'}
                color={'white'}
                rounded={'full'}
                bg={'gray.100'}
                mb={1}>
                {icon}
            </Flex>
            <Text fontWeight={600}>{title}</Text>
            <Text color={'gray.600'}>{text}</Text>
        </Stack>
    )
}

function Home() {

    // useEffect(() => {
    //     toast.success("this is the easiest way to do toast", {
    //         position: 'bottom-right',
    //     })
    // }, [])

    return (

        <Container maxW={'2 xl'} centerContent>
            <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
                <Flex p={8} flex={1} align={'center'} justify={'center'}>
                    <Stack spacing={6} w={'full'} maxW={'xl'}>
                        <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
                            <Text
                                as={'span'}
                                position={'relative'}
                                _after={{
                                    content: "''",
                                    width: 'full',
                                    height: useBreakpointValue({ base: '20%', md: '30%' }),
                                    position: 'absolute',
                                    bottom: 1,
                                    left: 0,
                                    bg: 'blue.400',
                                    zIndex: -1,
                                }}>
                                Freelance
                            </Text>
                            <Text bottom={0}>
                                As You Wish!
                            </Text>
                            <br />{' '}
                            <Text color={'blue.400'} as={'span'}>
                                Design Projects
                            </Text>{' '}
                        </Heading>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                            The project board is an exclusive resource for contract work. It&apos;s
                            perfect for freelancers, agencies, and moonlighters.
                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <Button
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                Create Project
                            </Button>
                            <Button rounded={'full'}>How It Works</Button>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                    />
                </Flex>
            </Stack>
            <Box p={4}>
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
                    <Feature
                        icon={<Icon as={FcAssistant} w={10} h={10} />}
                        title={'Lifetime Support'}
                        text={
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcDonate} w={10} h={10} />}
                        title={'Unlimited Donations'}
                        text={
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                        }
                    />
                    <Feature
                        icon={<Icon as={FcInTransit} w={10} h={10} />}
                        title={'Instant Delivery'}
                        text={
                            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                        }
                    />
                </SimpleGrid>
            </Box>
        </Container>

    )
}

export default Home;