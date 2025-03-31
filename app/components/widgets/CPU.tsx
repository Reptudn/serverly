import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';

interface CpuPercentageProps {
	percentage: number;
}

export function CpuPercentageWidget({ percentage }: CpuPercentageProps) {
	return (
		<View style={WidgetStyles.container}>
			<Text>CPU Usage: {percentage.toPrecision(4)}%</Text>
		</View>
	);
}

export function CpuPercentageWidgetSmall({ percentage }: CpuPercentageProps) {
	return (
		<View>
			<Text>CPU Usage: {percentage.toPrecision(4)}%</Text>
		</View>
	);
}