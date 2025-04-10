import React from 'react';
import { Text, View } from 'react-native';

// like a red or green circle that shows the status
export default function Reachable({ isReachable }: {isReachable: boolean}) {

	return (
		<View style={{
				flex: 1,
				flexDirection: 'row',
				width: 100
			}}
		>
			{
				isReachable ? (
					<>
					<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#10B981', marginTop: 5 }} />
					<Text style={{color: '#10B981', marginLeft: 5}}>Reachable</Text>
					</>
				) : (
					<>
					<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444', marginTop: 5 }} />
					<Text style={{color: '#EF4444', marginLeft: 5}}>Unreachable</Text>
					</>
				)
			}
		</View>
	);
}