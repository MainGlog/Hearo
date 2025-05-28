import Routine from "@/models/Routine";
import {StyleSheet, View, Text} from "react-native";
import ViewDetailsButton from "@/components/ViewDetailsButton";


export default function RoutineBlock(routine: Routine) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>
                    {routine.name}
                </Text>
            </View>
            <Text style={styles.description}>
                {routine.description}
            </Text>
            <View style={{flexDirection: "row", justifyContent: "center"}}>
                <ViewDetailsButton
                    routine={routine}
                    buttonLabel={"Train"}
                    navigationRoute={"RoutineDetails"}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title: {
        flex: 2,
        textAlign: "center"
    },
    header: {
        flexDirection: "row",
        marginVertical: 10,
    },
    description: {
        textAlign: "center"
    },
    container: {
        width: 120,
        borderRadius: 20,
        backgroundColor: '#e3e1e7',
        maxHeight: 200
    }
});
