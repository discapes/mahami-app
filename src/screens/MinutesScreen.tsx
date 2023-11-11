import React from 'react';
import {
	Text,
	View,
	StyleSheet,
	ScrollView,
	TouchableOpacity,
} from 'react-native';
import theme from '../../theme';
import Section from '../components/Section';
import SectionContainer from '../components/SectionContainer';

export default function PointsScreen(): JSX.Element {
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<View>
				<SectionContainer>
					<Section title="Sleep" titleStyle={{color: theme.colors.blue}} data="45 minutes">
						<Text style={styles.text}>Your sleep score for the last night was 86 which earns you <Text style={{color: theme.colors.blue}}>45</Text> minutes</Text>
					</Section>
					<Section title="Steps" titleStyle={{color: theme.colors.green}} data="39 minutes">
						<Text style={styles.text}>You have taken 5914 steps today, which earns you <Text style={{color: theme.colors.green}}> 39</Text> minutes</Text>
					</Section>
					<Section title="Excercise" titleStyle={{color: theme.colors.orange}}  data="20 minutes">
						<Text style={styles.text}>You have completed 63% of your excercise goal, which earns you <Text style={{color: theme.colors.orange}}>20</Text> minutes.</Text>
					</Section>
					<Section title="How it works" >
						<Text style={styles.text}>You can earn more screen time by completing activities, walking and meeting other goals that you have agreed upon together wtih your guardian. {"\n\n"}Your guardian can set a screentime limit and change how you get points.</Text>
					</Section>
				</SectionContainer>
			</View>
		</ScrollView>
	);
}
const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: theme.colors.text,
	},
});
