import React, { useState, useEffect } from 'react';
import {
  Box,
  Avatar,
  Heading,
  Text,
  VStack,
  HStack,
  Divider,
  Input,
  Textarea,
  Button,
  Badge,
} from '@chakra-ui/react';
import Data from './mockData.json';
import { useSelector } from 'react-redux';

const ProfilePage = () => {
  const { currentUser } = useSelector((state) => state.user);

  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
    languages: '',
    bio: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    age: '',
  });

  useEffect(() => {
    setProfileData(Data.profile);
    setFormData({
      name: currentUser.username || Data.profile.name,
      email: currentUser.email || Data.profile.email,
      age: String(Data.profile.age),
      languages: Data.profile.languages.join(', '),
      bio: Data.profile.bio,
    });
  }, [currentUser]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelClick = () => {
    setEditMode(false);
    setFormData({
      name: profileData.name,
      email: profileData.email,
      age: String(profileData.age),
      languages: profileData.languages.join(', '),
      bio: profileData.bio,
    });
    setErrors({
      email: '',
      age: '',
    });
  };

  const handleSaveClick = () => {
    const newErrors = {};

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    const ageValue = parseInt(formData.age, 10);
    if (isNaN(ageValue) || ageValue <= 0 || ageValue >= 100) {
      newErrors.age = 'Enter a valid age (1-99)';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setProfileData({
      ...profileData,
      name: formData.name,
      email: formData.email,
      age: ageValue,
      languages: formData.languages.split(',').map((lang) => lang.trim()),
      bio: formData.bio,
    });

    setEditMode(false);
    setErrors({
      email: '',
      age: '',
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setErrors({
      ...errors,
      [e.target.name]: '',
    });
  };

  return (
    <Box p={8} bg="gray.100" rounded="md">
      <VStack spacing={4} align="center">
        {profileData && (
          <>
            <Avatar size="2xl" name={profileData.name} src={`${currentUser.user_img || 'https://via.placeholder.com/150'}`} />

            <Heading size="lg" color="blue.500">
              {formData.name}
            </Heading>
            <Text fontSize="md" color="gray.600">
              {profileData.role}
            </Text>

            <Divider w="100%" borderColor="blue.300" />

            {editMode ? (
              <VStack align="start" spacing={4} w="100%">
                <Input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="filled"
                />
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  variant="filled"
                />
                {errors.email && <Text color="red">{errors.email}</Text>}
                <Input
                  type="number"
                  name="age"
                  placeholder="Age"
                  value={formData.age}
                  onChange={handleChange}
                  variant="filled"
                />
                {errors.age && <Text color="red">{errors.age}</Text>}
                <Input
                  type="text"
                  name="languages"
                  placeholder="Languages (comma-separated)"
                  value={formData.languages}
                  onChange={handleChange}
                  variant="filled"
                />
                <Textarea
                  name="bio"
                  placeholder="Bio"
                  value={formData.bio}
                  onChange={handleChange}
                  variant="filled"
                />
              </VStack>
            ) : (
              <VStack align="start" spacing={4} w="100%">
                <HStack justify="space-between" w="100%">
                  <Text fontWeight="bold" color="gray.700">
                    Email:
                  </Text>
                  <Text>{formData.email}</Text>
                </HStack>

                <HStack justify="space-between" w="100%">
                  <Text fontWeight="bold" color="gray.700">
                    Location:
                  </Text>
                  <Text>{profileData.location}</Text>
                </HStack>

                <HStack justify="space-between" w="100%">
                  <Text fontWeight="bold" color="gray.700">
                    Age:
                  </Text>
                  <Text>{formData.age}</Text>
                </HStack>

                <HStack justify="space-between" w="100%">
                  <Text fontWeight="bold" color="gray.700">
                    Languages:
                  </Text>
                  <HStack spacing={2}>
                    {profileData.languages.map((language, index) => (
                      <Badge key={index} colorScheme="blue">
                        {language}
                      </Badge>
                    ))}
                  </HStack>
                </HStack>

                <HStack justify="space-between" w="100%">
                  <Text fontWeight="bold" color="gray.700">
                    Bio:
                  </Text>
                  <Text>{profileData.bio}</Text>
                </HStack>
              </VStack>
            )}

            {editMode ? (
              <HStack spacing={4}>
                <Button colorScheme="blue" onClick={handleSaveClick}>
                  Save
                </Button>
                <Button colorScheme="gray" onClick={handleCancelClick}>
                  Cancel
                </Button>
              </HStack>
            ) : (
              <Button colorScheme="blue" onClick={handleEditClick}>
                Edit Profile
              </Button>
            )}

            <Divider w="100%" borderColor="blue.300" />
          </>
        )}
      </VStack>
    </Box>
  );
};

export default ProfilePage;
