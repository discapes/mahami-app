import { Animated, StyleSheet, View } from 'react-native';
import theme from '../../theme';

interface ProgressBarProps {
	progress: number;
	color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = (): JSX.Element => {
	return (
		<View style={styles.progressBar}>
			<Animated.View
				style={[
					StyleSheet.absoluteFill,
					{
						backgroundColor: theme.colors.blue,
						width: '50%',
						borderRadius: 50,
					},
				]}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	progressBar: {
		height: 20,
		width: '100%',
		backgroundColor: theme.colors.background,
		borderRadius: 50,
	},
});
