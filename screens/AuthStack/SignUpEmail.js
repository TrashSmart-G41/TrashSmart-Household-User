import { View, Text, Image, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const SignUpEmail = ({ navigation }) => {
    const [email, OnChangeEmail] = useState('');

  return (
    <View className='flex-1 bg-white' >
      <Image className=' self-center mt-16'
            source={require('../../assets/png/logo.png')}
            resizeMode="contain"
        />

        <View className='items-center px-8 pt-24' >
            <Text className='text-xl font-bold' >
                Enter your email address
            </Text>

            <TextInput
                className='w-full bg-gray-100 border-2 border-gray-200 rounded-lg px-5 py-1.5 mt-6 
                            text-base'
                value={email}
                onChangeText={OnChangeEmail}
                placeholder={'sample@domain.com'}
                keyboardType={'default'}
            />

            <Pressable className='self-start mt-1' onPress={()=> navigation.navigate('ResetPassword')} >
                <Text className='text-sm text-black font-medium ml-2' >Forgot Password?</Text>
            </Pressable>
            
            <Pressable onPress={()=> navigation.navigate('ConfirmEmail')} className='w-full h-11 justify-center bg-green-500 rounded-lg py-2.5 mt-5'>
                <Text className='text-white text-base text-center font-semibold'>Continue</Text>
            </Pressable>


            <View className='flex-row items-center mt-8' >
                <View className='flex-1 h-0.5 bg-gray-200 ' />
                <Text className='text-sm text-gray-500 mx-4' >
                    or continue with
                </Text>
                <View className='flex-1 h-0.5 bg-gray-200' />
            </View>

            <Pressable onPress={()=> navigation.navigate('SignUpEmail')} className='w-full h-11 justify-center bg-gray-200 rounded-lg py-2.5 mt-8'>
                <View className='flex-row items-center justify-center space-x-2' >
                    <Image source={require('../../assets/png/googleIcon.png')} resizeMode="contain" />
                    <Text className='inline text-base text-gray-500 font-semibold'>Google</Text>
                </View>
            </Pressable>

            <Text className='text-sm text-gray-500 text-center leading-5 mt-10'>
                By clicking continue, you agree to our <Text className='font-bold text-black'>Terms of Service and Privacy Policy</Text>
            </Text>

        </View>
    </View>
  )
}

export default SignUpEmail