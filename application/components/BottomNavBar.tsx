import {View, StyleSheet, Text, TouchableOpacity} from "react-native";
import {NativeStackScreenProps} from "@react-navigation/native-stack";
import {RootStackParamList} from "@/app";
import {FontAwesome} from "@expo/vector-icons";

interface NavBarProps extends NativeStackScreenProps<RootStackParamList, "NavBar">{}
export default function BottomNavBar({navigation}: NavBarProps){
    return (
        <View style={styles.container}>
            <Text>NavBar</Text>
            <TouchableOpacity
                onPress={() => navigation.navigate("Home")}
            >

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Scales")}
            >
                <FontAwesome color={'black'} name={"bar-chart"} size={24}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#747474',
        fontSize: 10,
        position: "sticky",
        bottom: 0
    },
    icon: {
        marginVertical: 5,
    }
})