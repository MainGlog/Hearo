import {View, StyleSheet, Text} from "react-native";

export default function BottomNavBar(){
    return (
        <View style={styles.container}>
            <Text>NavBar</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        backgroundColor: '#747474',
    },
    icon: {
        marginVertical: 5,
    }
})