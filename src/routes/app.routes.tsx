import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';

const App = createStackNavigator();
const Drawer = createDrawerNavigator();

const AppRoutes: React.FC = () =>{
  return (
  <App.Navigator
    screenOptions={{ headerShown: false}}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
  </App.Navigator>
  )
};

export default AppRoutes;
