import React from 'react';
import { StyleSheet, Text, View, StyleProp, TextStyle } from 'react-native';

import type { PropsWithChildren } from 'react';
import theme from '../../theme';

type SectionProps = PropsWithChildren<{
	title: string;
	icon?: JSX.Element;
	titleStyle?: StyleProp<TextStyle>;
	data?: string;
}>;

export default function Section({
	children,
	title,
	icon,
	data,
	titleStyle,
}: SectionProps): JSX.Element {
	const textStyle = StyleSheet.compose(styles.sectionTitle, titleStyle);
	return (
		<View style={styles.sectionContainer}>
			<View style={styles.sectionHeader}>
				<Text style={textStyle}>
					{title} {icon}
				</Text>
				<Text style={styles.sectionTitle}>{data}</Text>
			</View>
			<View style={styles.sectionDescription}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		padding: 12,
		backgroundColor: theme.colors.element,
		borderRadius: 20,
	},
	sectionHeader: {
		display: 'flex',
		justifyContent: 'space-between',
		flexDirection: 'row',
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
