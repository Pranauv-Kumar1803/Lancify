import { useState } from "react";

import {
  Heading,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  Select,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  InputLeftAddon,
  InputGroup,
} from "@chakra-ui/react";

const Form2 = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (allowedExtensions.test(file.name)) {
        setSelectedFile(file);
        setError("");
      } else {
        setSelectedFile(null);
        setError(
          "Invalid file format. Please select a jpg, jpeg, or png file."
        );
      }
    }
  };

  return (
    <>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Professional Info
      </Heading>

      <FormControl as={GridItem} colSpan={[6, 3]}>
        <FormLabel
          htmlFor="Occupation"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Occupation
        </FormLabel>

        <Select
          id="Occupation"
          name="Occupation"
          autoComplete="Occupation"
          placeholder="Select option"
          focusBorderColor="teal.600"
          shadow="sm"
          size="sm"
          w="full"
          rounded="md"
          colorScheme="teal.600"
        >
          <option value="none">None</option>
          <option value="student">Student</option>
          <option value="working">
            Working Professional(lessthan 1 yr experience)
          </option>
          <option value="fresher">Working Fresherman</option>
          <option value="other">Other</option>
        </Select>
      </FormControl>

      <FormControl as={GridItem} colSpan={6} mt="5%">
        <FormLabel
          htmlFor="street_address"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
          mt="2%"
        >
          Education
        </FormLabel>

        <Flex>
          <FormControl mr="5%">
            <Input
              id="country"
              placeholder="Country of Institute"
              focusBorderColor="teal.600"
              size="sm"
            />
          </FormControl>

          <FormControl>
            <Input
              id="last-name"
              placeholder="Name of Institute"
              focusBorderColor="teal.600"
              size="sm"
            />
          </FormControl>
        </Flex>
      </FormControl>

      <FormControl as={GridItem} colSpan={6} mt="2%">
        <Flex>
          <FormControl mr="5%">
            <Input
              id="in_title"
              placeholder="Title"
              focusBorderColor="teal.600"
              size="sm"
            />
          </FormControl>

          <FormControl>
            <Input
              id="major"
              placeholder="Major"
              focusBorderColor="teal.600"
              size="sm"
            />
          </FormControl>
        </Flex>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]} mt="5%">
        <FormLabel
          htmlFor="Occupation"
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Year of Education
        </FormLabel>

        <FormControl>
          <NumberInput
            placeholder="Year"
            allowMouseWheel
            min={1950}
            max={2050}
            focusBorderColor="teal.600"
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
      </FormControl>

      <FormControl as={GridItem} colSpan={[6, 3]} mt="5%">
        <FormLabel htmlFor="email" fontWeight="md">
          Certifications
        </FormLabel>
        <Input type="file" onChange={handleFileChange} accept=".pdf" />
      </FormControl>

      <FormControl as={GridItem} colSpan={[3, 2]} mt="5%">
        <FormLabel
          fontWeight="md"
          color="gray.700"
          _dark={{
            color: "gray.50",
          }}
        >
          Personal Website
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

    </>
  );
};

export default Form2;


