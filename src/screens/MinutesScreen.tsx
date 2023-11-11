import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import theme from '../../theme';
import Section from '../components/Section';
import SectionContainer from '../components/SectionContainer';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Basketball from '../../assets/img/basketball';
import Moon from '../../assets/img/moon';
import Shoe from '../../assets/img/shoe';
import MyText from '../components/MyText';

interface MinutesScreenProps {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Minutes'>;
}

export const MinutesScreen: React.FC<MinutesScreenProps> = ({
	navigation,
}): JSX.Element => {
	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<View>
				<SectionContainer>
					<Section
						title="Sleep"
						icon={<Moon />}
						titleStyle={{ color: theme.colors.blue }}
						data="45 minutes">
						<MyText style={styles.text}>
							Your sleep score for the last night was 86 which earns you{' '}
							<MyText style={{ color: theme.colors.blue }}>45</MyText> minutes
						</MyText>
					</Section>
					<Section
						title="Steps"
						icon={<Shoe />}
						titleStyle={{ color: theme.colors.green }}
						data="39 minutes">
						<MyText style={styles.text}>
							You have taken 5914 steps today, which earns you{' '}
							<MyText style={{ color: theme.colors.green }}> 39</MyText> minutes
						</MyText>
					</Section>
					<Section
						title="Excercise"
						icon={<Basketball />}
						titleStyle={{ color: theme.colors.orange }}
						data="20 minutes">
						<MyText style={styles.text}>
							You have completed 63% of your excercise goal, which earns you{' '}
							<MyText style={{ color: theme.colors.orange }}>20</MyText>{' '}
							minutes.
						</MyText>
					</Section>
					<Section title="How it works">
						<MyText style={styles.text}>
							You can earn more screen time by completing activities, walking
							and meeting other goals that you have agreed upon together wtih
							your guardian. {'\n\n'}Your guardian can set a screentime limit
							and change how you get points.
						</MyText>
					</Section>
				</SectionContainer>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	text: {
		fontSize: 14,
		fontFamily: theme.font.regular,
		color: theme.colors.text,
	},
});
