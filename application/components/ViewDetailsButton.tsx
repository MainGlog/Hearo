import {Text, StyleSheet, TouchableOpacity} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app";
import Scale from "@/models/Scale";
import { useNavigation } from '@react-navigation/native';
import Routine from "@/models/Routine";


type Props = {
    scale?: Scale
    routine?: Routine
    // keyof means that it will only accept routes that are specified in the RootStackParamList
    navigationRoute: keyof RootStackParamList,
    buttonLabel: string
}
export default function ViewDetailsButton({scale, routine, buttonLabel, navigationRoute}: Props){
    const navigation = useNavigation<NativeStackScreenProps<RootStackParamList>['navigation']>();
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                console.log("Routine Details Button");
                console.log(routine);
                if (navigationRoute === "ScaleDetails" && scale) navigation.navigate(navigationRoute, scale);
                else if (navigationRoute === "RoutineDetails" && routine) navigation.navigate(navigationRoute, routine);
            }}
        >
            <Text style={styles.label}>{buttonLabel}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        marginVertical: 15,
        paddingHorizontal: 10,
        marginLeft: 5
    },
    label: {
        textAlign: "center",
    }
})