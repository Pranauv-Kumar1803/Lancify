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
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loginStart, logout } from '../../features/userSlice'
import { useEffect } from 'react'
import { toast } from 'react-toastify'
import api from '../../api/axios'

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
    const { currentUser } = useSelector((state) => state.user);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const dispatch = useDispatch();
    const nav = useNavigate();

    let Links = currentUser?.isLoggedin ? [{ name: 'Discover Projects', link: 'explore' }, { name: 'Explore the Community', link: '/blogs' }] : [{ name: 'Discover Projects', link: 'explore' }, { name: 'Explore the Community', link: '/blogs' }, { name: 'Register as a User', link: '/auth/signup' }]

    useEffect(() => {
        ;
    }, [currentUser])

    const func = async () => {
        try {
            dispatch(loginStart());
            const res = await api.get('/auth/logout');
            dispatch(logout());
            toast.success('Logout Successful!', {
                position: 'top-right'
            })
            nav('/auth/login');
        } catch (err) {
            toast.error('Server Error', {
                position: 'top-right'
            })
        }
    }

    const handleLogout = () => {
        console.log('inside logging out')
        func()
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
                        <Link to={(currentUser && currentUser.user_type != 'Seller') ? '/app/register' : '/auth/login'}>
                            <Button
                                variant={'solid'}
                                background={'blue.400'}
                                color={'white'}
                                size={'sm'}
                                mr={4}>
                                Register as a Seller
                            </Button>
                        </Link>
                        {currentUser &&
                            <Menu>
                                <MenuButton
                                    as={Button}
                                    rounded={'full'}
                                    variant={'link'}
                                    cursor={'pointer'}
                                    minW={0}>
                                    <Avatar
                                        size={'sm'}
                                        src={currentUser.user_img}
                                    />
                                </MenuButton>
                                <MenuList>
                                    <MenuItem as={'a'} href='/app/dashboard'>
                                        Dashboard
                                    </MenuItem>
                                    <MenuItem as={'a'} href='/app/profile'>
                                        Profile
                                    </MenuItem>
                                    <MenuDivider />
                                    <MenuItem onClick={handleLogout}>
                                        Logout
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