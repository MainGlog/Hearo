import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app";
import Scale from "@/models/Scale";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";

type Props = {
    scale: Scale
}
export default function ViewDetailsButton({scale}: Props){
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                // TODO figure out how to navigate to the details screen
            }}
        >
            <Text style={styles.label}>View Details</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10,
    },
    label: {
        textAlign: "center",
    }
})