import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Dashboard from '../pages/Dashboard';
import TriageClient from '../pages/TriageClient';
import EditOpeningHours from '../pages/EditOpeningHours';
import FirstTriage from '../pages/FirstTriage';

const App = createStackNavigator();

const AppRoutes: React.FC = () =>{
  return (
  <App.Navigator
    screenOptions={{ headerShown: false}}
  >
    <App.Screen name="Dashboard" component={Dashboard} />
    <App.Screen name="TriageClient" component={TriageClient} />
    <App.Screen name="EditOpeningHours" component={EditOpeningHours} />
    <App.Screen name="FirstTriage" component={FirstTriage} />
  </App.Navigator>
  )
};

export default AppRoutes;
