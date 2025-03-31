import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface CpuPercentageProps {
    percentage: number;
}

export default function CpuPercentage({ percentage }: CpuPercentageProps) {
    return (
        <>
            <Text>CPU Usage: {percentage.toPrecision(4)}%</Text>
        </>
    );
}