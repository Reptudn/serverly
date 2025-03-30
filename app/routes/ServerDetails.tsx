import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function ServerDetailsScreen({ route }: any) {
    const { server } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Server Details</Text>
            <Text>Name: {server.name}</Text>
            <Text>IP: {server.ip}</Text>
            <Text>Port: {server.port}</Text>
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