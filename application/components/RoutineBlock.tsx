import Routine from "@/models/Routine";
import {StyleSheet, View, Text} from "react-native";

export default function RoutineBlock(routine: Routine) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {routine.name}
                </Text>
            </View>
            <View>
                <Text>
                    {routine.description}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        marginLeft: 35,
        flex: 2
    },
    header: {
        flexDirection: "row",
        marginVertical: 10,
    },
    container: {
        maxWidth: "40%",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        maxHeight: 150
    },
    buttonWrapper: {
        marginHorizontal: "auto",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly"
    }
})
