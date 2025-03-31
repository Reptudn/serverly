import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import WidgetStyles from '../../styles/Widgets';

interface DockerContainerListProps {
	dockerContainers: DockerContainer[];
}


function DockerContainerItem({ container }: { container: DockerContainer }) {

	return (
		<TouchableOpacity style={WidgetStyles.container}>
			<Text style={WidgetStyles.text}>Image: {container.image}</Text>
		</TouchableOpacity>
	);
	
}

export default function DockerContainerListWidget({ dockerContainers }: DockerContainerListProps) {

	// const [containers, setContainers] = useState<DockerContainer[]>(dockerContainers);
	
	return (
		<View style={WidgetStyles.container}>
			<Text style={WidgetStyles.title}>Docker</Text>
			{
				dockerContainers.length > 0 ? (
					<FlatList
						data={dockerContainers}
						horizontal={true}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<DockerContainerItem 
								container={item}
							/>
						)}
						ItemSeparatorComponent={() => <View style={WidgetStyles.separator} />}
					/>
				) : (
					<Text style={WidgetStyles.text}>No running Docker containers</Text>
				)
			}
		</View>
	);

}
