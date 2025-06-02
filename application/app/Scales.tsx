import {View, Text, StyleSheet, Modal, FlatList} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ScaleContainer from "../components/ScaleContainer";
import Scale from "@/models/Scale";
import Note from "@/models/Note";
import Key from "@/models/Key";
import {useEffect, useState} from "react";
import {getAllNotes} from "@/services/NoteService";
import {getAllScales} from "@/services/ScaleService";
import Routine from "@/models/Routine";
import RoutineBlock from "@/components/RoutineBlock";

interface ScalesScreenProps extends NativeStackScreenProps<RootStackParamList, "Scales">{}

export default function ScaleScreen()
{
    const [notes, setNotes] = useState<Note[]>([]);
    const [scales, setScales] = useState<Scale[]>([]);
    const [modes, setModes] = useState<Scale[]>([]);

    useEffect(() => {
        const loadData = async() => {
            try {
                const [notesData, scalesData] = await Promise.all([
                    getAllNotes(),
                    getAllScales()
                ]);

                setNotes(notesData);
                setScales(scalesData);

                let modeScales: Scale[] = [];

                modeScales.push(scalesData.find(s => s.name === "D Dorian")!);
                modeScales.push(scalesData.find(s => s.name === "E Phrygian")!);
                modeScales.push(scalesData.find(s => s.name === "F Lydian")!);
                modeScales.push(scalesData.find(s => s.name === "G Mixolydian")!);
                modeScales.push(scalesData.find(s => s.name === "A Aeolian")!);
                modeScales.push(scalesData.find(s => s.name === "B Locrian")!);

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
                <View style={styles.categoryContainer}>
                    <ScaleContainer
                        {...scales.find(s => s.quality === "Major"
                        && s.name === "C Major")!}
                    />
                    <ScaleContainer
                        {...scales.find(s => s.quality === "Minor"
                        && s.name === "C Minor")!}
                    />
                </View>
                <View>
                    <Text style={styles.categoryTitle}>Modes</Text>
                    <View style={{width: "100%"}}>
                        <FlatList
                            data={modes}
                            horizontal={true}
                            keyExtractor={(item) => item.id.toString()}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({item}: { item: Scale}) => (
                                <View style={{marginHorizontal: 10, marginTop: 20}}>
                                    <ScaleContainer
                                        {...item}
                                    />
                                </View>
                            )}/>
                    </View>
                </View>
                <Text style={styles.categoryTitle}>Exotic Scales</Text>
                <View style={styles.categoryContainer}>
                    {/*<ScaleContainer
                        {...scale}
                    />
                    <ScaleContainer
                        {...scale}
                    />*/}
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