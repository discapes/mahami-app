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

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Colors from './Colors';
import Points from './Points';
import Home from './Home';
const {StepModule} = NativeModules;

type SectionProps = PropsWithChildren<{
	title: string;
}>;

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
	return (
		<NavigationContainer>
			<SafeAreaView
				style={{
					backgroundColor: Colors.background,
					flex: 1,
				}}>
				<StatusBar
					barStyle={'dark-content'}
					backgroundColor={Colors.background}
				/>
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen name="Home" component={Home} />
					<Stack.Screen name="Points" component={Points} />
				</Stack.Navigator>

				<View
					style={{
						backgroundColor: Colors.element,
						height: '10%',
					}}>
						<Text>Moi</Text>
					</View>
			</SafeAreaView>
		</NavigationContainer>
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
