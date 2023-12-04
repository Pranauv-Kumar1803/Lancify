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
    Box, SimpleGrid, Icon, Center, Card, CardBody, CardFooter
} from '@chakra-ui/react'
import { FcAssistant, FcDonate, FcInTransit, FcApproval } from 'react-icons/fc';
import { FaCode, FaPaintbrush, FaPenNib, FaSearchengin, FaVideo } from "react-icons/fa6";
import { Link } from 'react-router-dom';

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
                                Build and Buy High Quality Projects
                            </Text>{' '}
                        </Heading>
                        <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
                            Lancify is an exclusive resource for contract work. It&apos;s
                            the perfect spot for freelancers!
                        </Text>
                        <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
                            <Button
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                <Link to={'/app/rgig'}>Create Service</Link>
                            </Button>
                            <Button
                                rounded={'full'}
                                bg={'blue.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'blue.500',
                                }}>
                                <Link to={'/explore'}>Explore Service</Link>
                            </Button>
                            <Button rounded={'full'}><Link to={'/blogs'}>Blogs</Link></Button>
                        </Stack>
                    </Stack>
                </Flex>
                <Flex flex={1}>
                    <Image
                        p={10}
                        alt={'Login Image'}
                        objectFit={'cover'}
                        src={
                            'https://images.unsplash.com/photo-1527689368864-3a821dbccc34?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
                        }
                        rounded={'full'}
                    />
                </Flex>
            </Stack>
            <Box p={10}>
                <Center>
                    <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
                        <Feature
                            icon={<Icon as={FcAssistant} w={10} h={10} />}
                            title={'Lifetime Support'}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                        <Feature
                            icon={<Icon as={FcDonate} w={10} h={10} />}
                            title={'Vareity of Projects to Choose From '}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                        <Feature
                            icon={<Icon as={FcInTransit} w={10} h={10} />}
                            title={'Fast Delivery'}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                        <Feature
                            icon={<Icon as={FcApproval} w={10} h={10} />}
                            title={'Quality Assurance'}
                            text={
                                'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
                            }
                        />
                    </SimpleGrid>
                </Center>
            </Box>

            <Flex direction={'column'} justify={'center'} align={'center'} p={5}>
                <Heading>Domains that we offer!</Heading>
                <SimpleGrid columns={{ sm: 1, md: 5 }} spacing={10} padding={10}>
                    <Link to='/explore/pt'>
                        <Stack bgColor={'#98E4FF'} padding={10} rounded={'md'} direction={'column'} spacing={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} minHeight={'20%'} height={'100%'}>
                            <Icon as={FaCode} w={10} h={10} />
                            <Text data-type='Text' align={'center'}>
                                Programming and Technology
                            </Text>
                        </Stack>
                    </Link>
                    <Link to='/explore/gd'>
                        <Stack bgColor={'#98E4FF'} padding={10} rounded={'md'} direction={'column'} spacing={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} minHeight={'20%'} height={'100%'}>
                            <Icon as={FaPaintbrush} w={10} h={10} />
                            <Text data-type='Text' align={'center'}>
                                Graphics and Design
                            </Text>
                        </Stack>
                    </Link>
                    <Link to='/explore/cdw'>
                        <Stack bgColor={'#98E4FF'} padding={10} rounded={'md'} direction={'column'} spacing={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} minHeight={'20%'} height={'100%'}>
                            <Icon as={FaPenNib} w={10} h={10} />
                            <Text data-type='Text' align={'center'}>
                                Content & Digital Writing
                            </Text>
                        </Stack>
                    </Link>
                    <Link to='/explore/va'>
                        <Stack bgColor={'#98E4FF'} padding={10} rounded={'md'} direction={'column'} spacing={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} minHeight={'20%'} height={'100%'}>
                            <Icon as={FaVideo} w={10} h={10} />
                            <Text data-type='Text' align={'center'}>
                                Video and Animation
                            </Text>
                        </Stack>
                    </Link>
                    <Link to='/explore/dm'>
                        <Stack bgColor={'#98E4FF'} padding={10} rounded={'md'} direction={'column'} spacing={4} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} minHeight={'20%'} height={'100%'}>
                            <Icon as={FaSearchengin} w={10} h={10} />
                            <Text data-type='Text' align={'center'}>
                                Digital Marketing
                            </Text>
                        </Stack>
                    </Link>
                </SimpleGrid>
            </Flex>
        </Container>
    )
}

export default Home;