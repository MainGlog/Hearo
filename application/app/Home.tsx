import {Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {RootStackParamList} from "@/app/index";
import Tab from "@/app/index";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {useEffect, useState} from "react";
import Routine from "@/models/Routine";
import {getAllRoutines} from "@/services/RoutineService";
import RoutineBlock from "@/components/RoutineBlock";
type HomeScreenProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
    const [routines, setRoutines] = useState<Routine[]>([]);
    useEffect(() => {
        const loadData = async() => {
            try {
                const routinesData = await getAllRoutines();
                setRoutines(routinesData);
            }
            catch (error) {
                console.error("Error retrieving routines: " + error);
            }
        }
        loadData();
    }, [])

    return (
        <View>
            <Text style={styles.title}> Hearo </Text>
            <View>
                <Text style={{textAlign: 'center', fontSize: 18, marginVertical: 5}}>Training Modes</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 5}}>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Chords</Text>
                        <Text style={styles.containerText}>
                            Develop your ability to recognize a variety of chords,
                            including major, minor, diminished, augmented, and more
                        </Text>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                style={styles.containerButton}
                                onPress={() => {navigation.navigate('Chords')}}
                            >
                                <Text style={styles.buttonText}>Customize</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Scales</Text>
                        <Text style={styles.containerText}>
                            Improve your ability to identify key signatures, modes,
                            and scale types with the Scales mode
                        </Text>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                style={styles.containerButton}
                                onPress={() => {navigation.navigate('Scales')}}
                            >
                                <Text style={styles.buttonText}>Customize</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <Text style={styles.containerTitle}>Notes</Text>
                        <Text style={styles.containerText}>
                            Listen to a random selection of notes from a range of your choosing and
                            practice your pitch identification skills with the Notes mode
                        </Text>
                        <View style={styles.buttonWrapper}>
                            <TouchableOpacity
                                style={styles.containerButton}
                                onPress={() => {navigation.navigate('Notes')}}
                            >
                                <Text style={styles.buttonText}>Customize</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {routines ?
                <View>
                    <Text style={{...styles.containerTitle, marginVertical: 10}}>Your Routines</Text>
                    <View style={{width: "100%"}}>
                        <FlatList
                            data={routines}
                            horizontal={true}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}: { item: Routine}) => (
                            <View style={{marginHorizontal: 10}}>
                                <RoutineBlock
                                    routine={item}
                                />
                            </View>
                        )}/>
                    </View>
                </View> : null }

                <View>
                    {/*TODO custom built routines*/}
                    <Text style={{...styles.containerTitle, marginVertical: 10}}> Routines for You</Text>
                </View>

                <View style={styles.buttonWrapper}>
                    <TouchableOpacity
                        onPress={() => {
                             navigation.navigate('RoutineBuilder');
                        }}
                        style={styles.containerButton}
                    >
                        <Text style={styles.buttonText}>Create a new Routine</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}
export default HomeScreen;

const styles = StyleSheet.create({
    title: {
        textAlign: 'center',
        fontSize: 24,
        borderBottomWidth: 2,
        backgroundColor: 'yellow'
    },
    container: {
        borderRadius: 20,
        borderWidth: 1,
        minWidth: "30%",
        maxWidth: "32%"
    },
    containerTitle: {
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: 20
    },
    containerText: {
        paddingHorizontal: 2,
        textAlign: 'center'
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'center',
        minWidth: "30%"
    },
    containerButton: {
        minHeight: '10%',
        minWidth: "70%",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 2
    },
    buttonText: {
        textAlign: 'center',
    }
})