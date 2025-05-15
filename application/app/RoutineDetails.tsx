import Routine from "@/models/Routine";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";

interface RoutineDetailsScreenProps extends NativeStackScreenProps<RootStackParamList, 'RoutineDetails'> {}

export default function RoutineDetailsScreen({route} : RoutineDetailsScreenProps) {
    const navigation = useNavigation<NativeStackScreenProps<RootStackParamList, 'RoutineDetails'>['navigation']>();

    let routine = new Routine(route.params.id, route.params.name,
        route.params.exerciseCount, route.params.timeToGuess, route.params.description);

    // TODO fetch exercises for the routine and display them



    return (
        <View>
            <Text style={styles.header}>{routine.name}</Text>
            <Text style={styles.subheader}>{routine.description}</Text>

            <View style={styles.settings}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // TODO popup to update the setting
                    }}
                >
                    <Text style={styles.buttonText}>{routine.exerciseCount}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        // TODO popup to update the setting
                    }}
                >
                    <Text style={styles.buttonText}>{routine.timeToGuess}</Text>
                </TouchableOpacity>
            </View>


            <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        navigation.navigate("Training");
                    }}
                >
                    <Text style={styles.buttonText}>Train</Text>
                </TouchableOpacity>
            </View>
        </View>
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
    subheader: {
        textAlign: 'center',
        fontSize: 20,
        color: 'black',
        marginVertical: 10
    },
    settings: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 16
    },
    button: {
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        marginBottom: 20,
        minWidth: '20%',
        maxWidth: '40%',
        alignContent: 'center'
    }
})