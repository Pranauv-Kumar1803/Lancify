'use client'

import {
    Box,
    Flex,
    Avatar,
    HStack,
    Text,
    IconButton,
    Button,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    MenuDivider,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react'
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import { Link } from 'react-router-dom'


const NavLink = (props) => {
    const { children } = props
    return (
        <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            href={'#'}>
            {children}
        </Box>
    )
}

function WithAction() {
    const isLoggedin = false;
    const Links = isLoggedin ? [{name: 'Discover Projects', link: 'domains'}, {name: 'Explore the Community', link:'/community-hub'}] : [{name: 'Discover Projects', link:'domains'}, {name: 'Explore the Community', link: '/community-hub'}, {name: 'Register as a User', link: '/auth/signup'}]
    const { isOpen, onOpen, onClose } = useDisclosure()

    const handleLogout = () => {
        console.log('logging u out!');
    }

    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>
                            <Link to={'/'}>
                                Lancify
                            </Link>
                        </Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((obj) => (
                                <Link to={obj.link}>
                                    <NavLink key={obj.name}>{obj.name}</NavLink>
                                </Link>
                            ))}
                        </HStack>
                    </HStack>
                    <Flex alignItems={'center'}>
                        <Button
                            variant={'solid'}
                            background={'blue.400'}
                            color={'white'}
                            size={'sm'}
                            mr={4}>
                            Register as a Seller
                        </Button>
                        {isLoggedin && 
                        <Menu>
                            <MenuButton
                                as={Button}
                                rounded={'full'}
                                variant={'link'}
                                cursor={'pointer'}
                                minW={0}>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem>
                                    <Link to={'/dashboard'}>
                                        Dashboard
                                    </Link>
                                </MenuItem>
                                <MenuItem>
                                    <Link to={'/profile'}>
                                        Profile
                                    </Link>
                                </MenuItem>
                                <MenuDivider />
                                <MenuItem>
                                    <button onClick={handleLogout}>
                                        Logout
                                    </button>
                                </MenuItem>
                            </MenuList>
                        </Menu>
                        }
                    </Flex>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link) => (
                                <NavLink key={link}>{link}</NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    )
}

export default WithAction;