import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ForgoutPassword from '../pages/ForgoutPassword';
import ResetPassword from '../pages/ResetPassword';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => {
  return (
  <Auth.Navigator
    screenOptions={{ headerShown: false}}
  >
    <Auth.Screen name="SignIn" component={SignIn} />
    <Auth.Screen name="SignUp" component={SignUp} />
    <Auth.Screen name="ForgoutPassword" component={ForgoutPassword} />
    <Auth.Screen name="ResetPassword" component={ResetPassword} />
  </Auth.Navigator>
)};

export default AuthRoutes;
