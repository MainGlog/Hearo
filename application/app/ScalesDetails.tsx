import {View, StyleSheet, Text, Image} from "react-native";
import Scale from "@/models/Scale";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
interface ScalesDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, "ScaleDetails"> {}

//@ts-ignore
export default function ScalesDetailsScreen({route}){
    const scale = new Scale(route.params.name, route.params.imageFilePath);

    return (
        <View>
            <Text style={styles.title}>{scale!.name} Scale</Text>
            <View style={styles.imageContainer}>
                <Image style={styles.imageContainer} source={scale!.imageFilePath}></Image>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {
        maxWidth: "99%",
        maxHeight: 125
    },
    title: {
        textAlign: 'center',
        fontSize: 30
    },
    descriptionContainer:{

    },
    modeContainer: {

    },
    optionContainer:{

    }
})