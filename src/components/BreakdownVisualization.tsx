import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { PropsWithChildren } from 'react';
import theme from '../../theme';

type BreakdownVisualizationProps = PropsWithChildren<{
	sleep: number;
	steps: number;
	exercise: number;
}>;

export default function BreakdownVisualization({
	sleep,
	steps,
	exercise,
}: BreakdownVisualizationProps): JSX.Element {
	return (
		<View style={styles.rootContainer}>
			<View style={[styles.exercise, styles.block, styles.topBlock]}>
				<Text style={styles.categoryText}>Exercise</Text>
				<Text style={styles.categoryValue}>{exercise} minutes</Text>
			</View>
			<View style={[styles.steps, styles.block]}>
				<Text style={styles.categoryText}>Steps</Text>
				<Text style={styles.categoryValue}>{steps} minutes</Text>
			</View>
			<View style={[styles.sleep, styles.block, styles.bottomBlock]}>
				<Text style={styles.categoryText}>Sleep</Text>
				<Text style={styles.categoryValue}>{sleep} minutes</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	rootContainer: {
		flexDirection: 'column',
		alignItems: 'center',
		height: 250,
		flex: 1,
	},
	block: {
		flex: 1,
		flexShrink: 0,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	categoryText: {
		flex: 1,
		alignItems: 'flex-start',
		color: theme.colors.textInverse,
		fontSize: theme.fontSize.small,
		marginLeft: 10,
	},
	categoryValue: {
		alignItems: 'flex-end',
		marginRight: 10,
		color: theme.colors.textInverse,
		fontSize: theme.fontSize.small,
	},
	sleep: {
		backgroundColor: theme.colors.blue,
	},
	exercise: {
		backgroundColor: theme.colors.orange,
	},
	topBlock: {
		borderTopRightRadius: 5,
		borderTopLeftRadius: 5,
	},
	bottomBlock: {
		borderBottomRightRadius: 5,
		borderBottomLeftRadius: 5,
	},
	steps: {
		backgroundColor: theme.colors.green,
	},
});
