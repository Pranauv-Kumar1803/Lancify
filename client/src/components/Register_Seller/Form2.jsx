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
  ButtonGroup,
  Button,
  Text,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const Form2 = ({ step, setStep, progress, setProgress, data, setData }) => {

  const handleChange = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const handleChange2 = (e) => {
    setData(prev => {
      return { ...prev, ['year']: e }
    })
  }

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleFileChange = async (event) => {
    const file = event.target.files;

    if (file.length > 0) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;

      let files = [];
      file.forEach(async (f) => {
        if (allowedExtensions.test(file.name)) {
          const f = await toBase64(file);
          files.push(f);
        } else toast.warning('file format not supported!');
      })

      setData((prev) => {
        return { ...prev, ['certificates']: files }
      })
    }
  };

  const handleSelect = (e) => {
    console.log(e.target.value);
    setData((prev) => {
      return { ...prev, ['occupation']: e.target.value }
    })
  }

  const checkInputs = () => {
    console.log(data);

    const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    if (data.occupation.length == 0) {
      toast.warning('one occupation must be selected!');
      return false;
    }

    if (data.country.length < 2) {
      toast.warning('country name must be atleast 2 characters in length');
      return false;
    }

    if (data.title.length < 2) {
      toast.warning('education title must be atleast 2 characters in length');
      return false;
    }

    if (data.inst_name.length < 5) {
      toast.warning('description must be atleast 5 characters in length');
      return false;
    }

    const y = new Date().getFullYear() + 4;
    if (data.year > y || y - data.year > 100) {
      toast.warning('invalid year provided');
      return false;
    }

    if (data.portfolio.length > 0 && (data.portfolio.length < 10 || !regex.test(data.portfolio))) {
      toast.warning('Ensure you give a proper link for portfolio!');
      return false;
    }

    return true;
  }

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
          value={data.occupation}
          rounded="md"
          colorScheme="teal.600"
          onChange={handleSelect}
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
              name="country"
              value={data.country}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <Input
              id="last-name"
              placeholder="Name of Institute"
              focusBorderColor="teal.600"
              size="sm"
              name="inst_name"
              value={data.inst_name}
              onChange={handleChange}
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
              name="title"
              value={data.title}
              onChange={handleChange}
            />
          </FormControl>

          <FormControl>
            <Input
              id="major"
              placeholder="Major"
              focusBorderColor="teal.600"
              size="sm"
              name="major"
              value={data.major}
              onChange={handleChange}
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
            name="year"
            value={data.year}
            onChange={handleChange2}
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
        <Input type="file" onChange={handleFileChange} multiple="multiple" accept=".pdf" />
        {data.certificates && <Text>Selected Files: {data.certificates && data.certificates.map(file=>{
          return <Text> file.name </Text>
        })}</Text>}
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
            value={data.portfolio}
            name="portfolio"
            onChange={handleChange}
          />
        </InputGroup>
      </FormControl>

      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justify="space-around">
          <Flex>
            <Button
              onClick={() => {
                setStep(step - 1);
                setProgress(progress - 33.33);
              }}
              isDisabled={step === 1}
              colorScheme="blue"
              variant="solid"
              w="7rem"
              mr="5%"
            >
              Back
            </Button>

            <Button
              w="7rem"
              isDisabled={step === 3}
              onClick={() => {
                if (checkInputs()) {
                  setStep(step + 1);
                  if (step === 3) {
                    setProgress(100);
                  } else {
                    setProgress(progress + 33.33);
                  }
                }
              }}
              colorScheme="blue"
              variant="outline"
            >
              Next
            </Button>
          </Flex>
          {step === 3 ? (
            <Button
              w="7rem"
              colorScheme="teal"
              variant="solid"
              onClick={() => {
                toast({
                  title: "Registration Successfull.",
                  description: "You have been Successfully registered as a Seller.",
                  status: "success",
                  duration: 4000,
                  isClosable: true,
                  colorScheme: "blue",
                  variant: "solid"
                });
              }}
            >
              Submit
            </Button>
          ) : null}
        </Flex>
      </ButtonGroup>

    </>
  );
};

export default Form2;


