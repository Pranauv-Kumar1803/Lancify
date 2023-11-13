// import React from 'react';
// import { Box, Heading, Text, Button } from '@chakra-ui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHome } from 'react-icons/fa';

// const MotionBox = motion(Box);

// const NotFound = () => {
//      return (
//           <AnimatePresence mode="wait">
//                <MotionBox
//                     key="notFound"
//                     initial={{ opacity: 0, translateY: -50 }}
//                     animate={{ opacity: 1, translateY: 0 }}
//                     exit={{ opacity: 0, translateY: 50 }}
//                     transition={{ duration: 0.5 }}
//                     height="100vh"
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     textAlign="center"
//                >
//                     <Heading fontSize="6xl" color="red.500">
//                          404
//                     </Heading>
//                     <Text fontSize="xl" fontWeight="bold" mb="4">
//                          Oops! Page not found.
//                     </Text>
//                     <Text fontSize="lg" mb="8">
//                          The page you are looking for might be in another castle.
//                     </Text>
//                     <Button
//                          as="a"
//                          href="/"
//                          colorScheme="teal"
//                          leftIcon={<FaHome />}
//                          size="lg"
//                          variant="outline"
//                     >
//                          Go to Home
//                     </Button>
//                </MotionBox>
//           </AnimatePresence>
//      );
// };

// export default NotFound;
// import React from 'react';
// import { Box, Heading, Text, Button } from '@chakra-ui/react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { FaHome } from 'react-icons/fa';

// const MotionBox = motion(Box);

// const NotFound = () => {
//      const waveAnimationStyle = {
//           animation: 'waveAnimation 10s ease infinite',
//      };

//      const headingStyle = {
//           textShadow: '2px 2px 4px rgba(0, 0, 0, 0.2)',
//           transform: 'perspective(500px) rotateX(20deg)',
//      };

//      return (
//           <AnimatePresence mode='wait'>
//                <MotionBox
//                     key="notFound"
//                     initial={{ opacity: 0, translateY: -50 }}
//                     animate={{ opacity: 1, translateY: 0 }}
//                     exit={{ opacity: 0, translateY: 50 }}
//                     transition={{ duration: 0.5 }}
//                     height="100vh"
//                     display="flex"
//                     flexDirection="column"
//                     justifyContent="center"
//                     alignItems="center"
//                     textAlign="center"
//                     position="relative"
//                     overflow="hidden"
//                >
//                     <div
//                          style={{
//                               position: 'fixed',
//                               top: 0,
//                               left: 0,
//                               width: '100%',
//                               height: '100%',
//                               zIndex: -1,
//                               background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
//                               ...waveAnimationStyle,
//                          }}
//                     />

//                     <Heading fontSize="6xl" color="red.500" style={headingStyle}>
//                          404
//                     </Heading>
//                     <Text fontSize="xl" fontWeight="bold" mb="4">
//                          Oops! Page not found.
//                     </Text>
//                     <Text fontSize="lg" mb="8">
//                          The page you are looking for might be in another castle.
//                     </Text>
//                     <Button
//                          as="a"
//                          href="/"
//                          colorScheme="teal"
//                          leftIcon={<FaHome />}
//                          size="lg"
//                          variant="outline"
//                     >
//                          Go to Home
//                     </Button>
//                </MotionBox>
//           </AnimatePresence>
//      );
// };

// export default NotFound;


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
                    height="100vh"
                    display="flex"
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    textAlign="center"
                    position="relative"
                    overflow="hidden"
               >


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

                    <motion.svg
                         width="300"
                         height="300"
                         viewBox="0 0 600 600"
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
               </MotionBox>
          </AnimatePresence>
     );
};

export default NotFound;
