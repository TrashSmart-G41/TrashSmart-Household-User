import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/TabNavigatorScreens/Home';
import Notifications from '../screens/TabNavigatorScreens/Notifications';
import Header from './Header';
import Truck from '../screens/TabNavigatorScreens/Truck';
import Bins from '../screens/TabNavigatorScreens/Bins';

import { Iconify } from 'react-native-iconify';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <>
      <Header navigation={navigation} />
      <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            padding: 8,
            height: 64,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            paddingBottom: 8,
            fontWeight: 'bold',
          },
          tabBarIcon: ({color}) => {
            let iconSize = 30;

            if (route.name === 'Home') {
              return <Iconify icon={'bx:home'} size={iconSize} color={color} />;
            } else if (route.name === 'Truck') {
              return <Iconify icon={'mingcute:truck-line'} size={iconSize} color={color} />;
            } else if (route.name === 'Bins') {
              return <Iconify icon={'gravity-ui:trash-bin'} size={iconSize-3} color={color} />;
            } else if (route.name === 'Notifications') {
              return <Iconify icon={'mdi:notifications-none'} size={iconSize} color={color} />;
            }
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: 'gray',
        })}
      >
          <Tab.Screen name="Home" component={Home} />
          <Tab.Screen name="Truck" component={Truck} />
          <Tab.Screen name="Bins" component={Bins} />
          <Tab.Screen name="Notifications" component={Notifications} />
      </Tab.Navigator>
    </>
  )
}

export default TabNavigator;