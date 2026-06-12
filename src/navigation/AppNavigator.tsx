import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './TabNavigator';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../features/auth/LoginScreen';
import SignupScreen from '../features/auth/RegisterScreen';
import { useAuthStore } from '../store/useAuthStore';

export type RootStackParamlist = {
  login: undefined;
  register: undefined;
  main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamlist>();

const AppNavigator = () => {
  const { loadAuth, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const init = async () => {
      await loadAuth();
      setIsLoading(false);
    };

    init();
  }, []);

  if (isLoading) {
    return null; // or splash screen
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <Stack.Screen name="main" component={MainTabNavigator} />
        ) : (
          <>
            <Stack.Screen name="login" component={LoginScreen} />
            <Stack.Screen name="register" component={SignupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
