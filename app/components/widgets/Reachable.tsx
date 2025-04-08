import React from 'react';
import { Text, View } from 'react-native';

// like a red or green circle that shows the status
export default function Reachable({ isReachable }: {isReachable: boolean}) {

	return (
		<View>
			{
				isReachable ? (
					<>
					<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981' }} />
					<Text>Reachable</Text>
					</>
				) : (
					<>
					<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444' }} />
					<Text>Unreachable</Text>
					</>
				)
			}
		</View>
	);
}