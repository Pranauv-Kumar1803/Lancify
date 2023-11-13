import React from 'react';
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHome } from 'react-icons/fa';
import './PageNotFound.css';

const MotionBox = motion(Box);

const draw = {
     hidden: { pathLength: 0, opacity: 0 },
     visible: (i) => {
          const delay = 1 + i * 0.5;
          return {
               pathLength: 1,
               opacity: 1,
               transition: {
                    pathLength: { delay, type: 'spring', duration: 2, bounce: 0 },
                    opacity: { delay, duration: 0.01 },
               },
          };
     },
};

const NotFound = () => {
     const headingStyle = {
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
          transform: 'perspective(500px) rotateX(20deg)',
     };

     const textAnimation = {
          initial: { opacity: 0, translateY: -50, scaleY: 1, rotateX: -30 },
          animate: { opacity: 1, translateY: 0, scaleY: 1.3, rotateX: 0 },
          exit: { opacity: 0, translateY: 50, scaleY: 0.8, rotateX: -30 },
          transition: { duration: 0.5, type: 'spring', damping: 10, stiffness: 100 },
     };


     return (
          <AnimatePresence mode="wait">
               <MotionBox
                    key="notFound"
                    initial={{ opacity: 0, translateY: -50 }}
                    animate={{ opacity: 1, translateY: 0 }}
                    exit={{ opacity: 0, translateY: 50 }}
                    transition={{ duration: 0.5 }}
                    height="75vh"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    position="relative"
                    overflow="hidden"
                    color='white'
                    bgGradient="linear(to-r, teal.300, blue.400)"
               >
                    
                    <motion.svg
                         width="100"
                         height="100"
                         viewBox="100 100 350 350"
                         initial="hidden"
                         animate="visible"
                    >
                         <motion.line
                              x1="220"
                              y1="230"
                              x2="360"
                              y2="370"
                              stroke="#ff0055"
                              custom={0}
                              variants={draw}
                         />
                         <motion.line
                              x1="220"
                              y1="370"
                              x2="360"
                              y2="230"
                              stroke="#ff0055"
                              custom={0.4009}
                              variants={draw}
                         />
                    </motion.svg>
                    <Heading fontSize="6xl" color="red.500" style={headingStyle}>
                         <motion.div {...textAnimation} style={{ perspective: '400px' }}>
                              404
                         </motion.div>
                    </Heading>
                    <Text fontSize="xl" fontWeight="bold" mb="4" {...textAnimation}>
                         Oops! Page not found.
                    </Text>
                    <Text fontSize="lg" mb="5" {...textAnimation}>
                         The page you are looking for might be in another castle.
                    </Text>
                    <Button
                         as="a"
                         href="/"
                         colorScheme="teal"
                         leftIcon={<FaHome />}
                         size="lg"
                         variant="outline"
                         {...textAnimation}
                    >
                         Go to Home
                    </Button>

               </MotionBox>
          </AnimatePresence>
     );
};

export default NotFound;
