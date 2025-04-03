import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';

interface MemoryProps {
	memory: Memory;
}


export default function MemoryUsageWidget({ memory }: MemoryProps) {

	const bytesToHumanReadable = (bytes: number): string => {
		const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB'];
		let unitIndex = 0;

		while (bytes >= 1024 && unitIndex < units.length - 1) {
			bytes /= 1024;
			unitIndex++;
		}

		return `${bytes.toFixed(2)} ${units[unitIndex]}`;
	};

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>RAM / Memory</Text>
			<Text style={WidgetStyles.text}>{bytesToHumanReadable(memory.used)}/{bytesToHumanReadable(memory.total)} - {memory.used_pct.toPrecision(4)}%</Text>
			<ProgressBar progress={memory.used_pct} style={{ width: '100%', height: 10, borderRadius: 5 }} />
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