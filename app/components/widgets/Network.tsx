import React, { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import WidgetStyles, { PageStyles } from '../../styles/Widgets';
import { bytesToHuman } from '../../utils/Conversion';

interface NetworkPorps {
	networks: Network[];
}

interface NetworkItemProps {
	network: Network;
}

function NetworkItem({ network }: NetworkItemProps) {

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>{network.interface}</Text>
			<View style={WidgetStyles.separator} />
			<Text style={WidgetStyles.text}>Traffic:</Text>
			<Text style={WidgetStyles.text}>Sent: {bytesToHuman(network.bytes_sent)}</Text>
			<Text style={WidgetStyles.text}>Received: {bytesToHuman(network.bytes_recv)}</Text>
			<View style={WidgetStyles.separator} />
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
		height: 'auto',
		borderColor: '#ccc',
		borderWidth: 1,
		shadowColor: '#000',
	},
});