import React from 'react';
import { Text, View } from 'react-native';

// like a red or green circle that shows the status
export default function Reachable({ isReachable }: {isReachable: boolean}) {

	return (
		<View>
			{
				isReachable ? (
					<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'green' }} />
				) : (
					<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'red' }} />
				)
			}
		</View>
	);
}