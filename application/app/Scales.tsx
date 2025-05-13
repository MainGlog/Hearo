import {View, Text, StyleSheet, Modal} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app/index";
import ScaleContainer from "../components/ScaleContainer";
import Scale from "@/models/Scale";
import Note from "@/models/Note";
import Key from "@/models/Key";
import {fetchNotes, fetchScales} from "@/app/Data"
import keys from "@/services/ApiService"
import {useEffect, useState} from "react";

interface ScalesScreenProps extends NativeStackScreenProps<RootStackParamList, "Scales">{}

export default function ScaleScreen()
{
    const [notes, setNotes] = useState<Note[]>([]);
    const [scales, setScales] = useState<Scale[]>([]);

    useEffect(() => {
        // TODO this takes < 10 seconds to fetch
        const loadData = async() => {
            try {
                const [notesData, scalesData] = await Promise.all([
                    fetchNotes(),
                    fetchScales()
                ]);

                setNotes(notesData);
                setScales(scalesData);
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
                <Text style={styles.categoryTitle}>Modes</Text>
                <View style={styles.categoryContainer}>
                    <ScaleContainer
                        {...scales.find(s => s.quality === "Major"
                        && s.name === "D Dorian")!}
                    />
                    <ScaleContainer
                        {...scales.find(s => s.quality === "Minor")!}
                    />
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