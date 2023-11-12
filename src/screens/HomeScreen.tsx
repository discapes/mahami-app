import { Picker } from '@react-native-picker/picker';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
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
import { ProgressBar } from '../components/ProgressBar';
import Section from '../components/Section';
import SectionContainer from '../components/SectionContainer';

const { StepModule } = NativeModules;

import { Leaderboard } from '../components/Leaderboard';
import MyText from '../components/MyText';
import { FitnessDisplay } from '../components/FitnessDisplay';

interface HomeScreenProps {
	navigation: NativeStackNavigationProp<RootStackParamList>;
}

export type FitnessData = {
	exerciseDone: number;
	sleepDone: number;
	stepsDone: number;
	exerciseGoal: number;
	sleepGoal: number;
	stepGoal: number;

	freeScreentime: number;
	maxScreentime: number;
	screentimeEarned: number;
	screentimeUsed: number;
	screentimeFromExercise: number;
	screentimeFromSleep: number;
	screentimeFromSteps: number;

	pointsEarned: number;
};

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
	const [fitnessData, setFitnessData] = useState<FitnessData | null>(null);
	const [selectedLeaderboardUser, setSelectedLeaderboardUser] =
		useState<string>('bob');

	useEffect(() => {
		const eventEmitter = new NativeEventEmitter(StepModule);
		let eventListener = eventEmitter.addListener('dataChanged', e => {
			console.log(`Received fitness data at ${Date.now().toFixed(0)}:`, e);
			setFitnessData(e);
		});
		console.log('Added listener');
		return () => {
			eventListener.remove();
		};
	}, []);

	return (
		<ScrollView contentInsetAdjustmentBehavior="automatic">
			{fitnessData ? (
				<View style={{ gap: 20, paddingTop: 10 }}>
					<FitnessDisplay data={fitnessData}></FitnessDisplay>
					<Section title="How it works">
						<MyText style={styles.text}>
							You can earn more screen time by completing activities, walking
							and meeting other goals that you have agreed upon together wtih
							your guardian. {'\n\n'}Your guardian can set a screentime limit
							and change how you get points.
						</MyText>
					</Section>
					<Section title="Leaderboard">
						<Leaderboard selectedUser={selectedLeaderboardUser} />
						<Picker
							selectedValue={selectedLeaderboardUser}
							onValueChange={(itemValue, itemIndex) =>
								setSelectedLeaderboardUser(itemValue)
							}>
							<Picker.Item label="Alice" value="alice" />
							<Picker.Item label="Bob" value="bob" />
							<Picker.Item label="Charlie" value="charlie" />
							<Picker.Item label="Diana" value="diana" />
							<Picker.Item label="Ethan" value="ethan" />
							<Picker.Item label="Fiona" value="fiona" />
							<Picker.Item label="George" value="george" />
							<Picker.Item label="Hannah" value="hannah" />
							<Picker.Item label="Ivy" value="ivy" />
							<Picker.Item label="Jack" value="jack" />
						</Picker>
					</Section>
				</View>
			) : (
				<MyText>Loading...</MyText>
			)}
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
	text: {
		fontSize: 16,
		fontFamily: theme.font.regular,
		color: theme.colors.text,
		padding: 10,
	},
});
