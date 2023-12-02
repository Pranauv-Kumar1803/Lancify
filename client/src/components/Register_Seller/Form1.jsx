import { useState } from "react";
import {
  Button,
  Heading,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  FormHelperText,
  InputRightElement,
  Textarea,
  Text,
  Select,
  ButtonGroup,
} from "@chakra-ui/react";
import { toast } from "react-toastify";

const Form1 = ({ step, setStep, progress, setProgress, data, setData }) => {
  const [error, setError] = useState("");
  const [langs, setLangs] = useState([]);

  const handleChange = (e) => {
    setData(prev => {
      return { ...prev, [e.target.name]: e.target.value }
    })
  }

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleFileChange = async (event) => {
    const file = event.target.files[0];

    if (file) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (allowedExtensions.test(file.name)) {

        const f = await toBase64(file);
        console.log(f);
        setData((prev)=>{
          return {...prev, ['profile']: {name: file.name, value: f}}
        })
      } else
        toast.warning('file format not supported!');
    }
  };

  const checkInputs = () => {
    console.log(data);
    if (data.fname.length < 5) {
      toast.warning('first name must be atleast 5 characters in length');
      return false;
    }

    if (data.lname.length < 5) {
      toast.warning('last name must be atleast 5 characters in length');
      return false;
    }

    if (data.desc.length < 50) {
      toast.warning('description must be atleast 50 characters in length');
      return false;
    }

    if (!data.profile) {
      toast.warning('you must select one file as profile picture');
      return false;
    }

    if (!data.languages) {
      toast.warning('select atleast one language');
      return false;
    }

    return true;
  }

  const handleLang = (e) => {
    console.log(e.target.value)
    if(!data.languages.includes(e.target.value)) {
      data.languages.push(e.target.value)
    }
  }

  return (
    <div>
      <Heading w="100%" textAlign={"center"} fontWeight="normal" mb="2%">
        Personal Details
      </Heading>

      <Flex>
        <FormControl mr="5%">
          <FormLabel htmlFor="first-name" fontWeight="md">
            First name
          </FormLabel>
          <Input
            id="first-name"
            placeholder="First name"
            focusBorderColor="teal.600"
            isRequired={true}
            name="fname"
            value={data.fname}
            onChange={handleChange}
          />
        </FormControl>

        <FormControl>
          <FormLabel htmlFor="last-name" fontWeight={"normal"}>
            Last name
          </FormLabel>
          <Input
            id="last-name"
            placeholder="Last name"
            focusBorderColor="teal.600"
            name="lname"
            value={data.lname}
            onChange={handleChange}
          />
        </FormControl>
      </Flex>

      <FormControl mt="5%">
        <FormLabel htmlFor="Description" fontWeight="md">
          Description
        </FormLabel>
        <Textarea
          placeholder="Professional Description in abt 50-200 words"
          size="sm"
          focusBorderColor="teal.600"
          name="desc"
          value={data.desc}
          onChange={handleChange}
        />
      </FormControl>

      <FormControl mt="5%">
        <FormLabel htmlFor="email" fontWeight="md">
          Profile Pic
        </FormLabel>
        <Input
          type="file"
          onChange={handleFileChange}
          // value={data.profile ? 'Selected File Already!' : '' }
          accept=".jpg, .jpeg, .png"
        />
        {data.profile && <Text>Selected File: {data.profile.name}</Text>}
        {error && <Text color="red">{error}</Text>}
      </FormControl>

      <FormControl mt="5%">
        <FormLabel fontWeight={'md'}>
          Languages
        </FormLabel>
        <select placeholder="Languages You Speak" onChange={handleLang} multiple="multiple" focusBorderColor="teal.600" >
          <option value="Afrikaans">Afrikaans</option>
          <option value="Albanian">Albanian</option>
          <option value="Arabic">Arabic</option>
          <option value="Armenian">Armenian</option>
          <option value="Basque">Basque</option>
          <option value="Bengali">Bengali</option>
          <option value="Bulgarian">Bulgarian</option>
          <option value="Catalan">Catalan</option>
          <option value="Cambodian">Cambodian</option>
          <option value="Chinese (Mandarin)">Chinese (Mandarin)</option>
          <option value="Croatian">Croatian</option>
          <option value="Czech">Czech</option>
          <option value="Danish">Danish</option>
          <option value="Dutch">Dutch</option>
          <option value="English">English</option>
          <option value="Estonian">Estonian</option>
          <option value="Fiji">Fiji</option>
          <option value="Finnish">Finnish</option>
          <option value="French">French</option>
          <option value="Georgian">Georgian</option>
          <option value="German">German</option>
          <option value="Greek">Greek</option>
          <option value="Gujarati">Gujarati</option>
          <option value="Hebrew">Hebrew</option>
          <option value="Hindi">Hindi</option>
          <option value="Hungarian">Hungarian</option>
          <option value="Icelandic">Icelandic</option>
          <option value="Indonesian">Indonesian</option>
          <option value="Irish">Irish</option>
          <option value="Italian">Italian</option>
          <option value="Japanese">Japanese</option>
          <option value="Javanese">Javanese</option>
          <option value="Korean">Korean</option>
          <option value="Latin">Latin</option>
          <option value="Latvian">Latvian</option>
          <option value="Lithuanian">Lithuanian</option>
          <option value="Macedonian">Macedonian</option>
          <option value="Malay">Malay</option>
          <option value="Malayalam">Malayalam</option>
          <option value="Maltese">Maltese</option>
          <option value="Maori">Maori</option>
          <option value="Marathi">Marathi</option>
          <option value="Mongolian">Mongolian</option>
          <option value="Nepali">Nepali</option>
          <option value="Norwegian">Norwegian</option>
          <option value="Persian">Persian</option>
          <option value="Polish">Polish</option>
          <option value="Portuguese">Portuguese</option>
          <option value="Punjabi">Punjabi</option>
          <option value="Quechua">Quechua</option>
          <option value="Romanian">Romanian</option>
          <option value="Russian">Russian</option>
          <option value="Samoan">Samoan</option>
          <option value="Serbian">Serbian</option>
          <option value="Slovak">Slovak</option>
          <option value="Slovenian">Slovenian</option>
          <option value="Spanish">Spanish</option>
          <option value="Swahili">Swahili</option>
          <option value="Swedish ">Swedish </option>
          <option value="Tamil">Tamil</option>
          <option value="Tatar">Tatar</option>
          <option value="Telugu">Telugu</option>
          <option value="Thai">Thai</option>
          <option value="Tibetan">Tibetan</option>
          <option value="Tonga">Tonga</option>
          <option value="Turkish">Turkish</option>
          <option value="Ukrainian">Ukrainian</option>
          <option value="Urdu">Urdu</option>
          <option value="Uzbek">Uzbek</option>
          <option value="Vietnamese">Vietnamese</option>
          <option value="Welsh">Welsh</option>
          <option value="Xhosa">Xhosa</option>
        </select>
      </FormControl>

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
        </Flex>
      </ButtonGroup>

    </div>
  );
};

export default Form1;

