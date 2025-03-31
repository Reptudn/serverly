import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

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
        <>
            <Text>Memory:</Text>
            <Text>{bytesToHumanReadable(memory.used)}/{bytesToHumanReadable(memory.total)} - {memory.used_pct.toPrecision(4)}%</Text>
        </>
    );
}

export function MemoryUsageSmall({ memory }: MemoryProps) {

    return (
        <>
            <Text>Memory: {memory.used_pct.toPrecision(4)}%</Text>
        </>
    );
}