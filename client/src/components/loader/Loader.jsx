import { Center, Spinner } from "@chakra-ui/react";


function Loader() {
    return (
        <Center>
            <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                margin={'0 auto'}
            />
        </Center>
    );
}

export default Loader;
