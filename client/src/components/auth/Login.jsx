import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { chakra, Box, FormControl, useToast, Input, Stack, HStack, FormErrorMessage, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../api/axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { loginError, loginStart, loginSuccess } from '../../features/userSlice';
import Loader from '../Loader/Loader';

const Login = () => {
  const { register, handleSubmit, formState: { errors, } } = useForm();
  const { loading } = useSelector((state) => state.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  const [details, setDetails] = useState({
    email: '',
    password: '',
  })
  const [csrfToken, setcsrfToken] = useState("");

  const gettoken = async () => {
    try {
      const res = await api.get("/auth/csrftoken", { withCredentials: true });
      console.log(res.data.csrfToken);
      setcsrfToken(res.data.csrfToken);
    }
    catch (err) {
      console.log(err)
    }
  }

  async function handleLogin(data) {
    try {
      dispatch(loginStart());
      const res = await api.post('/auth/login', { _csrf: csrfToken, data });
      // console.log(res.data);

      dispatch(loginSuccess(res.data));
      (data.email == "naruto@gmail.com") ? nav('/admin/dashboard') : nav('/app/dashboard')

      toast.success('Login Successful', {
        position: 'top-right'
      })

    } catch (err) {
      // console.log(err)
      dispatch(loginError());
      toast.error(err?.response?.data?.message || err.message, {
        position: 'top-right'
      })
    }
  }

  const onSubmit = (data) => {
    console.log(data)
    handleLogin(data);
  };

  useEffect(() => {
    gettoken();
  }, []);

  return (
    <>
      {loading && <Loader></Loader>}
      <Box
        bg='#90CDF4'
        bgGradient="linear(to-r, teal.300, blue.500)"
        minHeight="100vh"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{ width: '100%', maxWidth: '400px' }}
        >
          <Box
            p={8}
            borderRadius="lg"
            bg='white'
            minW='356px'
            boxShadow="lg"
          >
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <HStack alignItems='center' justifyContent='center' m='2' >
                <Text fontSize='2xl' mb={2}
                  bgGradient='linear(to-r, red.500, yellow.500)'
                  bgClip='text'
                  fontWeight='bold'
                  _hover={{

                    bgGradient: 'linear(to-l, #7928CA, #FF0080)',
                  }}

                >Login to Lancify</Text>
                {/* <Text fontSize='2xl' mb={2} color='teal.300'>Login to Lancify</Text> */}
              </HStack>
              <FormControl id="email" isInvalid={!!errors.email}>
                <Text color='black.200' p={1}>Email</Text>
                <Input
                  onChange={(e) => {
                    setDetails({ ...details, email: e.target.value })
                  }}
                  variant='filled'
                  {...register('email', { required: 'Email is required', pattern: /^\S+@\S+$/i })}
                  borderColor="white"
                  _focus={{
                    borderColor: 'white.200',
                    boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
                  }}
                  _hover={{
                    borderColor: 'white.200',
                  }}
                  boxShadow="md"
                  borderRadius="md"
                  transition="border-color 0.2s, box-shadow 0.2s"
                />
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} id="password" isInvalid={!!errors.password}>
                <Text color='black.200' p={1}>Password</Text>
                <Input
                  type="password"
                  onChange={(e) => {
                    console.log(e.target.value)
                    setDetails({ ...details, password: e.target.value })
                  }}
                  variant='filled'
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  borderColor="white"
                  _focus={{
                    borderColor: 'white.200',
                    boxShadow: '0 0 0 2px rgba(66, 153, 225, 0.6)',
                  }}
                  _hover={{
                    borderColor: 'white.200',
                  }}
                  boxShadow="md"
                  borderRadius="md"
                  transition="border-color 0.2s, box-shadow 0.2s"
                />

                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              </FormControl>
              <Stack mt={8} >
                <Button colorScheme="teal" type="submit">
                  Login
                </Button>
                <Button colorScheme='blue'>
                  <Link to='/auth/signup'>Signup If Account Doesnot Exist</Link>
                </Button>
              </Stack>
            </chakra.form>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default Login;
