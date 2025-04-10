import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';
import { LineChart } from 'react-native-chart-kit';

interface CpuPercentageProps {
	percentage: number;
}

export function CpuPercentageWidget({ percentage, cacheAmount }: { percentage: number, cacheAmount: number }) {

	const [cpuStats, setCpuStats] = useState<number[]>([]);

	useEffect(() => {
		setCpuStats((prevStats) => {
			// Add the new percentage to the array
			const updatedStats = [...prevStats, percentage];

			// Optionally, limit the array size to cacheAmount
			if (updatedStats.length > cacheAmount) {
				updatedStats.shift(); // Remove the oldest value
			}

			return updatedStats;
		});
	}, [percentage, cacheAmount]);

	const screenWidth = Dimensions.get('window').width;

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>CPU</Text>
			<Text style={WidgetStyles.text}>Current: {percentage.toPrecision(4)}%</Text>
			<LineChart
				data={{
					// labels: Array(cpuStats.length).fill(''), // Empty labels for a clean look
					labels: [],
					datasets: [{ data: cpuStats }],
				}}
				width={screenWidth * 0.83} // Adjust width to fit the container
				height={200}
				chartConfig={{
					backgroundColor: '#38BDF8',
					backgroundGradientFrom: '#0F172A',
					backgroundGradientTo: '#0F172A',
					decimalPlaces: 1, // Show one decimal place
					color: (opacity = 1) => `rgba(20, 184, 166, ${opacity})`, // Line color
					labelColor: () => `rgba(255, 255, 255, 0)`, // Hide labels
					propsForDots: {
						r: '2', // Smaller dots
						strokeWidth: '1',
						stroke: '#1e2923',
					},
				}}
				withDots={false}
				withInnerLines={false}
				withOuterLines={false}
				bezier
				style={{
					marginVertical: 10,
					borderRadius: 15,
					paddingRight: 0,
					padding: 3
				}}
			/>
		</View>
	);
}

export function CpuPercentageWidgetSmall({ percentage }: CpuPercentageProps) {
	return (
		<View>
			<Text style={WidgetStyles.text}>CPU Usage: {percentage.toPrecision(4)}%</Text>
			<ProgressBar progress={percentage} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}