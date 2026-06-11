import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import MainTabNavigator from './TabNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;