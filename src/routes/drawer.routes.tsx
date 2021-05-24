import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from '../components/CustomDrawerContent';

import AppRoutes from './app.routes';

import Profile from '../pages/Profile';
import OpeningHours from '../pages/OpeningHours';

const Drawer = createDrawerNavigator();

const DrawerRoutes: React.FC = () =>{
  return (
    <Drawer.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        headerShown: false,
      }}
      drawerContent={props => <CustomDrawerContent {...props}/>}
      drawerStyle={{ width: '80%' }}
    >
      <Drawer.Screen name ="Home" component={AppRoutes}  />
      <Drawer.Screen name="Profile" component={Profile} />
      <Drawer.Screen name="OpeningHours" component={OpeningHours} />
    </Drawer.Navigator>
  )
};

export default DrawerRoutes;
