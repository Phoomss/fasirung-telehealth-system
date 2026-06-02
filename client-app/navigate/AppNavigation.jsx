import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeStackScreen from './HomeStackScreen';
import KnowledgeScreen from '../screens/KnowledgeScreen';
import SettingScreen from '../screens/SettingScreen';
import { useAuth } from '../context/AuthProvider';
import AuthStackScreen from './AuthStackScreen';
import SettingStackScreen from './SettingStackScreen';
import KnowledgeStackScreen from './KnowledgeStackScreen';
import Loading from '../components/Loading';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        // Tab Navigator for authenticated users
        <Tab.Navigator
          initialRouteName="Home"
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'สาระน่ารู้') {
                iconName = focused ? 'book' : 'book-outline';
              } else if (route.name === 'Setting') {
                iconName = focused ? 'settings' : 'settings-outline';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#ffff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: {
              backgroundColor: '#69AFEF',
              paddingBottom: 5,
              height: 60,
            },
            tabBarLabelStyle: {
              fontSize: 12,
              fontWeight: '600',
            },
          })}
        >
          <Tab.Screen name="Home" component={HomeStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name="สาระน่ารู้" component={KnowledgeStackScreen} options={{ headerShown: false }} />
          <Tab.Screen name="Setting" component={SettingStackScreen} options={{ headerShown: false }} />
        </Tab.Navigator>
      ) : (
        // Stack Navigator for unauthenticated users
        <Stack.Navigator initialRouteName="AuthStackScreen">
          <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
