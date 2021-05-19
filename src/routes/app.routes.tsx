import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import TriageClient from '../pages/TriageClient';

const App = createStackNavigator();

const AppRoutes: React.FC = () =>{
  return (
  <App.Navigator
    screenOptions={{ headerShown: false}}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="TriageClient" component={TriageClient} />
  </App.Navigator>
  )
};

export default AppRoutes;
