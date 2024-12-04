import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GetStarted from '../screens/AuthStack/GetStarted';
import LoginOrSignup from '../screens/AuthStack/LoginOrSignup';
import SignUpPhone from '../screens/AuthStack/LoginPhone';
import ConfirmPhone from '../screens/AuthStack/ConfirmPhone';
import CreatePassword from '../screens/AuthStack/CreatePassword';
import SuccessPhone from '../screens/AuthStack/SuccessPhone';
import SuccessEmail from '../screens/AuthStack/SuccessEmail';
import DetailsPhone from '../screens/AuthStack/DetailsPhone';
import DetailsEmail from '../screens/AuthStack/DetailsEmail';
import Address from '../screens/AuthStack/Address';
import ProfilePhoto from '../screens/AuthStack/ProfilePhoto';
import Notifications from '../screens/AuthStack/Notifications';
import SignUpEmail from '../screens/AuthStack/LoginEmail';
import ConfirmEmail from '../screens/AuthStack/ConfirmEmail';
import ResetPassword from '../screens/AuthStack/ResetPassword';

const Stack = createNativeStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="GetStarted">
      <Stack.Screen name="GetStarted" component={GetStarted} />
      <Stack.Screen name="LoginOrSignup" component={LoginOrSignup} />
      <Stack.Screen name="SignUpPhone" component={SignUpPhone} />
      <Stack.Screen name="ConfirmPhone" component={ConfirmPhone} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />
      <Stack.Screen name="SuccessPhone" component={SuccessPhone} />
      <Stack.Screen name="SuccessEmail" component={SuccessEmail} />
      <Stack.Screen name="DetailsPhone" component={DetailsPhone} />
      <Stack.Screen name="DetailsEmail" component={DetailsEmail} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="ProfilePhoto" component={ProfilePhoto} />
      <Stack.Screen name="Notifications" component={Notifications} />
      <Stack.Screen name="SignUpEmail" component={SignUpEmail} />
      <Stack.Screen name="ConfirmEmail" component={ConfirmEmail} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}
