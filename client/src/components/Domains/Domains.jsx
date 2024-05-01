import {
  Box,
  Button,
  Center,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Radio,
  RadioGroup,
  SimpleGrid,
  Spinner,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/axios";
import Card from "../Reusable/ReCard";
import Loader from "../Loader/Loader";
import { Search2Icon } from "@chakra-ui/icons";

function Domains() {
  const params = useParams();
  const nav = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [filter, setFilter] = useState({ min: 0, max: 0, time: null });
  const [isFilter, setIsFilter] = useState(false);
  const [search, setSearch] = useState('');

  const getServices = async (params) => {
    try {
      setLoading(true);
      const res = await api.get("/domains/" + params);
      console.log(res.data)
      setData(res.data.data);
      setLoading(false);
    } catch (err) {
      toast.error("Server Error", {
        position: "top-right",
      });
      setLoading(false);
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

    if (JSON.stringify(params) !== '{}') {
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
        setLoading(false);
      }
    }
    else {
      let str = `/domains?`;
      if (filter.max) str += `max=${Number(filter.max)}`;
      str += filter.min ? `&min=${Number(filter.min)}` : `&min=0`;
      if (filter.time) str += `&hours=${Number(filter.time * 24)}`;

      try {
        setLoading(true);
        const res = await api.get(str);
        console.log(res.data);
        setData(res.data.data);
        setLoading(false);
      } catch (err) {
        toast.error("Server Error", {
          position: "top-right",
        });
        setLoading(false);
      }
    }
  };

  const removeFilter = async () => {
    console.log("inside here");
    if (!isFilter) return;

    if (JSON.stringify(params) !== '{}') {
      try {
        setLoading(true);
        const res = await api.get("/domains/" + params.param);
        setData(res.data.data);
        setLoading(false);
        setIsFilter(false);
        setFilter({ min: 0, max: 0, time: null });
      } catch (err) {
        setLoading(false);
        toast.error("Server Error", {
          position: "top-right",
        });
        window.location.href = "/explore/" + params;
      }
    }
    else {
      try {
        setLoading(true);
        const res = await api.get("/domains");
        setData(res.data.data);
        setLoading(false);
        setIsFilter(false);
        setFilter({ min: 0, max: 0, time: null });
      } catch (err) {
        setLoading(false);
        toast.error("Server Error", {
          position: "top-right",
        });
        window.location.href = "/explore";
      }
    }
  }


  useEffect(() => {
    const reg = /[A-Za-z]+-[A-Za-z]+_[A-Za-z]+/i;
    const reg1 = /[A-Za-z]+/i
    if (!reg.test(params.param) && !reg1.test(params.param)) {
      nav("/error");
    }

    if (JSON.stringify(params) !== '{}') {
      getServices(params.param);
    }

    getServices('');
  }, []);


  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      background={"#F5F7F8"}
    >
      <Center p={5}>
        <InputGroup>
          <InputLeftElement pointerEvents='none'>
            <Search2Icon color='gray.300' />
          </InputLeftElement>
          <Input type='text' placeholder='Search for Services!' value={search} onChange={(e)=>{setSearch(e.target.value)}} />
        </InputGroup>
      </Center>
      <Center p={5}>
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
          <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} padding={10} >

            {search != '' ? (data && data.length >= 1 && 
              data.map((d, i) => {
                if(d.seller_title.toLowerCase().includes(search)) {
                  return (
                    <Link to={`/services/${d._id}`}>
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
                    </Link>
                  );
                }
              }))
              :
              (
                data && data.length >= 1 ? (
                  data.map((d, i) => {
                    return (
                      <Link to={`/services/${d._id}`}>
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
                      </Link>
                    );
                  })
                ) :  (
                  <h1>No Services with the filter!</h1>
                )
              )
            }
          </SimpleGrid>
        )}
      </Center>
    </Box>
  );
}

export default Domains;
