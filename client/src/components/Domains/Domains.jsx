import { Box, Center, Container, SimpleGrid } from "@chakra-ui/react";
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
    useDisclosure
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


    const getServices = async (params) => {
        try {
            setLoading(true);
            const res = await api.get('/domains/' + params);
            setData(res.data.data);
            setLoading(false);
        } catch (err) {
            toast.error('Server Error', {
                position: 'top-right',
            })
            window.location.href = '/explore/' + params
        }

    }

    const handleChange = (e) => {
        setFilter((prev) => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }

    useEffect(() => {
        const reg = /[A-Za-z]+-[A-Za-z]+_[A-Za-z]+/i
        if (!reg.test(params.param)) {
            nav('/error');
        }

        getServices(params.param);
    }, [])

    return (
        <Box display={"flex"} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} background={'#F5F7F8'}>
            <Center>
                <Button onClick={onOpen}>Filters</Button>
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
                                    console.log(filter)
                                }}
                            >
                                <FormControl>
                                    <FormLabel>Minimum Price</FormLabel>
                                    <Input type="number" name="min" value={filter.min} onChange={handleChange} />
                                    <FormHelperText>
                                        Minimum Price of services
                                    </FormHelperText>
                                    <FormLabel>Maximum Price</FormLabel>
                                    <Input type="number" name="max" value={filter.max} onChange={handleChange} />
                                    <FormHelperText>
                                        Maximum Price of services
                                    </FormHelperText>
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
                {loading ? <Loader /> :
                    <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={10} padding={10}>
                        {data.map((d, i) => {
                            return <Card key={i} price={d.starting_price} body={d.seller_desc} title={d.seller_title} name={d.seller_name} img={d.main_img} seller_img={d.seller_img} />
                        })}
                    </SimpleGrid>
                }
            </Center>
        </Box>
    )
}

export default Domains