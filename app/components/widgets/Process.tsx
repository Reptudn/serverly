import { View, Text } from "react-native";
import WidgetStyles from "../../styles/Widgets";

export default function ProcessWidget({processAmount}: any)
{
    return (
        <View style={WidgetStyles.container}>
            <Text style={WidgetStyles.title}>Process</Text>
            <Text style={WidgetStyles.text}>{processAmount} currently runing processes</Text>
        </View>
    );
}