import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import ParentalControl from './src/screens/ParentalControl';
import { ImageScreen } from './src/screens/ImageScreen';
import theme from './theme';

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
				<Stack.Navigator initialRouteName="Home">
					<Stack.Screen
						options={{ headerShown: false }}
						name="Home"
						component={HomeScreen}
					/>
					<Stack.Screen
						options={{
							title: 'Parental Controls',
							headerTitleStyle: styles.header,
							headerShadowVisible: false,
							headerStyle: { backgroundColor: theme.colors.background },
						}}
						name="Parental"
						component={ParentalControl}
					/>
					<Stack.Screen
						options={{
							title: 'Profiles',
							headerTitleStyle: styles.header,
							headerShadowVisible: false,
							headerStyle: { backgroundColor: theme.colors.background },
						}}
						name="Profiles"
						component={ImageScreen}
					/>
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
