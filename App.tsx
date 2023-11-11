/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
import type {PropsWithChildren} from 'react';
import {
	SafeAreaView,
	ScrollView,
	StatusBar,
	StyleSheet,
	Text,
	useColorScheme,
	View,
	NativeModules,
} from 'react-native';

import {
	Colors,
} from 'react-native/Libraries/NewAppScreen';

type SectionProps = PropsWithChildren<{
	title: string;
}>;


const {StepModule} = NativeModules;

function App(): JSX.Element {
	const isDarkMode = useColorScheme() === 'dark';
	const [result, setResult] = useState<string>('loading...');
	useEffect(() => {
		StepModule.getSteps().then((steps: string) => setResult(steps));
	}, []);

	const backgroundStyle = {
		backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
	};

	return (
		<SafeAreaView style={backgroundStyle}>
			<StatusBar
				barStyle={isDarkMode ? 'light-content' : 'dark-content'}
				backgroundColor={backgroundStyle.backgroundColor}
			/>
			<ScrollView
				contentInsetAdjustmentBehavior="automatic"
				style={backgroundStyle}>
				<View
					style={{
						backgroundColor: isDarkMode ? Colors.black : Colors.white,
					}}>
						<Text style={styles.text}>
							Great Job, Bob
							You have earned 34 minutes extra screen time today!
							{result}
						</Text>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	text: {
		fontSize: 40,
		fontFamily: "HarmonyOS Sans, Regular",
		backgroundColor: "transparent"
	},
});
export default App;
