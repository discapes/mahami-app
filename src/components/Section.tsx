import React from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import type { PropsWithChildren } from 'react';
import theme from '../../theme';

type SectionProps = PropsWithChildren<{
	title: string;
	titleStyle?: StyleProp<TextStyle>;
	data?: string;
}>;

export default function Section({
	children,
	title,
	data,
	titleStyle,
}: SectionProps): JSX.Element {
	const textStyle = StyleSheet.compose(styles.sectionTitle, titleStyle);
	return (
		<View style={styles.sectionContainer}>
			<Text style={styles.sectionTitle}>{title}</Text>
			<View style={styles.sectionChildrenRoot}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		padding: 12,
		backgroundColor: theme.colors.element,
		borderRadius: 10,
		flex: 1,
		alignContent: 'stretch',
	},
	sectionHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
	},
	sectionTitle: {
		fontSize: 24,
		color: theme.colors.text,
		marginVertical: 5,
	},
	sectionChildrenRoot: {
		marginTop: 8,
		fontSize: 18,
		color: theme.colors.text,
		alignContent: 'stretch',
	},
	highlight: {
		fontWeight: '700',
	},
});
