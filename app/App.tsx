import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import ServerBlock from './components/ServerBlock';
import AddServerButton from './components/AddServerButton';

interface Server {
	id: string;
	name: string;
	ip: string;
	port: number;
}

export default function App() {
	const [servers, setServers] = useState<Server[]>([
		{ id: '1', name: 'Server 1', ip: '192.168.1.1', port: 8080 },
		{ id: '2', name: 'Server 2', ip: '192.168.1.2', port: 3000 },
		{ id: '3', name: 'Server 3', ip: '192.168.1.3', port: 5000 },
	]);

	const addServer = (server: Server) => {
		setServers((prevServers) => [...prevServers, server]);
	};

	const deleteServer = (id: string) => {
		setServers((prevServers) => prevServers.filter(server => server.id !== id));
	};

	const editServer = (id: string) => {
		Alert.alert("Edit Server", `You clicked edit on server ID: ${id}`);
	};

	const renderLeftActions = (id: string) => (
		<View style={[styles.actionContainer, { backgroundColor: 'blue' }]}>
			<Text style={styles.actionText} onPress={() => editServer(id)}>✏️ Edit</Text>
		</View>
	);

	const renderRightActions = (id: string) => (
		<View style={[styles.actionContainer, { backgroundColor: 'red' }]}>
			<Text style={styles.actionText} onPress={() => deleteServer(id)}>🗑️ Delete</Text>
		</View>
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={styles.container}>
				<Text style={styles.title}>Your Servers</Text>
				<FlatList
					data={servers}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => (
						<Swipeable
							renderLeftActions={() => renderLeftActions(item.id)}
							renderRightActions={() => renderRightActions(item.id)}
						>
							<ServerBlock name={item.name} ip={item.ip} port={item.port} />
						</Swipeable>
					)}
					ListFooterComponent={<AddServerButton onAddServer={addServer} />}
				/>
			</View>
		</GestureHandlerRootView>
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
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: '100%',
	},
	actionText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
