import type { PropsWithChildren } from 'react';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import MinutesScreen from './src/screens/MinutesScreen';
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
					initialRouteName="Home">
					<Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
					<Stack.Screen options={{ title: 'Earned minutes', headerTitleStyle: styles.header, headerShadowVisible: false, headerStyle: {backgroundColor: theme.colors.background}}}name="Minutes" component={MinutesScreen} />
				</Stack.Navigator>
			</SafeAreaView>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	header: {
		padding: 20,
		fontSize: 30,
		fontFamily: theme.font.regular,
		color: theme.colors.text,
	},
	text: {
		fontSize: 14,
		fontFamily: theme.font.regular,
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
