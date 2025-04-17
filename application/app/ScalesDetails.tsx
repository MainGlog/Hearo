import {View, StyleSheet, Text, Image} from "react-native";
import Scale from "@/models/Scale";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
interface ScalesDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, "ScaleDetails"> {}

type Props = {
    scale: Scale
}
export default function ScalesDetailsScreen({scale} : Props){
    return (
        <View>
            <Text style={styles.title}>{scale.name}</Text>
            <View style={styles.imageContainer}>
                {/*/ <Image source={require(scale.imageFilePath)}></Image> /*/}
            </View>
            <View></View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageContainer: {

    },
    title: {
        textAlign: 'center',
    },
    descriptionContainer:{

    },
    modeContainer: {

    },
    optionContainer:{

    }
})