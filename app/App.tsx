import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './routes/HomeScreen';
import ServerDetailsScreen from './routes/ServerDetails';

const Stack = createStackNavigator();

export default function App() {

	return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Server List">
                <Stack.Screen name="Server List" component={HomeScreen} />
                <Stack.Screen name="Server Details" component={ServerDetailsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}

