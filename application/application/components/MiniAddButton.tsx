import {View, TouchableOpacity, StyleSheet} from "react-native";

export default function MiniAddButton(){
    return(
        <View>
            <TouchableOpacity style={styles.container}>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "grey",
        maxWidth: 20,
        maxHeight: 20,
    }
})