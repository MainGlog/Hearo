import {Text, View, StyleSheet, TouchableOpacity, FlatList} from "react-native";
import {RootStackParamList} from "@/app/index";
import {BottomTabScreenProps} from "@react-navigation/bottom-tabs";
import {useCallback, useState} from "react";
import Routine from "@/models/Routine";
import {getAllRoutines} from "@/services/RoutineService";
import RoutineBlock from "@/components/RoutineBlock";
import {getAllSERoutines} from "@/services/SERoutineService";
import Exercise from "@/models/Exercise";
import {getAllScaleExercises} from "@/services/ScaleExerciseService";
import {useFocusEffect} from '@react-navigation/native';

type HomeScreenProps = BottomTabScreenProps<RootStackParamList, 'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }: HomeScreenProps) => {
    const [routines, setRoutines] = useState<Routine[]>([]);

    const fetchData = useCallback(async() => {
        try {
            const routinesData = await getAllRoutines();
            const scaleExercisesData = await getAllScaleExercises();
            const seRoutinesData = await getAllSERoutines();

            // Sets exercises array of each routine
            for (const routine of routinesData) {
                routine.exercises = seRoutinesData
                    .filter(ser => ser.routineId === routine.id)
                    .map(ser => {
                        const scaleExercise = scaleExercisesData.find(se => se.id === ser.exerciseId)!;
                        return new Exercise(
                            'scale', ser.exerciseId, null, null, scaleExercise.scaleId,
                            scaleExercise.listeningMode, scaleExercise.timePerNote,
                            scaleExercise.numberOfNotes, scaleExercise.numberOfOctaves
                        );
                    });
            }

            setRoutines(routinesData);
        }
        catch (error) {
            console.error("Error retrieving routines:", error);
        }
    }, [setRoutines]);
    // setRoutines is the only external value used inside the callback that could potentially change
    // Additionally, setRoutines is from useState, meaning it will never change
    // This ensures that fetchData will maintain the same reference throughout the component's lifecycle
    // Using useCallback memoizes the function, meaning it caches the creation of the function
    // This prevents unnecessary re-renders of child components receiving these functions
    // as well as saving resources

    // This will be called anytime the page is focused, such as being navigated to
    useFocusEffect(
        useCallback(() => {
            console.log('Home Screen Focused');
            fetchData();

            // Cleanup function, called when the screen loses focus or the component unmounts
            // Prevents memory leaks and runs before the next focus effect is executed
            return () => {
                console.log('Home Screen Unfocused');
            };
        }, [fetchData])
        // fetchData will never change, ensuring this callback doesn't re-create a focus effect on re-renders
    );

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
                                    {...item}
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
        backgroundColor: '#e3e1e7',
        minWidth: "30%",
        maxWidth: "32%"
    },
    containerTitle: {
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
        alignContent: 'center',
        minWidth: "30%"
    },
    containerButton: {
        minHeight: '10%',
        minWidth: "70%",
        backgroundColor: '#d1cfd9',
        borderRadius: 20,
        paddingHorizontal: 2
    },
    buttonText: {
        textAlign: 'center',
    }
})