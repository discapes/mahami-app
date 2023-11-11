import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
	NativeEventEmitter,
	NativeModules,
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import theme from '../../theme';
import Section from '../components/Section';
import SectionContainer from '../components/SectionContainer';

const { StepModule } = NativeModules;

interface HomeScreenProps {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Home'>;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const [usage, setUsage] = useState<string[]>([]);
	const [steps, setSteps] = useState<number | 'loading steps...'>(
		'loading steps...',
	);
	useEffect(() => {
		StepModule.getUsage().then(setUsage);

		const eventEmitter = new NativeEventEmitter(StepModule);
		let eventListener = eventEmitter.addListener('stepsChanged', e => {
			console.log(e);
			setSteps(e.steps);
		});
		console.log('event listener added');

		return () => {
			eventListener.remove();
		};
	}, []);

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<View>
				<Text style={styles.header}>
					Great Job, Bob You have earned 34 minutes extra screen time today!
				</Text>
				<SectionContainer>
					<TouchableOpacity onPress={() => navigation.navigate('Points')}>
						<Section title="Earned points breakdown">
							<Text>Earned points breakdown content here</Text>
						</Section>
					</TouchableOpacity>
					<Section title="Screen time">
						<Text>Screen time content here</Text>
					</Section>
				</SectionContainer>
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	header: {
		padding: 20,
		fontSize: 30,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: theme.colors.text,
	},
	text: {
		fontSize: 14,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: theme.colors.text,
	},
});
