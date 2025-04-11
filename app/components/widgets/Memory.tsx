import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';
import { bytesToHuman } from '../../utils/Conversion';
import { LineChart } from 'react-native-chart-kit';

interface MemoryProps {
	memory: Memory;
}


export default function MemoryUsageWidget({ memory, cacheAmount }: { memory: Memory, cacheAmount: number }) {

	const [memoryStats, setMemoryStats] = useState<number[]>([]);
	useEffect(() => {
		setMemoryStats((prevStats) => {
			// Add the new memory percentage to the array
			const updatedStats = [...prevStats, memory.used_pct];

			// Limit the array size to cacheAmount
			if (updatedStats.length > cacheAmount) {
				updatedStats.shift(); // Remove the oldest value
			}

			return updatedStats;
		});
	}, [memory.used_pct]);

	const screenWidth = Dimensions.get('window').width;

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>RAM / Memory</Text>
			<Text style={WidgetStyles.text}>{bytesToHuman(memory.used)}/{bytesToHuman(memory.total)} - {memory.used_pct.toFixed(2)}%</Text>
			<LineChart
				data={{
					labels: [], // Empty labels for a clean look
					datasets: [{ data: memoryStats }],
				}}
				width={screenWidth * 0.83} // Adjust width to fit the container
				height={200}
				chartConfig={{
					backgroundColor: '#38BDF8',
					backgroundGradientFrom: '#0F172A',
					backgroundGradientTo: '#0F172A',
					decimalPlaces: 1, // Show one decimal place
					color: (opacity = 1) => `rgba(20, 184, 166, ${opacity})`, // Line color
					labelColor: () => `rgba(255, 255, 255, 0)`, // Fully transparent labels
					propsForDots: {
						r: '2', // Smaller dots
						strokeWidth: '1',
						stroke: '#1e2923',
					},
				}}
				withDots={false} // Disable dots for a cleaner line
				withInnerLines={false} // Disable grid lines
				withOuterLines={false} // Disable outer grid lines
				bezier // Smooth the line
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

export function MemoryUsageSmall({ memory }: MemoryProps) {

	return (
		<View>
			<Text style={WidgetStyles.text}>Memory: {memory.used_pct.toPrecision(4)}%</Text>
			<ProgressBar progress={memory.used_pct} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}