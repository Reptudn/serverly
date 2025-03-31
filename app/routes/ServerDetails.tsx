import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface ServerDetailsScreenProps {
    route: {
        params: {
            server: Server | any;
        }
    }
}

export default function ServerDetailsScreen({ route }: any) {
    const { server } = route.params;

    const [data, setData] = useState({});
    const [isReachable, setReachable] = useState(false);

    useEffect(() => {
        let isMounted = true;


        const fetchStatus = async () => {
            const data: ServerResponseBig | null = await getServerStatus(server.ip, server.port);
            if (!isMounted) return;

            setReachable(data ? true : false);
            data && setData(data);
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
        <View style={styles.container}>
            <Text style={styles.title}>{server.name} - Details</Text>
            <Text>Name: {server.name}</Text>
            <Text>IP: {server.ip}</Text>
            <Text>Port: {server.port}</Text>
            <Text>Reachable: {isReachable ? 'Yes' : 'No'}</Text>
            <ScrollView>
                <Text>Data:</Text>
                <Text>{data ? JSON.stringify(data, null, 2) : "No Data"}</Text>
            </ScrollView>
        </View>
    );
};

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

const getServerStatus = async (ip: string, port: number) => {
	try {
		const endpoint = `http://${ip}:${port}/status/full`;

		// Timeout after 10 seconds
		const timeout = new Promise((_, reject) =>
			setTimeout(() => reject(new Error('Network request timed out')), 10000)
		);

		const response: any = await Promise.race([fetch(endpoint), timeout]);

		if (!response.ok) {
			throw new Error(`Error: ${response.status}`);
		}

		return await response.json() as ServerResponseBig;
	} catch (error) {
		console.error('Failed to fetch server status:', error);
		return null;
	}
};