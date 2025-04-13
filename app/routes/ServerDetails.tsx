import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { CpuPercentageWidget } from '../components/widgets/CPU';
import MemoryUsageWidget from '../components/widgets/Memory';
import DiskUsageWidget from '../components/widgets/Disk';
import NetworkWidget from '../components/widgets/Network';
import DockerContainerListWidget from '../components/widgets/Docker';
import WidgetStyles, { PageStyles } from '../styles/Widgets';
import ProcessWidget from '../components/widgets/Process';
import { useNavigation } from '@react-navigation/native';
import Reachable from '../components/widgets/Reachable';

interface ServerDetailsScreenProps {
	route: {
		params: {
			server: Server;
		}
	}
}

export default function ServerDetailsScreen({ route }: ServerDetailsScreenProps) {
	const { server } = route.params;

	const [data, setData] = useState<ServerResponseBig | null>(null);
	const [isReachable, setReachable] = useState(false);

	useEffect(() => {
		let isMounted = true;


		const fetchStatus = async () => {
			const data: ServerResponseBig | null = await getServerStatus(server.ip, server.port, server.password);
			if (!isMounted) return;

			console.info("data", data)

			setReachable(data ? true : false);
			data ? setData(data) : setData(null);
		}

		const fetchContinuously = async () => {
			while (isMounted) {
				await fetchStatus(); // Wait for the current fetch to complete
				await new Promise((resolve) => setTimeout(resolve, 3000)); // Wait 5 seconds before the next fetch
			}
		};

		fetchContinuously();

		return () => {
			isMounted = false;
		}
	}, [server.ip, server.port]);

	return (
		<ScrollView style={PageStyles.background}>
			<Text style={WidgetStyles.title}>{server.name}</Text>
			<Text style={WidgetStyles.text}>IP: {server.ip}</Text>
			<Text style={WidgetStyles.text}>Port: {server.port}</Text>
			{server.password && <Text style={WidgetStyles.text}>Password: {server.password}</Text>}
			<Reachable isReachable={isReachable}/>
			{data !== null ? (
				<>
					<ProcessWidget processAmount={data.process_count} server={server}/>
					<CpuPercentageWidget percentage={data.cpu_usage} cacheAmount={100}/>
					<MemoryUsageWidget memory={data.memory} cacheAmount={100}/>
					<DiskUsageWidget disk={data.disk} />
					<NetworkWidget networks={data.network}/>	
					<DockerContainerListWidget dockerContainers={data.docker}/>
					<View style={WidgetStyles.container}>
						<Text style={WidgetStyles.title}>Raw Data</Text>
						<Text style={WidgetStyles.text}>{JSON.stringify(data, null, 2)}</Text>
					</View>
				</>
			) : (
				<ActivityIndicator size="large" color="#0000ff" style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}} />
			)}
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		padding: 15,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	actionContainer: {
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: 'auto',
	},
	actionText: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 16,
	},
});

const getServerStatus = async (ip: string, port: number, password: string | undefined) => {
	try {
		const endpoint = `http://${ip}:${port}/status`;

		// Timeout after 10 seconds
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Network request timed out')), 10000)
		);

		const headers = {
			method: 'GET',
			headers: {
				password: password !== undefined ? password : "",
			}
		}

		// console.log(JSON.stringify(headers))

		const response: any = await Promise.race([fetch(endpoint), headers ,timeout]);
		
		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		return await response.json() as ServerResponseBig;
	} catch (error) {
		// console.error('Failed to fetch server status:', error);
		return null;
	}
};