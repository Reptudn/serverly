import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View, FlatList } from 'react-native';

interface DockerContainerListProps {
    dockerContainers: DockerContainer[];
}


function DockerContainerItem({ container }: { container: DockerContainer }) {

    return (
        <View>
			<Text>Image: {container.image}</Text>
		</View>
    );
    
}

export default function DockerContainerListWidget({ dockerContainers }: DockerContainerListProps) {

	// const [containers, setContainers] = useState<DockerContainer[]>(dockerContainers);
	
    return (
        <View>
            <Text>Running Docker Containers:</Text>
			{
				dockerContainers.length > 0 ? (
					<FlatList
						data={dockerContainers}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => (
							<DockerContainerItem container={item} />
						)}
					/>
				) : (
					<Text>        No running Docker containers</Text>
				)
			}
        </View>
    );

}
