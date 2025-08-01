import {View, Text, StyleSheet, Image} from "react-native";
import {FontAwesome} from "@expo/vector-icons";
import Scale from "@/models/Scale";
import ViewDetailsButton from "@/components/ViewDetailsButton";

export default function ScaleContainer(scale: Scale) {
    return(
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {scale.name} Scale
                    </Text>
                </View>
{/*
                <Image style={styles.image} source={scale.imageFilePath}></Image>
*/}
                <View style={{flexDirection: "row", justifyContent: "center"}}>
                    <ViewDetailsButton
                        scale={scale}
                        buttonLabel={"View Details"}
                        navigationRoute={"ScaleDetails"}
                    />
                    <FontAwesome name={"volume-up"} size={24} style={{marginTop: 13, marginHorizontal: 5}}/>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    title: {
        textAlign: "center",
        flex: 2
    },
    header: {
        flexDirection: "row",
        marginVertical: 10,
    },
    container: {
        width: 130,
        backgroundColor: '#e3e1e7',
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
        marginHorizontal: "auto",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly"
    }
})

