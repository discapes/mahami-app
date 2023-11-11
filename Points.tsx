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


export default function Points(): JSX.Element {
    return(
        <View>
        <Text>
            Points here.
        </Text>
        </View>
    );
}