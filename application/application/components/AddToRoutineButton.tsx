import {Text, View, StyleSheet, TouchableOpacity} from "react-native";
import MiniAddButton from "../components/MiniAddButton";
export default function AddToRoutineButton() {
    return (
        <>
            <View style={styles.container}>
                <TouchableOpacity
                    onPress={() => {}}>
                    <Text style={styles.label}>Add to Routine</Text>
                    {/*/ Add custom icon here /*/}
                </TouchableOpacity>
            </View>


        </>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 1,
        marginTop: 10,
        paddingHorizontal: 10
    },
    label: {
        textAlign: "center",
    }
})