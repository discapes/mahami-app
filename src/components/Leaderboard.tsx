import { PropsWithChildren } from 'react';
import { StyleSheet, TextProps, View } from 'react-native';
import theme from '../../theme';
import MyText from './MyText';

const LeaderboardText: PropsWithChildren<TextProps> = ({
	children,
	style,
	...props
}): JSX.Element => {
	const combinedStyles = StyleSheet.flatten([{ fontSize: 20 }, style]);
	return (
		<MyText style={combinedStyles} {...props}>
			{children}
		</MyText>
	);
};

interface LeaderboardProps {
	selectedUser: string;
}

interface LeaderboardEntry {
	rank: number;
	name: string;
	points: number;
}

const leaderboardData: LeaderboardEntry[] = [
	{ rank: 1, name: 'Alice', points: 13513 },
	{ rank: 2, name: 'Bob', points: 13003 },
	{ rank: 3, name: 'Charlie', points: 12850 },
	{ rank: 4, name: 'Diana', points: 12740 },
	{ rank: 5, name: 'Ethan', points: 12670 },
	{ rank: 6, name: 'Fiona', points: 12500 },
	{ rank: 7, name: 'George', points: 12395 },
	{ rank: 8, name: 'Hannah', points: 12280 },
	{ rank: 9, name: 'Ivy', points: 12175 },
	{ rank: 10, name: 'Jack', points: 12060 },
];

export const Leaderboard: React.FC<LeaderboardProps> = ({
	selectedUser,
}): JSX.Element => {
	const isSelectedText = (name: string) =>
		name.toLowerCase() === selectedUser.toLowerCase()
			? { color: theme.colors.textInverse }
			: null;

	return (
		<View style={{ flexDirection: 'column' }}>
			{leaderboardData.map(({ rank, name, points }) => (
				<View
					key={rank}
					style={[
						styles.row,
						name.toLowerCase() === selectedUser.toLowerCase()
							? styles.selectedRow
							: null,
					]}>
					<LeaderboardText style={isSelectedText(name)}>
						{' '}
						{rank}.{' '}
					</LeaderboardText>
					<LeaderboardText style={isSelectedText(name)}>
						{name.toLowerCase() === selectedUser.toLowerCase() ? 'You' : name}
					</LeaderboardText>
					<LeaderboardText style={isSelectedText(name)}>
						{' '}
						{points} pts{' '}
					</LeaderboardText>
				</View>
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	row: {
		justifyContent: 'space-between',
		flexDirection: 'row',
		padding: 3,
	},
	name: {
		alignSelf: 'flex-start',
	},
	selectedRow: {
		backgroundColor: theme.colors.blue,
		borderRadius: 4,
	},
});
