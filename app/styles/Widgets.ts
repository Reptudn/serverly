import { StyleSheet } from 'react-native';

const WidgetStyles = StyleSheet.create({
	container: {
		padding: 15,
		marginVertical: 10,
		backgroundColor: '#1E293B',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.5,
		shadowRadius: 4,
		elevation: 3,
		// borderWidth: 1,
		// borderColor: '#e0e0e0',
		height: 'auto'
	},
	title: {
		fontSize: 20, // Slightly larger font for the title
		fontWeight: '600', // Semi-bold for emphasis
		color: '#F8FAFC', // Darker text for better readability
		marginBottom: 8, // Space between title and content
	},
	text: {
		fontSize: 16, // Slightly larger font for content
		color: '#94A3B8', // Softer text color for secondary information
		lineHeight: 22, // Better readability with increased line height
	},
	separator: {
		height: 1,
		backgroundColor: '#e0e0e0', // Subtle separator line
		marginVertical: 10,
	},
});


export const PageStyles = StyleSheet.create({
	background: {
		backgroundColor: '#0F172A',
		flex: 1,
		padding: 20
	},
});

export const AccentSyles = StyleSheet.create({
	primary: {
		backgroundColor: '#14B8A6'
	},
	secondary: {
		backgroundColor: '#38BDF8'
	}
});

export const ButtonStyles = StyleSheet.create({
	primary: {
		backgroundColor: '#0EA5E9',
		width: '100%',
		height: 'auto',
		borderRadius: 20,
		color: '#0EA5E9',
		alignItems: 'center',
		textAlign: 'center',
		padding: 20
	}
});

export const TextStyles = StyleSheet.create({
	primary: {
		color: '#F8FAFC',
		textDecorationColor: '#F8FAFC',
		fontSize: 30
	}
});

export default WidgetStyles;