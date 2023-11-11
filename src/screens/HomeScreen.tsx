import React, { useEffect, useState } from 'react';
import {
	NativeEventEmitter,
	NativeModules,
	ScrollView,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import theme from '../../theme';
import Section from '../components/Section';

const { StepModule } = NativeModules;

export default function HomeScreen(): JSX.Element {
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
				<Section title="Steps">{steps}</Section>
				<Section title="Usage">
					Top 10 packages (unsorted):
					<View style={{ gap: 3, padding: 10 }}>
						{usage.slice(0, 10).map(pkg => (
							<Text key={pkg} style={styles.text}>
								Name: {pkg}
							</Text>
						))}
					</View>
				</Section>
			</View>
		</ScrollView>
	);
}
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
