import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import GetStarted from './screens/AuthStack/GetStarted';
import SignUpPhone from './screens/AuthStack/SignUpPhone';
import ConfirmPhone from './screens/AuthStack/ConfirmPhone';
import Address from './screens/AuthStack/Address';
import ProfilePhoto from './screens/AuthStack/ProfilePhoto';
import Notifications from './screens/AuthStack/Notifications';
import DrawerNavigator from './components/DrawerNavigator';
import Profile from './screens/Profile';
import LoginOrSignup from './screens/AuthStack/LoginOrSignup';
import ConfirmEmail from './screens/AuthStack/ConfirmEmail';
import ResetPassword from './screens/AuthStack/ResetPassword';
import SignUpEmail from './screens/AuthStack/SignUpEmail';
import CreatePassword from './screens/AuthStack/CreatePassword';
import DetailsPhone from './screens/AuthStack/DetailsPhone';
import DetailsEmail from './screens/AuthStack/DetailsEmail';
import SuccessPhone from './screens/AuthStack/SuccessPhone';
import SuccessEmail from './screens/AuthStack/SuccessEmail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <SafeAreaView className='flex-1 bg-white'>
        <Stack.Navigator screenOptions={ {headerShown: false} } initialRouteName="GetStarted">
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
          <Stack.Screen name="HomeScreen" component={DrawerNavigator} />
          <Stack.Screen name="Profile" component={Profile} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
}
