import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
	NativeEventEmitter,
	NativeModules,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import theme from '../../theme';
import BreakdownVisualization from '../components/BreakdownVisualization';
import { ProgressBar } from '../components/ProgressBar';
import Section from '../components/Section';
import SectionContainer from '../components/SectionContainer';

const { StepModule } = NativeModules;

import ConfettiCannon from 'react-native-confetti-cannon';
import MyText from '../components/MyText';

interface HomeScreenProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
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

	const minutesEarnedToday = 105;
	const allowanceMinutes = 60;
	const allowanceMinutesUsed = 60;
	const percentAllowanceMinutesUsed =
		(allowanceMinutesUsed / allowanceMinutes) * 100;
	const earnedExtraMinutes = minutesEarnedToday;
	const earnedExtraMinutesUsed = 52;
	const percentEarnedExtraMinutesUsed =
		(earnedExtraMinutesUsed / earnedExtraMinutes) * 100;

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			<View>
				<View style={styles.welcomeTextContainer}>
					<MyText style={styles.header}>Great job, Bob 🎉</MyText>
					<MyText style={styles.header}>
						You have earned{' '}
						<MyText style={{ fontWeight: 'bold', color: theme.colors.blue }}>
							{minutesEarnedToday} minutes
						</MyText>{' '}
						extra screen time today!
					</MyText>
				</View>
				<SectionContainer>
					<TouchableOpacity onPress={() => navigation.navigate('Minutes')}>
						<Section title="Earned minutes breakdown">
							<BreakdownVisualization sleep={45} exercise={20} steps={39} />
						</Section>
					</TouchableOpacity>
					<TouchableOpacity onPress={() => navigation.navigate('Profiles')}>
						<Section title="Screen time">
							<MyText style={styles.screenTimeSubtitle}>Allowance</MyText>
							<ProgressBar
								progress={percentAllowanceMinutesUsed}
								color={theme.colors.blue}
							/>
							<MyText style={styles.progressText}>
								{allowanceMinutesUsed} / {allowanceMinutes} minutes used
							</MyText>
							<MyText style={styles.screenTimeSubtitle}>Earned extra</MyText>
							<ProgressBar
								progress={percentEarnedExtraMinutesUsed}
								color={theme.colors.blue}
							/>
							<MyText style={styles.progressText}>
								{earnedExtraMinutesUsed} / {earnedExtraMinutes} minutes used
							</MyText>
						</Section>
					</TouchableOpacity>
				</SectionContainer>
				{minutesEarnedToday > 50 && (
					<ConfettiCannon
						count={200}
						origin={{ x: 0, y: 0 }}
						autoStart={true}
					/>
				)}
			</View>
		</ScrollView>
	);
};
const styles = StyleSheet.create({
	header: {
		fontSize: theme.fontSize.large,
		color: theme.colors.text,
	},
	welcomeTextContainer: {
		padding: 20,
		paddingBottom: 10,
	},
	screenTimeSubtitle: {
		fontSize: theme.fontSize.smaller,
		color: theme.colors.text,
		marginVertical: 8,
	},
	progressText: {
		marginTop: 6,
	},
});
