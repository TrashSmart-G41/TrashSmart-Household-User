import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import GoBack from '../../components/GoBack';
import { Ionicons } from '@expo/vector-icons';

const Address = ({ navigation, route }) => {
  const { firstName, lastName, email } = route.params;

  const [addressLine1, onChangeAddressLine1] = useState('');
  const [addressLine2, onChangeAddressLine2] = useState('');
  const [city, onChangeCity] = useState('');
  const [postalCode, onChangePostalCode] = useState('');
  const [country, onChangeCountry] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);

  const handleContinue = () => {
    let address = addressLine1 + ' ' + addressLine2

    navigation.navigate('CreatePassword', {
        firstName,
        lastName,
        email,
        address,
        city,
        postalCode,
        country,
      })
  }

  return (
    <View className="flex-1 bg-white">
      <GoBack navigation={navigation} />

      <View className="flex-1 px-8 mt-8">
        <Ionicons name="location-outline" size={42} color="lightgray" />

        <Text className="text-black text-2xl font-bold mt-5">Your address</Text>
        <Text className="text-gray-500 text-base leading-5 mt-3">
          Your address is required to ensure accurate and timely waste collection services tailored to your location.
        </Text>

        {/* Address Line 1 */}
        <TextInput
          className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-5 text-base font-light ${
            focusedInput === 'addressLine1' ? 'border-2 border-green-400' : ''
          }`}
          value={addressLine1}
          onChangeText={onChangeAddressLine1}
          placeholder={'Address Line 1'}
          keyboardType={'default'}
          onFocus={() => setFocusedInput('addressLine1')}
          onBlur={() => setFocusedInput(null)}
        />

        {/* Address Line 2 */}
        <TextInput
          className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${
            focusedInput === 'addressLine2' ? 'border-2 border-green-400' : ''
          }`}
          value={addressLine2}
          onChangeText={onChangeAddressLine2}
          placeholder={'Address line 2'}
          keyboardType={'default'}
          onFocus={() => setFocusedInput('addressLine2')}
          onBlur={() => setFocusedInput(null)}
        />

        {/* City */}
        <TextInput
          className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${
            focusedInput === 'city' ? 'border-2 border-green-400' : ''
          }`}
          value={city}
          onChangeText={onChangeCity}
          placeholder={'City'}
          keyboardType={'default'}
          onFocus={() => setFocusedInput('city')}
          onBlur={() => setFocusedInput(null)}
        />

        {/* Postal Code */}
        <TextInput
          className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${
            focusedInput === 'postalCode' ? 'border-2 border-green-400' : ''
          }`}
          value={postalCode}
          onChangeText={onChangePostalCode}
          placeholder={'Postal code'}
          keyboardType={'default'}
          onFocus={() => setFocusedInput('postalCode')}
          onBlur={() => setFocusedInput(null)}
        />

        {/* Country */}
        <TextInput
          className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-3 text-base font-light ${
            focusedInput === 'country' ? 'border-2 border-green-400' : ''
          }`}
          value={country}
          onChangeText={onChangeCountry}
          placeholder={'Country'}
          keyboardType={'default'}
          onFocus={() => setFocusedInput('country')}
          onBlur={() => setFocusedInput(null)}
        />

        {/* Continue Button */}
        <View className="flex-1 justify-end mb-16">
          <Pressable
            onPress={() => handleContinue() }
            className="w-full bg-green-500 rounded-xl py-3"
          >
            <Text className="text-white text-lg text-center font-semibold">Continue</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default Address;
