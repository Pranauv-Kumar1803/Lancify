import {
  Box,
  Center,
  Container,
  Radio,
  RadioGroup,
  SimpleGrid,
  Stack,
} from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  ModalFooter,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import Card from "../Reusable/ReCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-toastify";
import Loader from "../loader/Loader";

function Domains() {
  const params = useParams();
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filter, setFilter] = useState({ min: 0, max: 0, time: null });
  const [isFilter, setIsFilter] = useState(false);

  const getServices = async (params) => {
    try {
      setLoading(true);
      const res = await api.get("/domains/" + params);
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Server Error", {
        position: "top-right",
      });
      window.location.href = "/explore/" + params;
    }
  };

  const handleChange = (e) => {
    setFilter((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleRadio = (e) => {
    setFilter((prev) => {
      return { ...prev, time: e };
    });
  };

  const handleSubmit = async () => {
    console.log(filter);
    let str = `/domains/${params.param}?`;
    if (filter.max) str += `max=${Number(filter.max)}`;
    str += filter.min ? `&min=${Number(filter.min)}` : `&min=0`;
    if (filter.time) str += `&hours=${Number(filter.time * 24)}`;

    try {
      setLoading(true);
      const res = await api.get(str);
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Server Error", {
        position: "top-right",
      });
    }
  };

  const removeFilter = async () => {
    console.log("inside here");
    if (!isFilter) return;

    try {
      setLoading(true);
      const res = await api.get("/domains/" + params.param);
      setData(res.data.data);
      setLoading(false);
      setIsFilter(false);
      setFilter({ min: 0, max: 0, time: null });
    } catch (err) {
      toast.error("Server Error", {
        position: "top-right",
      });
      window.location.href = "/explore/" + params;
    }
  };

  useEffect(() => {
    const reg = /[A-Za-z]+-[A-Za-z]+_[A-Za-z]+/i;
    if (!reg.test(params.param)) {
      nav("/error");
    }

    getServices(params.param);
  }, []);

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      background={"#F5F7F8"}
    >
      <Center>
        <Button onClick={onOpen}>Apply Filters</Button>
        <Button
          onClick={(e) => {
            e.preventDefault();
            removeFilter();
          }}
        >
          Remove Filters
        </Button>
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton />
            </ModalHeader>

            <ModalBody>
              <form
                id="new-note"
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit();
                  setIsFilter(true);
                  onClose();
                }}
              >
                <FormControl>
                  <FormLabel>Minimum Price</FormLabel>
                  <Input
                    type="number"
                    name="min"
                    value={filter.min}
                    onChange={handleChange}
                  />
                  <FormLabel>Maximum Price</FormLabel>
                  <Input
                    type="number"
                    name="max"
                    value={filter.max}
                    onChange={handleChange}
                  />
                  <FormLabel>Get By Date</FormLabel>
                  <RadioGroup
                    defaultValue="10"
                    onChange={(e) => handleRadio(e)}
                  >
                    <Stack direction={"column"} spacing={2}>
                      <Radio colorScheme="blue" value="2">
                        Under 2 days
                      </Radio>
                      <Radio colorScheme="blue" value="4">
                        Under 4 days
                      </Radio>
                      <Radio colorScheme="blue" value="6">
                        Under 6 days
                      </Radio>
                    </Stack>
                  </RadioGroup>
                </FormControl>
              </form>
            </ModalBody>

            <ModalFooter>
              <Button type="submit" form="new-note">
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Center>
      <Center>
        {loading ? (
          <Loader />
        ) : (
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} padding={10}>
            {data.length >= 1 ? (
              data.map((d, i) => {
                return (
                  <Card
                    key={i}
                    price={d.starting_price}
                    body={d.seller_desc}
                    title={d.seller_title}
                    name={d.seller_name}
                    img={d.main_img}
                    min_dur={d.min_duration}
                    seller_img={d.seller_img}
                  />
                );
              })
            ) : (
              <h1>No Services with the filter!</h1>
            )}
          </SimpleGrid>
        )}
      </Center>
    </Box>
  );
}

export default Domains;
