import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ThemeProvider } from 'styled-components/native';
import { StatusBar } from 'expo-status-bar';
import theme from './src/theme';

import Login from './src/screens/Login';
import List from './src/screens/List';
import Profile from './src/screens/Profile';
import Details from './src/screens/Details';
import { AuthProvider } from './src/contexts/AuthContext'; // Contexto de autenticação

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <StatusBar style="auto" />
      <AuthProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Auth" component={AuthScreen} />
          </Stack.Navigator>
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}
