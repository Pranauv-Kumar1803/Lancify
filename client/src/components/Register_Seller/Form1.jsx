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
} from "@chakra-ui/react";

const Form1 = () => {
  const [value, setValue] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

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
          />
        </FormControl>
      </Flex>

      <FormControl mt="5%">
        <FormLabel htmlFor="Description" fontWeight="md">
          Description
        </FormLabel>
        <Textarea
          value={value}
          onChange={handleInputChange}
          placeholder="Professional Description in abt 50-200 words"
          size="sm"
          focusBorderColor="teal.600"
        />
      </FormControl>

      <FormControl mt="5%">
        <FormLabel htmlFor="email" fontWeight="md">
          Profile Pic
        </FormLabel>
        <Input
          type="file"
          onChange={handleFileChange}
          accept=".jpg, .jpeg, .png"
        />
        {error && <Text color="red">{error}</Text>}
        {/* {selectedFile && <Text>Selected File: {selectedFile.name}</Text>} */}
      </FormControl>

      <FormControl mt="5%">
        <Select placeholder="Languages You Speak" focusBorderColor="teal.600" >
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
        </Select>
      </FormControl>

    </div>
  );
};

export default Form1;

