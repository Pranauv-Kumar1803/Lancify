import {
  Heading,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Textarea,
  FormHelperText,
} from "@chakra-ui/react";
const Form3 = () => {
  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal">
        Social Profiles
      </Heading>
      <SimpleGrid columns={1} spacing={6}>

        <FormControl as={GridItem} colSpan={[3, 2]} mt="5%">
          <FormLabel
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Github
          </FormLabel>

          <InputGroup size="sm">
            <InputLeftAddon
              bg="teal.600"
              _dark={{
                bg: "gray.800",
              }}
              color="white"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="teal.600"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

        <FormControl as={GridItem} colSpan={[3, 2]} mt="5%">
          <FormLabel
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Twitter
          </FormLabel>

          <InputGroup size="sm">
            <InputLeftAddon
              bg="teal.600"
              _dark={{
                bg: "gray.800",
              }}
              color="white"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="teal.600"
              rounded="md"
            />
          </InputGroup>
        </FormControl>

        <FormControl as={GridItem} colSpan={[3, 2]} mt="5%">
          <FormLabel
            fontWeight="md"
            color="gray.700"
            _dark={{
              color: "gray.50",
            }}
          >
            Linkedin
          </FormLabel>

          <InputGroup size="sm">
            <InputLeftAddon
              bg="teal.600"
              _dark={{
                bg: "gray.800",
              }}
              color="white"
              rounded="md"
            >
              http://
            </InputLeftAddon>
            <Input
              type="tel"
              placeholder="www.example.com"
              focusBorderColor="teal.600"
              rounded="md"
            />
          </InputGroup>
        </FormControl>
        
      </SimpleGrid>
    </>
  );
};

export default Form3;


