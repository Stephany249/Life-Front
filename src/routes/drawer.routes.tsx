import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Profile from '../pages/Profile';
import AppRoutes from './app.routes';
import CustomDrawerContent from '../components/CustomDrawerContent';

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
    </Drawer.Navigator>
  )
};

export default DrawerRoutes;
