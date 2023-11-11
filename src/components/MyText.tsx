import React, { PropsWithChildren } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import theme from '../../theme';

type SectionProps = PropsWithChildren<
	TextProps & {
		text: string;
	}
>;

export default function MyText({ text, style, ...props }: SectionProps) {
	const combinedStyles = StyleSheet.flatten([
		{ fontFamily: theme.font.regular },
		style,
	]);

	return (
		<Text style={combinedStyles} {...props}>
			{text}
		</Text>
	);
}
