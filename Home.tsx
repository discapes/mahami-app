import React, {useEffect, useState} from 'react';
import {
	ScrollView,
	Text,
	View,
	NativeModules,
	NativeEventEmitter,
    StyleSheet
} from 'react-native';
import Colors from './Colors';

const {StepModule} = NativeModules;

function Section({children, title}: SectionProps): JSX.Element {
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: Colors.text,
					},
				]}>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: Colors.text,
					},
				]}>
				{children}
			</Text>
		</View>
	);
}


export default function Home(): JSX.Element {
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
					<View style={{gap: 3, padding: 10}}>
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
		color: Colors.text,
	},
	text: {
		fontSize: 14,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: Colors.text,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
		backgroundColor: Colors.element,
		margin: 20,
		borderRadius: 100,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});