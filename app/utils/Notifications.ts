import PushNotification, {Importance} from 'react-native-push-notification';

PushNotification.configure({
	onNotification: function (notification) {
		console.log('Notification received:', notification);
	},
	requestPermissions: true,
});

export const triggerNotification = (title: string, message: string, playSound = true, soundName = 'default') => {
	PushNotification.localNotification({
		title: title,
		message: message,
		playSound: playSound,
		soundName: soundName,
	});
};