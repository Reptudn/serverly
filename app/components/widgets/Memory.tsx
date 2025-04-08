import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';
import { bytesToHuman } from '../../utils/Conversion';

interface MemoryProps {
	memory: Memory;
}


export default function MemoryUsageWidget({ memory }: MemoryProps) {

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>RAM / Memory</Text>
			<Text style={WidgetStyles.text}>{bytesToHuman(memory.used)}/{bytesToHuman(memory.total)} - {memory.used_pct.toPrecision(4)}%</Text>
			<ProgressBar progress={memory.used_pct} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}

export function MemoryUsageSmall({ memory }: MemoryProps) {

	return (
		<View>
			<Text>Memory: {memory.used_pct.toPrecision(4)}%</Text>
			<ProgressBar progress={memory.used_pct} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}