import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';
import { bytesToHuman } from '../../utils/Conversion';

interface DiskProps {
	disk: Disk;
}

export default function DiskUsageWidget({ disk }: DiskProps) {

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>Disk</Text>
			<Text style={WidgetStyles.text}>File System: {disk.filesystem}</Text>
			<Text style={WidgetStyles.text}>Load: {bytesToHuman(disk.used)}/{bytesToHuman(disk.total)} - {disk.used_pct.toPrecision(4)}% used</Text>
			<Text style={WidgetStyles.text}>Free: {bytesToHuman(disk.free)}</Text>
			<ProgressBar progress={(disk.total / disk.used) * 10} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}