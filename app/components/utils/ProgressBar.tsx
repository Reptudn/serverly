import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface ProgressBarProps {
	progress: number;
	style?: ViewStyle;
}

// XXX: DOESNT WORK

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, style }) => {
const percentage = Math.min(Math.max(progress, 0), 100);

	return (
		<View style={[styles.container, style]}>
			<LinearGradient
				colors={['#4CAF50', '#FFA500', '#FF0000']}
				start={{x: 0, y: 0}}
				end={{x: 1, y: 0}}
				style={[styles.bar, { width: `${percentage}%` }]}
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
