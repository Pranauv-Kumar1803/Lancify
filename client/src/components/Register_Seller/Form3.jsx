import {
  Heading,
  FormControl,
  GridItem,
  FormLabel,
  Input,
  SimpleGrid,
  InputLeftAddon,
  InputGroup,
  Button,
  ButtonGroup,
  Flex,
} from "@chakra-ui/react";
import { toast } from "react-toastify";
import api from "../../api/axios";
import {useNavigate} from 'react-router-dom'
import { useState } from "react";
import Loader from '../Loader'


const Form3 = ({ step, setStep, progress, setProgress, data, setData }) => {
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const checkInputs = () => {
    console.log(data);

    const regex = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/

    if (data.github.length == 0 && data.linkedin.length==0) {
      toast.warning('Github or Linkedin is a must to be registered as a user!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    if (data.github.length > 0 && !regex.test(data.github)) {
      toast.warning('Ensure you give a proper link for github!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    if (data.linkedin.length > 0 && !regex.test(data.linkedin)) {
      toast.warning('Ensure you give a proper link for linkedin!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    if (data.twitter.length > 0 && !regex.test(data.twitter)) {
      toast.warning('Ensure you give a proper link for twitter!', {
        position: toast.POSITION.TOP_CENTER,
      });
      return false;
    }

    return true;
  }

  const handleSubmit = async (e) => {
    try {
      setLoading(true);
      const res = await api.post('/app/register_seller', data);
      toast.success("Registration as a Seller Successfull!", {position: toast.POSITION.BOTTOM_CENTER,});
      setLoading(false);
      nav('/app/dashboard');
    } catch (err) {
      setLoading(false);
      toast.error(err.response.message);
    }
  }

  return (
    <>
      {loading && <Loader />}
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
              bg="#4299e1"
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
              focusBorderColor="#4299e1"
              rounded="md"
              name="github"
              value={data.github}
              onChange={handleChange}
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
              bg="#4299e1"
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
              focusBorderColor="#4299e1"
              rounded="md"
              name="twitter"
              value={data.twitter}
              onChange={handleChange}
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
              bg="#4299e1"
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
              focusBorderColor="#4299e1"
              rounded="md" name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
            />
          </InputGroup>
        </FormControl>

      </SimpleGrid>

      <ButtonGroup mt="5%" w="100%">
        <Flex w="100%" justify="space-around">
          <Flex direction={'row'} justify={'center'} align={'center'}>
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
              colorScheme="green"
              variant="solid"
              onClick={() => {
                if (checkInputs()) {
                  handleSubmit();
                }
              }}
            >
              Submit
            </Button>
          </Flex>
        </Flex>
      </ButtonGroup>
    </>
  );
};

export default Form3;


