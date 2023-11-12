import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import type { PropsWithChildren } from 'react';
import theme from '../../theme';
import MyText from './MyText';

type SectionProps = PropsWithChildren<{
	title: string;
	icon?: JSX.Element;
	titleStyle?: StyleProp<TextStyle>;
	data?: string;
	padding?: number;
}>;

export default function Section({
	children,
	title,
	icon,
	data,
	titleStyle,
	padding = 12,
}: SectionProps): JSX.Element {
	const textStyle = StyleSheet.compose(styles.sectionTitle, titleStyle);
	return (
		<View style={[styles.sectionContainer, { padding }]}>
			<View style={styles.sectionHeader}>
				<View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 10 }}>
					<MyText style={textStyle}>{title}</MyText>
					<Text style={{ height: 25 }}>{icon}</Text>
				</View>
				<Text style={[styles.sectionTitle, textStyle]}>{data}</Text>
			</View>
			<View style={styles.sectionDescription}>{children}</View>
		</View>
	);
}

const styles = StyleSheet.create({
	sectionContainer: {
		backgroundColor: theme.colors.element,
		borderRadius: 8,
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
		marginTop: 10,
		fontSize: 18,
		color: theme.colors.secondaryText,
	},
	highlight: {
		fontWeight: '700',
	},
});
