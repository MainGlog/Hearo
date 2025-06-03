import {View, Text, StyleSheet, FlatList} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ScaleContainer from "../components/ScaleContainer";
import Scale from "@/models/Scale";
import Note from "@/models/Note";

import {useEffect, useState} from "react";
import {getAllNotes} from "@/services/NoteService";
import {getAllScales} from "@/services/ScaleService";

interface ScalesScreenProps extends NativeStackScreenProps<RootStackParamList, "Scales">{}

export default function ScaleScreen()
{
    const [notes, setNotes] = useState<Note[]>([]);
    const [scales, setScales] = useState<Scale[]>([]);
    const [modes, setModes] = useState<Scale[]>([]);
    const [basicScales, setBasicScales] = useState<Scale[]>([]);

    useEffect(() => {
        const loadData = async() => {
            try {
                // Fetches the data from the API endpoints
                const [notesData, scalesData] = await Promise.all([
                    getAllNotes(),
                    getAllScales()
                ]);

                // Sets the stateful variables to the defined data
                // Anything that must use values from the notes or scales in this block must use notesData or scalesData
                // The stateful variables may not be assigned yet
                setNotes(notesData);
                setScales(scalesData);

                // Adds the basic scales to the list that will be rendered to the screen
                let basics: Scale[] = [];
                let basicNames: string[] = [
                    "C Major", "C Minor", "C Harmonic Minor", "C Melodic Minor (Ascending)"
                ];
                for (let i = 0; i < basicNames.length; i++) {
                    basics.push(scalesData.find(s => s.name === basicNames[i])!);
                }
                setBasicScales(basics);

                // Adds the mode scales to the list that will be rendered to the screen
                let modeScales: Scale[] = [];
                let modeNames: string[] = [
                    "D Dorian", "E Phrygian", "F Lydian", "G Mixolydian", "A Aeolian", "B Locrian"
                ];
                for (let i = 0; i < modeNames.length; i++) {
                    modeScales.push(scalesData.find(s => s.name === modeNames[i])!);
                }

                setModes(modeScales);

            }
            catch (error) {
                console.error("Error retrieving notes and scales from API:" + error);
            }
        }
        loadData();
    }, [])

    return(
        <>
            <View>
                <Text style={styles.header}>
                    Scales
                </Text>

                <Text style={styles.categoryTitle}>Basic Scales</Text>
                {basicScales ?
                <View>
                    <View style={{width: "100%", marginLeft: 15}}>
                        <FlatList
                            data={basicScales}
                            showsHorizontalScrollIndicator={false}
                            numColumns={2}
                            renderItem={({item}: { item: Scale}) => (
                                <View style={{marginHorizontal: 30, marginTop: 20}}>
                                    <ScaleContainer
                                        {...item}
                                    />
                                </View>
                            )}/>
                    </View>
                </View> : null}

                <Text style={styles.categoryTitle}>Modes</Text>
                {modes ?
                <View>
                    <View style={{width: "100%"}}>
                        <FlatList
                            data={modes}
                            showsHorizontalScrollIndicator={false}
                            numColumns={3}
                            renderItem={({item}: { item: Scale}) => (
                                <View style={{marginHorizontal: 3, marginTop: 20}}>
                                    <ScaleContainer
                                        {...item}
                                    />
                                </View>
                            )}/>
                    </View>
                </View> : null}
                {/*<Text style={styles.categoryTitle}>Exotic Scales</Text>
                <View style={styles.categoryContainer}>
                    <ScaleContainer
                        {...scale}
                    />
                    <ScaleContainer
                        {...scale}
                    />
                </View>*/}
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