import { View, Text, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { FontAwesome6 } from '@expo/vector-icons';
import GoBack from '../../components/GoBack';

const Details = ({ navigation }) => {
    const [firstName, onChangeFirstName] = useState('');
    const [lastName, onChangeLastName] = useState('');
    const [email, onChangeEmail] = useState('');
    const [alert, setAlert] = useState(false);  // State to manage alert visibility
    const [focusedInput, setFocusedInput] = useState(null);

    const handleContinue = () => {
        // Check if all required fields are filled
        if (firstName !== '' && lastName !== '' && email !== '') {
            // Navigate to Address screen if fields are filled
            navigation.navigate('Address', {
                firstName,
                lastName,
                email,
            });
        } else {
            // Show alert if fields are not filled
            setAlert(true);
        }
    };

    const handleInputChange = (setter) => (value) => {
        setter(value);
        // Hide alert when user starts typing
        setAlert(false);
    };

    return (
        <View className="flex-1 bg-white">
            <View className="flex-1 px-8 mt-24">
                <FontAwesome6 name="contact-card" size={36} color="lightgray" />
                <Text className="text-black text-2xl font-bold mt-5">Your details</Text>
                <Text className="text-gray-500 text-base leading-5 mt-3">
                    Please provide your personal details to continue. This information will help us to create your account and personalize your experience.
                </Text>

                {/* Display error message if fields are not filled */}
                {alert && (
                    <Text className="text-red-600 text-base font-semibold mt-3">
                        Please fill in all the fields
                    </Text>
                )}

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-5 text-base font-light ${focusedInput === 'firstName' ? 'border-2 border-green-400' : ''}`}
                    value={firstName}
                    onChangeText={handleInputChange(onChangeFirstName)}
                    placeholder="First name"
                    keyboardType="default"
                    onFocus={() => setFocusedInput('firstName')}
                    onBlur={() => setFocusedInput(null)}
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'lastName' ? 'border-2 border-green-400' : ''}`}
                    value={lastName}
                    onChangeText={handleInputChange(onChangeLastName)}
                    placeholder="Last name"
                    keyboardType="default"
                    onFocus={() => setFocusedInput('lastName')}
                    onBlur={() => setFocusedInput(null)}
                />

                <TextInput
                    className={`w-full bg-gray-200 rounded-xl py-3 px-4 mt-4 text-base font-light ${focusedInput === 'email' ? 'border-2 border-green-400' : ''}`}
                    value={email}
                    onChangeText={handleInputChange(onChangeEmail)}
                    placeholder="Email"
                    keyboardType="default"
                    onFocus={() => setFocusedInput('email')}
                    onBlur={() => setFocusedInput(null)}
                />

                <View className="flex-1 justify-end mb-16">
                    <Pressable onPress={handleContinue} className="w-full bg-green-500 rounded-xl py-3.5">
                        <Text className="text-white text-lg text-center font-semibold">Continue</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
};

export default Details;
