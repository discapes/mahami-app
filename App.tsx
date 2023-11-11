import type { PropsWithChildren } from 'react';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import PointsScreen from './src/screens/PointsScreen';
import theme from './theme';

type SectionProps = PropsWithChildren<{
	title: string;
}>;

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
	return (
		<NavigationContainer>
			<SafeAreaView
				style={{
					backgroundColor: theme.colors.background,
					flex: 1,
				}}>
				<StatusBar
					barStyle={'dark-content'}
					backgroundColor={theme.colors.background}
				/>
				<Stack.Navigator
					screenOptions={{ headerShown: false }}
					initialRouteName="Home">
					<Stack.Screen name="Home" component={HomeScreen} />
					<Stack.Screen name="Points" component={PointsScreen} />
				</Stack.Navigator>

				<View
					style={{
						backgroundColor: theme.colors.element,
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
		color: theme.colors.text,
	},
	text: {
		fontSize: 14,
		fontFamily: 'HarmonyOS Sans, Regular',
		color: theme.colors.text,
	},
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
		backgroundColor: theme.colors.element,
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
