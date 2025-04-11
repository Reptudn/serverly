import React, { useState } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import WidgetStyles, { ButtonStyles, TextStyles } from '../styles/Widgets';

interface AddServerButtonProps {
	onAddServer: (server: { id: string; name: string; ip: string; port: number }) => void;
}

export default function AddServerButton({ onAddServer }: AddServerButtonProps) {
	const [modalVisible, setModalVisible] = useState(false);
	const [name, setName] = useState('');
	const [ip, setIp] = useState('');
	const [port, setPort] = useState('');
	const [password, setPassword] = useState('');

	const handleAddServer = () => {
		const isValidIp = (ip: string) =>
			/^((25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[0-1]?[0-9][0-9]?)$/.test(ip);
		const portNumber = parseInt(port, 10);

		if (name && isValidIp(ip) && port && portNumber >= 0 && portNumber <= 65535) {
			onAddServer({
				id: Date.now().toString(), // Generate a unique ID
				name,
				ip,
				port: portNumber,
			});
			setName('');
			setIp('');
			setPort('');
			setModalVisible(false);
		} else {
			Alert.alert('Invalid Input', 'Please enter a valid IP address and port number (0–65535).');
		}
	};

	return (
		<View>
			<TouchableOpacity onPress={() => setModalVisible(true)} style={ButtonStyles.primary}>
				<Text style={WidgetStyles.title}>+ Add Server</Text>
			</TouchableOpacity>
			<Modal
				visible={modalVisible}
				animationType="slide"
				transparent={true}
				onRequestClose={() => setModalVisible(false)}
			>
				<View style={styles.modalContainer}>
					<View style={WidgetStyles.container}>
						<Text style={WidgetStyles.title}>Add New Server</Text>
						<TextInput
							style={styles.input}
							placeholder="Server Name"
							value={name}
							onChangeText={setName}
						/>
						<TextInput
							style={styles.input}
							placeholder="IP Address / URL"
							value={ip}
							onChangeText={setIp}
						/>
						<TextInput
							style={styles.input}
							placeholder="Port"
							value={port}
							keyboardType="numeric"
							onChangeText={setPort}
						/>
						<TextInput
							style={styles.input}
							placeholder="Password (optional)"
							value={password}
							onChangeText={setPassword}
						/>
						<View style={styles.buttonContainer}>
							<Button title="Cancel" onPress={() => setModalVisible(false)} />
							<Button title="Add" onPress={handleAddServer} />
						</View>
					</View>
				</View>
			</Modal>
		</View>
	);
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
	modalContent: {
		width: '80%',
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	},
	modalTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	input: {
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 5,
		padding: 10,
		marginBottom: 10,
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
});