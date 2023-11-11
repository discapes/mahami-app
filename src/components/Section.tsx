import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import type { PropsWithChildren } from 'react';
import theme from '../../theme';

type SectionProps = PropsWithChildren<{
	title: string;
}>;

export default function Section({
	children,
	title,
}: SectionProps): JSX.Element {
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<Text style={styles.sectionDescription}>{children}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		padding: 12,
		backgroundColor: theme.colors.element,
		borderRadius: 20,
	},
	sectionTitle: {
		fontSize: 24,
		color: theme.colors.text,
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		color: theme.colors.text,
	},
	highlight: {
		fontWeight: '700',
	},
});
