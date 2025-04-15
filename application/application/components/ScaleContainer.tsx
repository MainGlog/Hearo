import {View, Text, StyleSheet, Image} from "react-native";
import AddToRoutineButton from "../components/AddToRoutineButton";
import {FontAwesome} from "@expo/vector-icons";

// @ts-ignore
export default function ScaleContainer({scaleName, scaleImage}) {
    return(
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {scaleName} Scale
                    </Text>
                    <FontAwesome name={"volume-up"} size={24} style={{marginRight: 20}}/>
                </View>
                <Image style={styles.image} source={scaleImage}></Image>
                <View style={styles.buttonWrapper}>
                    <AddToRoutineButton/>
                </View>
            </View>
        </>
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
        marginTop: 10,
        maxWidth: "40%",
        marginLeft: "5%",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "black",
        maxHeight: 150
    },
    // Fix hard coding issue
    image: {
        maxWidth: "99%",
        maxHeight: 50
    },
    buttonWrapper: {
        marginHorizontal: "auto"
    }
})

