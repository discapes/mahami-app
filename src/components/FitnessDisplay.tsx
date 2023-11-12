import { StyleSheet, View } from 'react-native';
import theme from '../../theme';
import Section from './Section';

import Basketball from '../../assets/img/basketball';
import Moon from '../../assets/img/moon';
import Shoe from '../../assets/img/shoe';
import MyText from './MyText';
import { ProgressBar } from './ProgressBar';
import { FitnessData } from '../screens/HomeScreen';

function HeaderText({ data }: { data: FitnessData }) {
	return (
		<View style={styles.welcomeTextContainer}>
			<MyText style={styles.header}>Great job, Bob 🎉</MyText>
			<MyText style={styles.header}>
				You have earned{' '}
				<MyText style={{ fontWeight: 'bold', color: theme.colors.blue }}>
					{data.screentimeEarned} minutes
				</MyText>{' '}
				extra screen time today, along with{' '}
				<MyText style={{ fontWeight: 'bold', color: 'red' }}>
					{data.pointsEarned} points
				</MyText>
				!
			</MyText>
		</View>
	);
}

function ScreentimeSection({ data }: { data: FitnessData }) {
	return (
		<Section title="Screen time">
			<ProgressBar
				progress={
					data.screentimeUsed /
					Math.min(
						data.freeScreentime + data.screentimeEarned,
						data.maxScreentime,
					)
				}
				color={theme.colors.blue}
			/>
			<MyText style={styles.text}>
				{data.screentimeUsed} minutes used out of {data.freeScreentime} free and{' '}
				{data.screentimeEarned} earned, limited to {data.maxScreentime}
			</MyText>
		</Section>
	);
}

function BreakdownSection({ data }: { data: FitnessData }) {
	return (
		<Section title="Earned minutes breakdown">
			<Section
				title="Sleep"
				icon={<Moon />}
				padding={0}
				titleStyle={{ color: theme.colors.blue }}
				data={data.screentimeFromSleep + ' minutes'}>
				<ProgressBar
					color={theme.colors.blue}
					progress={data.sleepDone / data.sleepGoal}></ProgressBar>
				<MyText style={styles.text}>
					{data.sleepDone} minutes slept out of {data.sleepGoal} minute goal
				</MyText>
			</Section>
			<Section
				title="Steps"
				icon={<Shoe />}
				padding={0}
				titleStyle={{ color: theme.colors.green }}
				data={data.screentimeFromSteps + ' minutes'}>
				<ProgressBar
					color={theme.colors.green}
					progress={data.stepsDone / data.stepGoal}></ProgressBar>
				<MyText style={styles.text}>
					{data.stepsDone} steps walked out of {data.stepGoal} step goal
				</MyText>
			</Section>
			<Section
				title="Excercise"
				icon={<Basketball />}
				padding={0}
				titleStyle={{ color: theme.colors.orange }}
				data={data.screentimeFromExercise + ' minutes'}>
				<ProgressBar
					color={theme.colors.orange}
					progress={data.exerciseDone / data.exerciseGoal}></ProgressBar>
				<MyText style={styles.text}>
					{data.exerciseDone} minutes exercised out of {data.exerciseGoal}{' '}
					minute goal
				</MyText>
			</Section>
		</Section>
	);
}

export function FitnessDisplay({ data }: { data: FitnessData }) {
	return (
		<>
			<HeaderText data={data}></HeaderText>
			<ScreentimeSection data={data}></ScreentimeSection>
			<BreakdownSection data={data}></BreakdownSection>
		</>
	);
}
const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		fontFamily: theme.font.regular,
		color: theme.colors.text,
		padding: 10,
	},
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
