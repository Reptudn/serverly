import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import WidgetStyles from '../styles/Widgets';
import { CpuPercentageWidgetSmall } from '../components/widgets/CPU';

interface ProcessStatsScreenProps {
	route: {
		params: {
			server: Server;
		}
	}
}

function ProcessItem({ proc }: { proc: Process }) {

	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>{proc.name}</Text>
			<Text>PID: {proc.name}</Text>
			<CpuPercentageWidgetSmall percentage={proc.cpu_percent}/>
			<Text>Memory: RSS={proc.memory.rss} VMS={proc.memory.vms}</Text>
		</View>
	);
}

export default function ProcessScreen({ route }: ProcessStatsScreenProps) {
	const { server } = route.params;
	const [processes, setProcesses] = useState<Process[]>([]);

	useEffect(() => {
			let isMounted = true;
	
	
			const fetchStatus = async () => {
				const data: Process[] | null = await getServerStatus(server.ip, server.port);
				if (!isMounted) return;
				if (data)
				{
					data.sort((a, b) => b.cpu_percent - a.cpu_percent);
					data.filter((proc) => proc.cpu_percent >= 1);
				}
				setProcesses(data ? data : []);
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
		<>
			{ (processes && processes.length > 0) ? (
				<>
				<Text>Total Processes: {processes.length}</Text>
				<FlatList 
					data={processes}
					keyExtractor={(process) => String(process.pid)}
					renderItem={({ item }) => (
						<ProcessItem proc={item}/>
					)}
					maxToRenderPerBatch={30}
					ItemSeparatorComponent={() => <View style={WidgetStyles.separator} />}
				/>
				</>
			) : (
				<ActivityIndicator size="large" color="#0000ff" style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}} />
			)}

		</>
	);
};

const getServerStatus = async (ip: string, port: number) => {
	try {
		const endpoint = `http://${ip}:${port}/processes`;

		// Timeout after 10 seconds
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Network request timed out')), 10000)
		);

		const response: any = await Promise.race([fetch(endpoint), timeout]);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		return await response.json() as Process[];
	} catch (error) {
		// console.error('Failed to fetch server status:', error);
		return null;
	}
};