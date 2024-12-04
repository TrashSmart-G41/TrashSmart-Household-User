import { View, Text, Image, TouchableOpacity, Pressable } from 'react-native';
import React, { useContext } from 'react';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const CustomDrawer = (props) => {
  const { navigation } = props;
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Log out using the context
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 px-5">
        <DrawerContentScrollView
          {...props}
          contentContainerStyle={{ backgroundColor: '#FFFFFF' }}
        >
          {/* Header with Logo and Back Button */}
          <View className="flex-row items-center mt-2">
            <TouchableOpacity onPress={() => navigation.closeDrawer()}>
              <Ionicons name="chevron-back" size={30} color="black" />
            </TouchableOpacity>
            <Image
              source={require('../assets/png/logo.png')}
              resizeMode="contain"
              className="flex-1 h-20 w-auto"
            />
          </View>

          {/* Profile Section */}
          <Pressable
            className="flex-row items-center mt-4"
            onPress={() => navigation.navigate('Profile')}
          >
            <Image
              source={require('../assets/png/profile_image.png')}
              resizeMode="contain"
              className="h-10 w-10 mx-2 rounded-full"
            />
            <View className="ml-3">
              <Text className="text-lg text-gray-500 font-medium">
                Siri Perera
              </Text>
              <Text className="text-base text-gray-500 font-normal">
                siriperera@gmail.com
              </Text>
            </View>
            <View className="flex-1 items-end">
              <Ionicons name="chevron-forward" size={30} color="gray" />
            </View>
          </Pressable>

          {/* Drawer Items */}
          <View className="mt-12 px-3">
            <DrawerItemList {...props} />
          </View>
        </DrawerContentScrollView>

        {/* Logout Button */}
        <TouchableOpacity
          className="items-center bg-green-500 rounded-xl py-2 mb-10"
          onPress={handleLogout}
        >
          <Text className="text-lg text-white font-medium">Log Out</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CustomDrawer;