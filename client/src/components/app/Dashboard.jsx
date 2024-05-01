import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Text,
  VStack,
  Image,
  Center,
  Button,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";
import api from "../../api/axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Loader";

const FinishedOrders = () => {
  // Sample data for finished orders
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getOrders = async () => {
    setLoading(true);
    console.log(currentUser);
    try {
      if (currentUser) {
        let str = currentUser.user_type != null ? "seller" : "user";
        const res = await api.get("/app/getProfileData?" + `type=${str}`);
        setData(res.data);
        setLoading(false);
      }
      // console.log(res.data);
    } catch (err) {
      setLoading(false);
      console.log(err.response.data);
    }
  }

  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    console.log(data);
    let sum = 0;
    if (data.ongoing && data.orders) {
      data.ongoing.forEach((d) => {
        sum += d.grand_total;
      });

      data.orders.forEach((d) => {
        sum += d.grand_total;
      });

      setTotal(sum);
    }
  }, [, data]);

  const summaryData = {
    ongoingOrders: 20,
    finishedOrders: 75,
    totalSpent: "$4500",
    acc_bal: "$2200",
    avg_rat: 7.5,
  };
  let content;
  if (currentUser && currentUser.user_type == null) {
    content = (
      <Box bg="gray.200" p={4} borderRadius="md" textAlign="center">
        <Text>
          Ongoing Orders: {data && data.ongoing && data.ongoing.length}
        </Text>
        <Text>
          Finished Orders: {data && data.orders && data.orders.length}
        </Text>
        <Text>Total Money Spent: ₹{total}</Text>
      </Box>
    );
  } else {
    content = (
      <Box bg="gray.200" p={4} borderRadius="md" textAlign="center">
        <Text>
          Ongoing Orders: {data && data.ongoing && data.ongoing.length}
        </Text>
        <Text>
          Finished Orders: {data && data.orders && data.orders.length}
        </Text>
        <Text>
          Account balance: {data && data.seller && data.seller.balance}
        </Text>
        <Text>Average rating: {data && data.seller && data.seller.rating}</Text>
      </Box>
    );
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <VStack spacing={6} align="stretch" p={8}>
          return <div>{content}</div>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Ongoing Orders
          </Text>
          <Flex
            wrap="wrap"
            direction={"row"}
            justify="flex-start"
            gap={10}
            align={"center"}
          >
            {data &&
              data.ongoing &&
              data.ongoing.length > 0 ?
              data.ongoing.map((order) => (
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
                    src={order.service_id.main_img}
                    alt="Project Image"
                    borderRadius="md"
                    mb="4"
                    minHeight="150px"
                  />
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    {order.service_id.seller_title}
                  </Text>
                  {currentUser && currentUser.user_type == "seller" ? (
                    <Text fontSize="sm" color="gray.600">
                      Buyer : {order.user_name}
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="gray.600">
                      Seller : {order.service_id.seller_name}
                    </Text>
                  )}
                  <Text fontSize="sm" color="gray.600">
                    Amount : {order.grand_total}
                  </Text>

                  <Link to={`/order/${order._id}`}>
                    <Button my="4" colorScheme="blue">
                      Learn more
                    </Button>
                  </Link>
                </Box>
              )) : <h1>Nothing here!</h1>}
          </Flex>
          <Text fontSize="3xl" fontWeight="bold" mb={6}>
            Finished Orders
          </Text>
          <Flex wrap={"wrap"} justify="flex-start" gap={10} align={"center"}>
            {data &&
              data.orders &&
              data.orders.length > 0 ?
              data.orders.map((order) => (
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
                    src={order.service_id.main_img}
                    alt="Project Image"
                    borderRadius="md"
                    mb="4"
                    minHeight="150px"
                  />
                  <Text fontWeight="bold" fontSize="lg" mb={2}>
                    {order.service_id.seller_title}
                  </Text>
                  {currentUser && currentUser.user_type == "seller" ? (
                    <Text fontSize="sm" color="gray.600">
                      Buyer : {order.user_name}
                    </Text>
                  ) : (
                    <Text fontSize="sm" color="gray.600">
                      Seller : {order.service_id.seller_name}
                    </Text>
                  )}
                  <Text fontSize="sm" color="gray.600">
                    Amount : {order.grand_total}
                  </Text>
                  <Link to={`/order/${order._id}`}>
                    <Button my="4" colorScheme="blue">
                      Learn more
                    </Button>
                  </Link>
                </Box>
              )) : <h1>Nothing here!</h1>}
          </Flex>
          {currentUser && currentUser.user_type == "seller" && (
            <>
              <Text fontSize="3xl" fontWeight="bold" mb={6}>
                Your Approved Services
              </Text>
              <Flex
                wrap={"wrap"}
                justify="flex-start"
                gap={10}
                align={"center"}
              >
                {data &&
                  data.gigs &&
                  data.gigs.approvedGigs &&
                  data.gigs.approvedGigs.length > 0 ? 
                  data.gigs.approvedGigs.map((order) => (
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
                        minHeight="150px"
                      />
                      <Text fontWeight="bold" fontSize="lg" mb={2}>
                        {order.seller_title}
                      </Text>
                      <Text fontWeight="sm" fontSize="lg" mb={2}>
                        {order.seller_desc}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Service Type : {order.service_type.replace("_", " ")}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Starting Price : {order.starting_price}
                      </Text>
                      <Link to={`/services/${order._id}`}>
                        <Button my="4" colorScheme="blue">
                          Learn more
                        </Button>
                      </Link>
                    </Box>
                  )):<h1>No Such Services Found!</h1>}
              </Flex>
              <Text fontSize="3xl" fontWeight="bold" mb={6}>
                Your Unapproved Services
              </Text>
              <Flex
                wrap={"wrap"}
                justify="flex-start"
                gap={10}
                align={"center"}
              >
                {data &&
                  data.gigs &&
                  data.gigs.unApprovedGigs && 
                  data.gigs.unApprovedGigs.length > 0 ?
                  data.gigs.unApprovedGigs.map((order) => (
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
                        minHeight="150px"
                      />
                      <Text fontWeight="bold" fontSize="lg" mb={2}>
                        {order.seller_title}
                      </Text>
                      <Text fontWeight="sm" fontSize="lg" mb={2}>
                        {order.seller_desc}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Service Type : {order.service_type.replace("_", " ")}
                      </Text>
                      <Text fontSize="sm" color="gray.600">
                        Starting Price : {order.starting_price}
                      </Text>
                      <Link to={`/services/${order._id}`}>
                        <Button my="4" colorScheme="blue">
                          Learn more
                        </Button>
                      </Link>
                    </Box>
                  )):<h1>No Such Services Found!</h1>}
              </Flex>
            </>
          )}
        </VStack>
      )}
    </>
  );
};

export default FinishedOrders;
