import React, { useEffect, useState } from 'react';
import { Text, StyleSheet, TouchableOpacity, View } from 'react-native';
import { CpuPercentageWidgetSmall } from './widgets/CPU';
import { MemoryUsageSmall } from './widgets/Memory';
import Reachable from './widgets/Reachable';
import WidgetStyles from '../styles/Widgets';

interface ServerBlockProps {
	name: string;
	ip: string;
	port: number;
	password: string | undefined;
	onpress?: () => void;
}

export default function ServerBlock({ name, ip, port, password, onpress }: ServerBlockProps) {
	const [isReachable, setReachable] = useState(false);
	const [data, setData] = useState<ServerResponseSmall | null>(null);

	useEffect(() => {
		let isMounted = true; // To prevent state updates on unmounted components

		const fetchStatus = async () => {
			const data: ServerResponseSmall | null = await getServerStatus(ip, port, password);
			if (!isMounted) return;
	
			setReachable(data ? true : false);
			data && setData(data!);
		};

		const fetchContinuously = async () => {
			while (isMounted) {
				await fetchStatus(); // Wait for the current fetch to complete
				await new Promise((resolve) => setTimeout(resolve, 30000)); // Wait 5 seconds before the next fetch
			}
		};

		fetchContinuously();

		return () => {
			isMounted = false;
		};
	}, [ip, port]);

	return (
		<TouchableOpacity style={WidgetStyles.container} onPress={onpress}>
			<View style={styles.reachable}>
				<Reachable isReachable={isReachable}/>
			</View>
			<Text style={WidgetStyles.title}>{name}</Text>
			<Text style={WidgetStyles.text}>IP: {ip}</Text>
			<Text style={WidgetStyles.text}>Port: {port}</Text>
			<Text style={WidgetStyles.text}>Reachable: {isReachable ? 'Yes' : 'No'}</Text>
			<View style={WidgetStyles.separator} />
			{isReachable && data ? (
				<>
					<CpuPercentageWidgetSmall percentage={data.cpu_usage}/>
					<MemoryUsageSmall memory={data.memory}/>
				</>
			) : (
				<Text style={WidgetStyles.text}>No data. (Server Offline)</Text>
			)}
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 10,
		marginVertical: 5,
		backgroundColor: '#f9f9f9',
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
	reachable: {
		position: 'absolute',
		top: 20,
		right: 100,
		width: 20,
		height: 20,
		backgroundColor: 'transparent',
	},
});

const getServerStatus = async (ip: string, port: number, password: string | undefined) => {
	try {
		const endpoint = `http://${ip}:${port}/status`;

		// Timeout after 10 seconds
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Network request timed out')), 10000)
		);

		const response: any = await Promise.race([fetch(endpoint), {
			method: 'GET',
			headers: {
				password: password !== undefined ? password : "",
			}
		} ,timeout]);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		return await response.json() as ServerResponseSmall;
	} catch (error) {
		// console.error('Failed to fetch server status:', error);
		return null;
	}
};