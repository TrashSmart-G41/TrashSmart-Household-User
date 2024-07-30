import { View, Text, Pressable, TextInput, KeyboardAvoidingView } from 'react-native';
import React, { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import GoBack from '../../components/GoBack';

const CreatePassword = ({ navigation }) => {
    const [password, onChangePassword] = useState('');
    const [confirmPassword, onChangeConfirmPassword] = useState('');
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);

    const validationRules = {
        length: password.length >= 8 && password.length <= 32,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        specialChar: /[!@#$%^&*]/.test(password),
    };

    const allValid = Object.values(validationRules).every(Boolean) && password === confirmPassword;

    return (
        <View className='flex-1 bg-white'>
            <GoBack navigation={navigation} />

            <View className='px-8 mt-16'>
                <Ionicons name="lock-closed-outline" size={36} color="lightgray" />
                <Text className='text-2xl font-bold mt-3'>Create password</Text>
                <Text className='text-base text-gray-600 mt-1'>Your new password must meet the criteria below for enhanced security.</Text>

                <KeyboardAvoidingView>
                    <View className={`flex-row items-center border-2 ${password && !allValid ? 'border-red-500' : 'border-gray-200'} rounded-xl pl-5 pr-10 py-2.5 mt-5`}>
                        <TextInput
                            className='w-full text-base'
                            value={password}
                            onChangeText={onChangePassword}
                            placeholder='New Password'
                            keyboardType='default'
                            secureTextEntry={!passwordVisible}
                        />
                        <Pressable onPress={() => setPasswordVisible(!passwordVisible)}>
                            <Ionicons name={passwordVisible ? 'eye-off' : 'eye'} size={22} color={!allValid ? '#EF4144' : 'gray'} />
                        </Pressable>
                    </View>
                    {password && !allValid && (
                        <Text className='text-red-500 text-sm mt-1'>Please ensure your password meets all criteria.</Text>
                    )}

                    <View className='mt-4 px-2 mb-2'>
                        <Text className='text-black text-base font-medium'>
                            Your password must include:
                        </Text>
                        <ValidationItem isValid={validationRules.length} text='8-32 characters long' />
                        <ValidationItem isValid={validationRules.lowercase} text='1 lowercase character (a-z)' />
                        <ValidationItem isValid={validationRules.uppercase} text='1 uppercase character (A-Z)' />
                        <ValidationItem isValid={validationRules.number} text='1 number' />
                        <ValidationItem isValid={validationRules.specialChar} text='1 special character e.g. ! @ # $ %' />
                    </View>
                </KeyboardAvoidingView>

                <KeyboardAvoidingView>
                <View className={`flex-row items-center border-2 ${confirmPassword && password !== confirmPassword ? 'border-red-500' : 'border-gray-200'} rounded-xl pl-5 pr-10 py-2.5 mt-4`}>
                    <TextInput
                        className='w-full text-base'
                        value={confirmPassword}
                        onChangeText={onChangeConfirmPassword}
                        placeholder='Confirm Password'
                        keyboardType='default'
                        secureTextEntry={!confirmPasswordVisible}
                    />
                    <Pressable onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}>
                        <Ionicons name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={22} color={!allValid ? '#EF4144' : 'gray'} />
                    </Pressable>
                </View>
                {confirmPassword && password !== confirmPassword && (
                    <Text className='text-red-500 text-sm mt-1'>Passwords do not match.</Text>
                )}
                </KeyboardAvoidingView>

                <Pressable
                    onPress={() => navigation.navigate('SuccessEmail')}
                    className={`w-full rounded-xl py-3.5 mt-8 ${allValid ? 'bg-green-500' : 'bg-gray-300'}`}
                    disabled={!allValid}
                >
                    <Text className='text-white text-lg text-center font-semibold'>Continue</Text>
                </Pressable>
            </View>
        </View>
    );
};

const ValidationItem = ({ isValid, text }) => (
    <View className='flex-row items-center space-x-1 mt-1'>
        <Ionicons name={isValid ? 'checkmark-sharp' : 'close-sharp'} size={18} color={isValid ? '#22C55E' : 'gray'} />
        <Text className='text-black text-sm font-normal'>{text}</Text>
    </View>
);

export default CreatePassword;
