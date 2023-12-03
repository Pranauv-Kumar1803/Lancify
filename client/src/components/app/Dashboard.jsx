import React, { useEffect } from "react";
import { Box, Flex, Text, VStack, Image } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import api from "../../api/axios";

const FinishedOrders = () => {
  // Sample data for finished orders
  const { currentUser } = useSelector((state) => state.user);

  const getOrders = async () => {
    console.log(currentUser);
    try {
      let str = currentUser.user_type != null ? "seller" : "user";
      const res = await api.get("/app/getProfileData?" + `type=${str}`);
      console.log(res.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const ongoingOrders = [
    {
      id: 1,
      title: "Ongoing Project 1",
      user: "User A",
      amount: "$50",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Ongoing Project 2",
      user: "User B",
      amount: "$50",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Ongoing Project 3",
      user: "User C",
      amount: "$50",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Ongoing Project 4",
      user: "User D",
      amount: "$50",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Ongoing Project 5",
      user: "User E",
      amount: "$50",
      main_img: "https://via.placeholder.com/150",
    },
  ];
  const finishedOrders = [
    // Sample data for five finished orders (replace with your actual data)
    {
      id: 1,
      title: "Order 1",
      user: "User 1",
      amount: "$50",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 2,
      title: "Order 2",
      user: "User 2",
      amount: "$70",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Order 3",
      user: "User 3",
      amount: "$90",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Order 4",
      user: "User 4",
      amount: "$110",
      main_img: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Order 5",
      user: "User 5",
      amount: "$130",
      main_img: "https://via.placeholder.com/150",
    },
  ];

  // Sample summary data (replace with your actual data)
  const summaryData = {
    ongoingOrders: 20,
    finishedOrders: 75,
    totalSpent: "$4500",
    acc_bal: "$2200",
    avg_rat: 7.5,
  };
  let content;
  if (currentUser.user_type == null) {
    content = (
      <Box bg="gray.200" p={4} borderRadius="md" textAlign="center">
        <Text>Ongoing Orders: {summaryData.ongoingOrders}</Text>
        <Text>Finished Orders: {summaryData.finishedOrders}</Text>
        <Text>Total Money Spent: {summaryData.totalSpent}</Text>
      </Box>
    );
  } else {
    content = (
      <Box bg="gray.200" p={4} borderRadius="md" textAlign="center">
        <Text>Ongoing Orders: {summaryData.ongoingOrders}</Text>
        <Text>Finished Orders: {summaryData.finishedOrders}</Text>
        <Text>Account balance: {summaryData.acc_bal}</Text>
        <Text>Average rating: {summaryData.avg_rat}</Text>
      </Box>
    );
  }

  return (
    <VStack spacing={6} align="stretch" p={8}>
      return <div>{content}</div>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Finished Orders
      </Text>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {ongoingOrders.map((order) => (
          <Box
            key={order.id}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            mb={4}
            w={["100%", "48%", "32%"]}
            maxW="300px"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={order.main_img}
              alt="Project Image"
              borderRadius="md"
              mb="4"
            />
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {order.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              User: {order.user}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Amount: {order.amount}
            </Text>
          </Box>
        ))}
      </Flex>
      <Text fontSize="3xl" fontWeight="bold" mb={6}>
        Finished Orders
      </Text>
      <Flex flexWrap="wrap" justifyContent="space-between">
        {finishedOrders.map((order) => (
          <Box
            key={order.id}
            bg="white"
            borderRadius="md"
            boxShadow="md"
            p={4}
            mb={4}
            w={["100%", "48%", "32%"]}
            maxW="300px"
            borderWidth="1px"
            borderColor="gray.200"
            _hover={{ boxShadow: "lg" }}
          >
            <Image
              src={order.main_img}
              alt="Project Image"
              borderRadius="md"
              mb="4"
            />
            <Text fontWeight="bold" fontSize="lg" mb={2}>
              {order.title}
            </Text>
            <Text fontSize="sm" color="gray.600">
              User: {order.user}
            </Text>
            <Text fontSize="sm" color="gray.600">
              Amount: {order.amount}
            </Text>
          </Box>
        ))}
      </Flex>
    </VStack>
  );
};

export default FinishedOrders;
