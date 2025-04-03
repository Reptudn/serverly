import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';

interface DiskProps {
	disk: Disk;
}

export default function DiskUsageWidget({ disk }: DiskProps) {

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
			<Text style={WidgetStyles.title}>Disk</Text>
			<Text style={WidgetStyles.text}>File System: {disk.filesystem}</Text>
			<Text style={WidgetStyles.text}>Load: {bytesToHumanReadable(disk.used)}/{bytesToHumanReadable(disk.total)} - {disk.used_pct.toPrecision(4)}% used</Text>
			<Text style={WidgetStyles.text}>Free: {bytesToHumanReadable(disk.free)}</Text>
			<ProgressBar progress={(disk.total / disk.used) * 10} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}