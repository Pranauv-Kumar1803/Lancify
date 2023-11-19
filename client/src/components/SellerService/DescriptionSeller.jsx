import { ListItem, ListIcon, List, Button, Card, CardBody, CardFooter, HStack, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { MdOutlineControlPoint } from "react-icons/md";

const DescriptionSeller = ({ sellerImage, mainImage, sellerDetails }) => {
  return (
    <HStack
      justifyContent={'center'}
      mt='6'
    >
      <Card
        direction={{ base: 'column', sm: 'column', md: 'column', lg: 'row' }}
        w={{
          base: '80%',
          sm: '95%',
          lg: '95%'
        }}
        justifyContent={'center'}
        overflow='hidden'
        variant='outline'
      >
        <Image
          objectFit='contain'
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
            </List>
          </CardBody>

          {/* <CardFooter>
            <Button variant='solid' colorScheme='blue'>
              Buy Latte
            </Button>
          </CardFooter> */}
        </Stack>
      </Card>
    </HStack >
  );
};

export default DescriptionSeller;