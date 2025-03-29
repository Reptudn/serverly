import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import ServerBlock from './components/ServerBlock';
import AddServerButton from './components/AddServerButton';

export default function App() {
	const [servers, setServers] = useState([
		{ id: '1', name: 'Server 1', ip: '192.168.1.1', port: 8080 },
		{ id: '2', name: 'Server 2', ip: '192.168.1.2', port: 3000 },
		{ id: '3', name: 'Server 3', ip: '192.168.1.3', port: 5000 },
	]);

	const addServer = (server: { id: string; name: string; ip: string; port: number }) => {
		setServers((prevServers) => [...prevServers, server]);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Your Servers</Text>
			<FlatList
				data={servers}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => (
					<ServerBlock name={item.name} ip={item.ip} port={item.port} />
				)}
				ListFooterComponent={<AddServerButton onAddServer={addServer} />}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
		marginTop: 30,
	},
});