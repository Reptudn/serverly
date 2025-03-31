import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

interface CpuPercentageProps {
    percentage: number;
}

export function CpuPercentageWidget({ percentage }: CpuPercentageProps) {
    return (
        <>
            <Text>CPU Usage: {percentage.toPrecision(4)}%</Text>
        </>
    );
}

export function CpuPercentageWidgetSmall({ percentage }: CpuPercentageProps) {
    return (
        <>
            <Text>CPU Usage: {percentage.toPrecision(4)}%</Text>
        </>
    );
}