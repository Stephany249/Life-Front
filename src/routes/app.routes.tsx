/* eslint-disable no-use-before-define */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SchedulingCreated from '../pages/SchedulingCreated';
import CreateScheduling from '../pages/CreateScheduling';
import ScreeningStatus from '../pages/ScreeningStatus';
import Dashboard from '../pages/Dashboard';
import TriageClient from '../pages/TriageClient';
import EditOpeningHours from '../pages/EditOpeningHours';
import FirstTriage from '../pages/FirstTriage';
import TriageFriend from '../pages/TriageFriend';
import ReturnTriagePacient from '../pages/ReturnTriagePacient';
import EditSchedule from '../pages/EditSchedule';
import ViewMore from '../pages/ViewMore';
import StartScheduling from '../pages/StartScheduling';

const App = createStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="Dashboard" component={Dashboard} />
      <App.Screen name="TriageClient" component={TriageClient} />
      <App.Screen name="EditOpeningHours" component={EditOpeningHours} />
      <App.Screen name="FirstTriage" component={FirstTriage} />
      <App.Screen name="TriageFriend" component={TriageFriend} />
      <App.Screen name="ScreeningStatus" component={ScreeningStatus} />
      <App.Screen name="CreateScheduling" component={CreateScheduling} />
      <App.Screen name="SchedulingCreated" component={SchedulingCreated} />
      <App.Screen name="ReturnTriagePacient" component={ReturnTriagePacient} />
      <App.Screen name="EditSchedule" component={EditSchedule} />
      <App.Screen name="ViewMore" component={ViewMore} />
      <App.Screen name="StartScheduling" component={StartScheduling} />
    </App.Navigator>
  );
};

export default AppRoutes;
