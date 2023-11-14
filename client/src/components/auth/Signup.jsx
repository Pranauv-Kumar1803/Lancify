import React from 'react';
import { useForm } from 'react-hook-form';
import { chakra, Box, FormControl, Input, HStack, FormErrorMessage, Button, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'
import Loader from '../loader/Loader';
import { useDispatch } from 'react-redux';

const SignupForm = () => {
  const { register, handleSubmit, watch, formState: { errors, } } = useForm();
  const {loading} = useSelector((state)=>state.user);
  const nav = useNavigate();
  const dispatch = useDispatch();

  async function handleRegister (data) {
    try {
      dispatch(loginStart());
      const res = await api.post('/auth/signup', data);
      console.log(res.data);

      dispatch(loginSuccess());

      toast.success('Signup Successful',{
        position: 'top-right'
      })

      nav('/auth/login')

    } catch (err) {
      dispatch(loginError());
      toast.error(err.message, {
        position: 'top-right'
      })
    }
  }

  const onSubmit = (data) => {
    handleRegister(data);
  };

  const password = watch('password');
  const confirmPassword = watch('confirmPassword');
  const passwordsMatch = !!password && password === confirmPassword;

  return (
    <>
      {loading && <Loader></Loader>}
      <Box
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
            maxW='400px'
            boxShadow="lg"
          >
            <chakra.form onSubmit={handleSubmit(onSubmit)}>
              <HStack alignItems='center' justifyContent='center' m='2' >
                <Text
                  bgGradient='linear(to-l, #7928CA, #FF0080)'
                  bgClip='text'
                  fontSize='2xl'
                  fontWeight='bold'
                  _hover={{
                    bgGradient: 'linear(to-r, red.500, yellow.500)',
                  }}
                >
                  Join Lancify Today
                </Text>
                {/* <Text fontSize='2xl' mb={2} color='#1A202C'>Join Lancify</Text> */}
                {/* <Text fontSize='2xl' mb={2} color='#A0AEC0'>Join Lancify Now</Text> */}
                {/* <Text fontSize='2xl' mb={2} color='orange.400'>Join Lancify Now</Text> */}
              </HStack>
              <FormControl id="email" isInvalid={!!errors.email}>
                <Text color='black.200' p={1}>Email</Text>
                <Input

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

              <FormControl mt={4} id="name" isInvalid={!!errors.name}>
                <Text color='black.200' p={1}>Name</Text>

                <Input

                  variant='filled'
                  {...register('name', { required: 'Name is required' })}
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
                <FormErrorMessage>{errors.name?.message}</FormErrorMessage>
              </FormControl>

              <FormControl mt={4} id="password" isInvalid={!!errors.password}>
                <Text color='black.200' p={1}>Password</Text>
                <Input
                  type="password"
                  variant='filled'
                  {...register('password', {
                    required: 'Password is required',
                    minLength: {
                      value: 5,
                      message: 'Password should be at least 5 characters',
                    },
                    pattern: {
                      value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]+$/,
                      message: 'Password should contain at least one digit and one special character',
                    },
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

              <FormControl mt={4} id="confirmPassword" isInvalid={!!errors.confirmPassword}>
                <Text color='black.200' p={1}>Confirm Password</Text>

                <Input
                  type="password"
                  variant='filled'
                  {...register('confirmPassword', { required: 'Confirm Password is required' })}
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
                <FormErrorMessage>{errors.confirmPassword?.message}</FormErrorMessage>
              </FormControl>

              {passwordsMatch && (
                <Text color="green.500" mt={2}>
                  Passwords match!
                </Text>
              )}

              {password !== confirmPassword && !passwordsMatch && (
                <Box color="red.500" mt={2}>
                  Passwords do not match
                </Box>
              )}
              <HStack mt={5} >
                <Button colorScheme="teal" type="submit">
                  Sign Up
                </Button>
                <Link to='/auth/login'>
                  <Button colorScheme='blue'>
                    Login If Account Already exists
                  </Button>
                </Link>
              </HStack>
            </chakra.form>
          </Box>
        </motion.div>
      </Box>
    </>
  );
};

export default SignupForm;

