import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

function ReCard({ img, seller_img, title, body, price, name }) {
    return (
        <Card maxW='sm' backgroundColor={'#DDF2FD'} color={'#164863'}>
            <CardBody>
                <Image
                    src={img}
                    alt='Green double couch with wooden legs'
                    borderRadius='lg'
                />
                <Stack mt='6' spacing='3'>
                    <Heading size='md'>{title}</Heading>
                    <Flex direction={'row'} justify={'flex-start'} align={'center'}>
                        <Image
                            borderRadius='full'
                            boxSize='30px'
                            src={seller_img}
                        />
                        <Heading as='h4' size='sm' paddingLeft={5}>
                            {name}
                        </Heading>
                    </Flex>
                    <Text>
                        {body}
                    </Text>
                    <Text color='blue.600' fontSize='2xl'>
                        Starting at : ${price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter display={'flex'} justifyContent={'space-around'}>
                <ButtonGroup spacing={{ sm: '0px', md: '1px' }} padding={1}>
                    <Button variant='solid' colorScheme='blue'>
                        Buy now
                    </Button>
                    <Button variant='ghost' colorScheme='blue'>
                        Learn More
                    </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    )
}

export default ReCard