import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './routes/HomeScreen';
import ServerDetailsScreen from './routes/ServerDetails';
import DockerStatsScreen from './routes/DockerStats';

import { ParamListBase } from '@react-navigation/native';
import ProcessScreen from './routes/ProcessPage';

export type AppStackParamList = {
    "Server List": undefined;
    "Server Details": { server: Server };
    "Docker Details": { server: Server };
    "Process Details": { server: Server };
};

const Stack = createStackNavigator<AppStackParamList>();

export default function App() {

	return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Server List">
                <Stack.Screen name="Server List" component={HomeScreen} />
                <Stack.Screen name="Server Details" component={ServerDetailsScreen} />
                <Stack.Screen name="Docker Details" component={DockerStatsScreen} />
                <Stack.Screen name="Process Details" component={ProcessScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );

}

