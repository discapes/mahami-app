import { PropsWithChildren } from 'react';
import { StyleSheet, Text, TextProps } from 'react-native';
import theme from '../../theme';

type SectionProps = PropsWithChildren<TextProps>;

export default function MyText({ children, style, ...props }: SectionProps) {
	const combinedStyles = StyleSheet.flatten([
		{ fontFamily: theme.font.regular },
		style,
	]);

	return (
		<Text style={combinedStyles} {...props}>
			{children}
		</Text>
	);
}
