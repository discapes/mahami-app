import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	View,
	NativeModules,
	NativeEventEmitter,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
const {StepModule} = NativeModules;

type SectionProps = PropsWithChildren<{
	title: string;
}>;

function Section({children, title}: SectionProps): JSX.Element {
	return (
		<View style={styles.sectionContainer}>
			<Text
				style={[
					styles.sectionTitle,
					{
						color: Colors.black,
					},
				]}>
				{title}
			</Text>
			<Text
				style={[
					styles.sectionDescription,
					{
						color: Colors.dark,
					},
				]}>
				{children}
			</Text>
		</View>
	);
}

export default function App(): JSX.Element {
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
		<SafeAreaView
			style={{
				backgroundColor: Colors.lighter,
				flex: 1,
			}}>
			<StatusBar barStyle={'dark-content'} backgroundColor={Colors.lighter} />
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
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	header: {
		padding: 20,
		fontSize: 30,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: Colors.dark,
	},
	text: {
		fontSize: 14,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: Colors.dark,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
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
