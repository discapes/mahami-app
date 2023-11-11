import React from 'react';
import { ScrollView, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import theme from '../../theme';
import Section from '../components/Section';
import SectionContainer from '../components/SectionContainer';


export default function ParentalControl(): JSX.Element {
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<View>
				<SectionContainer>
					<Section title="moi">

                    </Section>
				</SectionContainer>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		fontFamily: theme.font.regular,
		color: theme.colors.text,
	},
});
