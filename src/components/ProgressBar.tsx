import { Animated, StyleSheet, View } from 'react-native';
import theme from '../../theme';

interface ProgressBarProps {
	progress: number;
	color: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
	progress,
	color,
}): JSX.Element => {
	return (
		<View style={styles.progressBar}>
			<Animated.View
				style={[
					StyleSheet.absoluteFill,
					{
						backgroundColor: color,
						width: `${Math.min(progress * 100, 100)}%`,
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
