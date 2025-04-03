import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';

interface ProgressBarProps {
	progress: number;
	style?: ViewStyle;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style }) => {
const percentage = Math.min(Math.max(progress, 0), 100);

	return (
		<View style={[styles.container, style]}>
			<View
				style={[
					styles.bar,
					{
						width: `${percentage}%`,
						backgroundColor: `rgb(${Math.min(255, (percentage / 100) * 255)}, ${Math.max(0, 255 - (percentage / 100) * 255)}, 0)`,
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
container: {
	height: 20,
	width: '100%',
	backgroundColor: '#e0e0e0',
	borderRadius: 10,
	overflow: 'hidden',
},
bar: {
	height: '100%',
},
});

export default ProgressBar;
