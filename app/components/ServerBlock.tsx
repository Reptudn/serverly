import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ServerBlock({ name, ip, port }: { name: string; ip: string; port: number }) {
	const [isReachable, setReachable] = useState(false);
	const [status, setStatus] = useState(null);

	useEffect(() => {
		let isMounted = true; // To prevent state updates on unmounted components

		const fetchStatus = async () => {
			const data = await getServerStatus(ip, port);
			if (isMounted) {
				if (data) {
					setReachable(true);
					setStatus(data);
				} else {
					setReachable(false);
				}
			}
		};

		const fetchContinuously = async () => {
			while (isMounted) {
				await fetchStatus(); // Wait for the current fetch to complete
				await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait 5 seconds before the next fetch
			}
		};

		fetchContinuously();

		return () => {
			isMounted = false; // Cleanup to stop fetching when the component unmounts
		};
	}, [ip, port]);

	return (
		<View style={styles.container}>
			<Text style={styles.name}>{name}</Text>
			<Text style={styles.details}>IP: {ip}</Text>
			<Text style={styles.details}>Port: {port}</Text>
			<Text style={styles.details}>Reachable: {isReachable ? 'Yes' : 'No'}</Text>
			{status ? (
				<Text style={styles.details}>Status: {JSON.stringify(status)}</Text>
			) : (
				<Text style={styles.details}>No status.</Text>
			)}
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#f9f9f9',
		borderWidth: 1,
		borderColor: '#ddd',
		borderRadius: 5,
	},
	name: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	details: {
		fontSize: 14,
		color: '#555',
	},
});

const getServerStatus = async (ip: string, port: number) => {
	try {
		const endpoint = `http://${ip}:${port}/status`;

		// Timeout after 10 seconds
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Network request timed out')), 10000)
		);

		const response: any = await Promise.race([fetch(endpoint), timeout]);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		return await response.json();
	} catch (error) {
		console.error('Failed to fetch server status:', error);
		return null;
	}
};