import {View, Text, StyleSheet, Image} from "react-native";
import AddToRoutineButton from "../components/AddToRoutineButton";
import {FontAwesome} from "@expo/vector-icons";
import Scale from "@/models/Scale";
import Exercise from "@/models/Exercise";
import ViewDetailsButton from "@/components/ViewDetailsButton";
import ScaleExercise from "@/models/ScaleExercise";


export default function ScaleContainer(scale: Scale) {
    return(
        <>
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.title}>
                        {scale.name} Scale
                    </Text>
                    <FontAwesome name={"volume-up"} size={24} style={{marginRight: 20}}/>
                </View>
                <Image style={styles.image} source={scale.imageFilePath}></Image>
                <View style={styles.buttonWrapper}>
                    <ViewDetailsButton scale={scale}/>
                    {/*/ View that displays "View Details" and routes to a specified page /*/}
                    <AddToRoutineButton
                        isMiniButton={true}
                        scaleExercise={new ScaleExercise(0, 'ascending', 10, null, null, scale.id)}
                    />
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
        maxWidth: "40%",
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
        marginHorizontal: "auto",
        flexDirection: "row",
        alignContent: "center",
        justifyContent: "space-evenly"
    }
})

