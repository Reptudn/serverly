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
		<View style={styles.itemContainer}>
			<Text style={WidgetStyles.title}>{network.interface}</Text>

			<Text style={WidgetStyles.text}>Traffic:</Text>
			<Text style={WidgetStyles.text}>Sent: {bytesToHumanReadable(network.bytes_sent)}</Text>
			<Text style={WidgetStyles.text}>Received: {bytesToHumanReadable(network.bytes_recv)}</Text>
			
			<Text style={WidgetStyles.text}>Packets:</Text>
			<Text style={WidgetStyles.text}>Sent: {network.packets_sent}</Text>
			<Text style={WidgetStyles.text}>Received: {network.packets_recv}</Text>
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
				ItemSeparatorComponent={() => <View style={WidgetStyles.separator} />}
				horizontal={true}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	itemContainer: {
		flex: 1,
		padding: 10,
		backgroundColor: '#fff',
		borderRadius: 10,
		margin: 10,
		width: 200,
		height: 200,
		borderColor: '#ccc',
		borderWidth: 1,
		shadowColor: '#000',
	},
});