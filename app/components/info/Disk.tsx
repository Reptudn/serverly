import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface DiskProps {
	disk: Disk;
}

export default function DiskUsage({ disk }: DiskProps) {

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
		<View>
			<Text>File System: {disk.filesystem}</Text>
			<Text>Load: {bytesToHumanReadable(disk.used)}/{bytesToHumanReadable(disk.total)} - {disk.used_pct.toPrecision(4)}% used</Text>
			<Text>Free: {bytesToHumanReadable(disk.free)}</Text>
		</View>
	);
}