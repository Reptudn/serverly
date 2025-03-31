import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { CpuPercentageWidget } from '../components/widgets/CPU';
import MemoryUsageWidget from '../components/widgets/Memory';
import DiskUsageWidget from '../components/widgets/Disk';
import NetworkWidget from '../components/widgets/Network';
import DockerContainerListWidget from '../components/widgets/Docker';
import WidgetStyles from '../styles/Widgets';
import ProcessWidget from '../components/widgets/Process';

interface DockerStatsScreenProps {
	route: {
		params: {
			container: DockerContainer;
		}
	}
}

export default function DockerStatsScreen({ route }: DockerStatsScreenProps) {
	const { container } = route.params;

	return (
        <View>
            <Text>{container.id}</Text>
            <Text>{container.image}</Text>
            <Text>{container.names}</Text>
            <Text>{container.state}</Text>
        </View>
    );
};
