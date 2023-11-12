import React from 'react';
import {
	View,
	Image,
	ScrollView,
	TouchableOpacity,
	Dimensions,
} from 'react-native';
import Section from '../../src/components/Section';

import { NativeStackNavigationProp } from '@react-navigation/native-stack';

interface MinutesScreenProps {
	navigation: NativeStackNavigationProp<RootStackParamList, 'Parental'>;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const ImageScreen: React.FC<MinutesScreenProps> = ({
	navigation,
}): JSX.Element => {
	return (
		<ScrollView>
			<Image
				style={{ width: windowWidth, height: windowHeight }}
				source={require('../../assets/img/Ss.png')}></Image>
			<TouchableOpacity onPress={() => navigation.navigate('Parental')}>
				<Section title="Parental Controls" />
			</TouchableOpacity>
		</ScrollView>
	);
};
