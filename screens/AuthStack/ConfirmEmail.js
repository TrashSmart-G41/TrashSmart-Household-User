import { View, Text, Image, Pressable } from 'react-native'
import React from 'react'
import GoBack from '../../components/GoBack'

const ConfirmEmail = ({ navigation }) => {
  return (
    <View className='flex-1'>
        <GoBack navigation={navigation} />
        
        <View className='flex-1 bg-white items-center px-8' >
        
            <Image className=' self-center mt-48'
                    source={require('../../assets/png/confirm_email_arrow.png')}
                    resizeMode="contain"
            />

            <Text className='text-2xl text-black font-bold mt-5' >
                Confirm your email address
            </Text>

            <Text className='text-gray-500 text-base text-center leading-5 mt-2.5' >
                Check your inbox and tap the link{'\n'}in the email we’ve just sent to: 
            </Text>

            <Text className='text-black text-base text-center font-bold leading-5 mt-2.5' >
                some@email.com
            </Text>

            <Pressable onPress={()=> navigation.navigate('CreatePassword')} className='w-full bg-green-500 rounded-xl py-3.5 mt-72 '>
                <Text className='text-white text-base text-center font-semibold'>Open email app</Text>
            </Pressable>

        </View> 
    </View>
  )
}

export default ConfirmEmail