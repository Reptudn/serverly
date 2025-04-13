import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ServerBlock from '../components/ServerBlock';
import AddServerButton from '../components/AddServerButton';
import WidgetStyles, { PageStyles } from '../styles/Widgets';

export default function HomeScreen({ navigation }: any) {
	const [servers, setServers] = useState<Server[]>([]);

	// Load servers from AsyncStorage when the component mounts
	useEffect(() => {
		const loadServers = async () => {
			try {
				const storedServers = await AsyncStorage.getItem('servers');
				if (storedServers) {
					setServers(JSON.parse(storedServers));
				}
			} catch (error) {
				console.error('Failed to load servers:', error);
			}
		};

		loadServers();
	}, []);

	// Save servers to AsyncStorage whenever the array changes
	const saveServers = async (newServers: Server[]) => {
		try {
			await AsyncStorage.setItem('servers', JSON.stringify(newServers));
		} catch (error) {
			console.error('Failed to save servers:', error);
		}
	};

	const addServer = (server: Server) => {
		const updatedServers = [...servers, server];
		setServers(updatedServers);
		saveServers(updatedServers); // Save to AsyncStorage
	};

	const deleteServer = (id: string) => {
		const updatedServers = servers.filter((server) => server.id !== id);
		setServers(updatedServers);
		saveServers(updatedServers); // Save to AsyncStorage
		Alert.alert('Deleted server with id:', id);
	};

	const editServer = (id: string) => {
		Alert.alert('Edit Server', `You clicked edit on server ID: ${id}`);
	};

	const renderLeftActions = (id: string) => (
		<View style={[styles.actionContainer, { backgroundColor: 'blue' }]}>
			<Text style={styles.actionText} onPress={() => editServer(id)}>
				✏️ Edit
			</Text>
		</View>
	);

	const renderRightActions = (id: string) => (
		<View style={[styles.actionContainer, { backgroundColor: 'red' }]}>
			<Text style={styles.actionText} onPress={() => deleteServer(id)}>
				🗑️ Delete
			</Text>
		</View>
	);

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<View style={PageStyles.background}>
				{servers.length > 0 ? (
					<FlatList
						data={servers}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<Swipeable
								renderLeftActions={() => renderLeftActions(item.id)}
								renderRightActions={() => renderRightActions(item.id)}
							>
								<ServerBlock
									name={item.name}
									ip={item.ip}
									port={item.port}
									password={item.password}
									onpress={() => navigation.navigate('Server Details', { server: item as Server })}
								/>
							</Swipeable>
						)}
						ListFooterComponent={<AddServerButton onAddServer={addServer} />}
					/>
				) : (
					<View style={noServersStyles.container}>
						<Text style={WidgetStyles.title}>No Servers added yet :c</Text>
						<Text style={WidgetStyles.text}>Click the button below to add a server.</Text>
						<AddServerButton onAddServer={addServer} />
					</View>
				)}
			</View>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#0F172A',
		padding: 20,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: 100,
		height: '50%',
		borderRadius: 42,
		backgroundColor: '#1E293B'
	},
	actionText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

const noServersStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		gap: 10
	}
}); 