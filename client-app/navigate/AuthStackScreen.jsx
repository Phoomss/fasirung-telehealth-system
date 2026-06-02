import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from '../screens/auth/LoginScreen';
import SignupScreen from '../screens/auth/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import HomeStackScreen from './HomeStackScreen';

const AuthStack = createNativeStackNavigator();

export default function AuthStackScreen() {
    return (
        <AuthStack.Navigator>
            <AuthStack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <AuthStack.Screen
                name="SignUp"
                component={SignupScreen}
                options={{ headerShown: false }}
            />
             <AuthStack.Screen name="HomeStack" component={HomeStackScreen}  options={{ headerShown: false }}/>
        </AuthStack.Navigator>
    );
}
