import { View, Text, TouchableOpacity } from "react-native";
import WidgetStyles from "../../styles/Widgets";
import { useNavigation } from "@react-navigation/native";
import ProcessScreen from "../../routes/ProcessPage";
import { StackNavigationProp } from "@react-navigation/stack";
import { AppStackParamList } from "../../App";

type NavigationProp = StackNavigationProp<AppStackParamList, "Process Details">;

export default function ProcessWidget({processAmount, server}: {processAmount: number, server: Server})
{
    const navigation = useNavigation<NavigationProp>();

    return (
        <TouchableOpacity 
            style={WidgetStyles.container}
            onPress={() => navigation.navigate("Process Details", { server })}
        >
            <Text style={WidgetStyles.title}>Process</Text>
            <Text style={WidgetStyles.text}>{processAmount} currently runing processes</Text>

        </TouchableOpacity>
    );
}