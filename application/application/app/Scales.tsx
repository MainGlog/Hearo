import {View, Text, StyleSheet} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "../app/index";
import ScaleContainer from "../components/ScaleContainer";
interface ScalesScreenProps extends NativeStackScreenProps<RootStackParamList, "Scales">{}

let scales = []
export default function ScaleScreen()
{
    return(
        <>
            <View>
                <Text style={styles.header}>
                    Scales
                </Text>
                <ScaleContainer
                    scaleName = "Major"
                    scaleImage = {require("../assets/images/scales/Screenshot_17.png")}
                >
                </ScaleContainer>
                <ScaleContainer
                    scaleName = "Major"
                    scaleImage = {require("../assets/images/scales/Screenshot_17.png")}
                >
                </ScaleContainer>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#bdb7b6',
        textAlign: "center",
        fontSize: 30,
        color: "#5759a8"
    },
})