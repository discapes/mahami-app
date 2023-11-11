import React from 'react';
import { StyleSheet, View } from 'react-native';

import type { PropsWithChildren } from 'react';

type SectionContainerProps = PropsWithChildren;

export default function SectionContainer({
	children,
}: SectionContainerProps): JSX.Element {
	return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		gap: 15,
		padding: 15,
	},
});
