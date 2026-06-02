import React from 'react'
import HomeScreen from '../screens/HomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BloodTestScreeen from '../screens/BloodTestScreeen'
import ConsultScreen from '../screens/ConsultScreen'
import AssessmentScreen from '../screens/AssessmentScreen'
import ListBookingScreen from '../screens/ListBookingScreen'

export default function HomeStackScreen() {
    const HomeStack = createNativeStackNavigator()

    return (
        <HomeStack.Navigator>
            <HomeStack.Screen
                name="Home"
                component={HomeScreen}
                options={{ headerShown: false }} // Hide header on Home screen
            />
            <HomeStack.Screen
                name="จองคิวเจาะเลือด"
                component={BloodTestScreeen}
                options={{ headerTitleAlign: 'center' }}
            />
            <HomeStack.Screen
                name="จองคิวเข้าปรึกษา"
                component={ConsultScreen}
                options={{ headerTitleAlign: 'center' }}
            />
            <HomeStack.Screen
                name="สรุปรายการนัดหมาย"
                component={ListBookingScreen}
                options={{ headerShown: false }}
            />
            <HomeStack.Screen
                name="แบบประเมินความเสี่ยง"
                component={AssessmentScreen}
                options={{
                    headerTitleAlign: 'center',
                    headerStyle: {
                        backgroundColor: '#69AFEF', // Background color
                        elevation: 0, // Removes shadow on Android
                        shadowOpacity: 0, // Removes shadow on iOS
                    },
                    headerTintColor: '#fff',
                }}
            />
        </HomeStack.Navigator>
    )
}
