import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles from '../../styles/Widgets';

interface NetworkPorps {
	networks: Network[];
}

interface NetworkItemProps {
	network: Network;
}

function NetworkItem({ network }: NetworkItemProps) {

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
			<Text>Interface: {network.interface}</Text>
			<Text>Bytes sent: {bytesToHumanReadable(network.bytes_sent)}</Text>
			<Text>Bytes received: {bytesToHumanReadable(network.bytes_recv)}</Text>
			<Text>Packets sent: {network.packets_sent}</Text>
			<Text>Packets received: {network.packets_recv}</Text>
		</View>
	);
}

export default function NetworkWidget({ networks }: NetworkPorps) {
	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>Networks:</Text>
			<FlatList 
				data={networks}
				keyExtractor={(network) => network.interface}
				renderItem={({ item }) => (
					<NetworkItem network={item} />
				)}
			/>
		</View>
	);
}