import React from 'react';
import { Text, View } from 'react-native';

// like a red or green circle that shows the status
export default function Reachable(isReachable: boolean) {

    return (
        <View>
            {
                isReachable ? (
                    <Text>Reachable</Text>
                ) : (
                    <Text>Not Reachable</Text>
                )
            }
        </View>
    );
}