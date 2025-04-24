import {Text, View} from "react-native";

export default function HomeScreen(){
    return (
        <View>
            <Text> Title </Text>
            <View>
                <Text>Training Modes</Text>
                <View>
                    <View>
                        // TODO Chords block
                    </View>
                    <View>
                        // TODO Scales block
                    </View>
                    <View>
                        // TODO Notes block
                    </View>
                </View>
                <View>
                    <Text>Your Routines</Text>
                    // TODO map routines into blocks
                </View>
                <View>
                    <Text> Routines for You</Text>
                    // TODO custom built routines
                </View>

                <View>
                    <Text>Create a new Routine</Text>
                </View>

            </View>
        </View>
    )
}