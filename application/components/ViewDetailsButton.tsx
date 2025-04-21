import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app";
import Scale from "@/models/Scale";
import {BottomTabBarProps} from "@react-navigation/bottom-tabs";
import { useNavigation } from '@react-navigation/native';
import {useEffect} from "react";


type Props = {
    scale: Scale
}
// @ts-ignore
export default function ViewDetailsButton({scale}: Props){
    const navigation = useNavigation<NativeStackScreenProps<RootStackParamList, 'ScaleDetails'>['navigation']>();


    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                navigation.navigate("ScaleDetails", {...scale})
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
        marginTop: 15,
        paddingHorizontal: 10,
    },
    label: {
        textAlign: "center",
    }
})