import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';
import ProgressBar from '../utils/ProgressBar';

interface CpuPercentageProps {
	percentage: number;
}

export function CpuPercentageWidget({ percentage }: CpuPercentageProps) {
	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>CPU</Text>
			<Text style={WidgetStyles.text}>Usage: {percentage.toPrecision(4)}%</Text>
			<ProgressBar progress={percentage} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}

export function CpuPercentageWidgetSmall({ percentage }: CpuPercentageProps) {
	return (
		<View>
			<Text>CPU Usage: {percentage.toPrecision(4)}%</Text>
			<ProgressBar progress={percentage} style={{ width: '100%', height: 10, borderRadius: 5 }} />
		</View>
	);
}