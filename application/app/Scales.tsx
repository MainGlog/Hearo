import {View, Text, StyleSheet, Modal} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ScaleContainer from "../components/ScaleContainer";
import Scale from "@/models/Scale";
import Note from "@/models/Note";
import Key from "@/models/Key";

interface ScalesScreenProps extends NativeStackScreenProps<RootStackParamList, "Scales">{}


const note = new Note(
    0, 'C', 'B#', null
)
const notes: Note[] = [note];

const scale = new Scale(
    "Major", require('@/assets/images/scales/Screenshot_17.png'), notes, "Major",
    new Key(0, 'C', 'Major', null, null, null, null, 'A', null)
)

export default function ScaleScreen()
{
    return(
        <>
            <View>
                <Text style={styles.header}>
                    Scales
                </Text>
                <Text style={styles.categoryTitle}>Basic Scales</Text>
                <View style={styles.categoryContainer}>
                    <ScaleContainer
                        {...scale}
                    />
                    <ScaleContainer
                        {...scale}
                    />
                </View>
                <Text style={styles.categoryTitle}>Modes</Text>
                <View style={styles.categoryContainer}>
                    <ScaleContainer
                        {...scale}
                    />
                    <ScaleContainer
                        {...scale}
                    />
                </View>
                <Text style={styles.categoryTitle}>Exotic Scales</Text>
                <View style={styles.categoryContainer}>
                    <ScaleContainer
                        {...scale}
                    />
                    <ScaleContainer
                        {...scale}
                    />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: '#747474',
        textAlign: 'center',
        fontSize: 30,
        color: 'black',
        borderBottomWidth: 3,
        borderColor: 'black'
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: 20,
        borderBottomWidth: 4,
        borderColor: 'black',
    },
    categoryTitle: {
        fontSize: 20,
        textAlign: 'center',
        paddingVertical: 10,
        borderBottomWidth: 4,
        borderColor: 'black'
    }
})