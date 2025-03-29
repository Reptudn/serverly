import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface ServerBlockData
{
    name: string,
    ip: string,
    port: number,
}

interface ServerStatus
{

}

export default function ServerBlock({ name, ip, port }: ServerBlockData) {

    const [isReachable, setReachable] = useState(false);

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.details}>IP: {ip}</Text>
            <Text style={styles.details}>Port: {port}</Text>
            <Text style={styles.details}>Reachable: {isReachable ? "yes": "no"}</Text>
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