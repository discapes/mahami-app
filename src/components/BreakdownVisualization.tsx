import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { PropsWithChildren } from 'react';
import theme from '../../theme';
import MyText from './MyText';

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
				<MyText style={styles.categoryText}>Exercise</MyText>
				<MyText style={styles.categoryValue}>{exercise} minutes</MyText>
			</View>
			<View style={[styles.steps, styles.block]}>
				<MyText style={styles.categoryText}>Steps</MyText>
				<MyText style={styles.categoryValue}>{steps} minutes</MyText>
			</View>
			<View style={[styles.sleep, styles.block, styles.bottomBlock]}>
				<MyText style={styles.categoryText}>Sleep</MyText>
				<MyText style={styles.categoryValue}>{sleep} minutes</MyText>
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
