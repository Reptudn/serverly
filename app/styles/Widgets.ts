import { StyleSheet } from 'react-native';

const WidgetStyles = StyleSheet.create({
	container: {
		padding: 15,
		marginVertical: 10,
		backgroundColor: '#1E293B', // White background for a clean look
		borderRadius: 10, // Rounded corners
		shadowColor: '#000', // Shadow for depth
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3, // Shadow for Android
		borderWidth: 1,
		borderColor: '#e0e0e0', // Light border for subtle separation
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
		backgroundColor: '#0F172A'
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
		backgroundColor: '#F8FAFC'
	}
});

export const TextStyles = StyleSheet.create({
	primary: {
		color: '#F8FAFC',
		textDecorationColor: '#F8FAFC',
		fontSize: 300
	}
});

export default WidgetStyles;