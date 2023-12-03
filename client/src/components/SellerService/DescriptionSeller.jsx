import { ListItem, ListIcon, List, Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { MdOutlineControlPoint } from "react-icons/md";
import { Link } from "react-router-dom";

const DescriptionSeller = ({ sellerImage, mainImage, sellerDetails }) => {
  return (
    <HStack
      justifyContent={'center'}
      mt='6'
      w={{
        base: 'lg',
        md: 'xl'
      }}
    >
      <Card
        direction={{ base: 'column', md: 'row' }}
        w={{
          base: 'sm',
          md: 'xl'
        }}
        justifyContent={'center'}
        alignItems={'center'}
        variant='filled'
      >
        <Image
          objectFit='contain'
          p='6'
          maxW={{ base: '100%', sm: '70%', md: '50%', lg: '40%' }}
          // margin='0 auto'
          src={mainImage}
          alt='Service image'
        />

        <Stack>
          <CardBody>
            <Heading size='md' mb='3'>{sellerDetails.name}</Heading>
            <List>
              <ListItem key={"x"}>
                <ListIcon as={MdOutlineControlPoint} color='green.500' />
                {`${sellerDetails.name} is an ${sellerDetails.sellerType}`}
              </ListItem>
              <ListItem key={"x"}>
                <ListIcon as={MdOutlineControlPoint} color='green.500' />
                {sellerDetails.desc}
              </ListItem>
              <ListItem key={"x"}>
                <ListIcon as={MdOutlineControlPoint} color='green.500' />
                {sellerDetails.title}
              </ListItem>
              <ListItem key={"x"}>
                <ListIcon as={MdOutlineControlPoint} color='green.500' />
                {`Starting price : ${sellerDetails.price}`}
              </ListItem>

              <ListItem key={"x"}>
                <ListIcon as={MdOutlineControlPoint} color='green.500' />
                {`Minimum Duration starts from  ${sellerDetails.minDuration}h`}
              </ListItem>
            </List>
          </CardBody>

          <CardFooter>
            <Link to='/app/profile'>
              <Button variant='solid' colorScheme='blue'>
                Visit Profile
              </Button>
            </Link>
          </CardFooter>
        </Stack>
      </Card>
    </HStack >
  );
};

export default DescriptionSeller;