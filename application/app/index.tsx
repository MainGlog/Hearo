import {createNativeStackNavigator} from "@react-navigation/native-stack";
import {BottomTabBarProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ScaleScreen from "@/app/Scales";
import NavBar from "@/components/NavBar";
import {FontAwesome} from "@expo/vector-icons";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import Scale from "@/models/Scale";
import ScalesDetailsScreen from "@/app/ScalesDetails";
import HomeScreen from "@/app/Home";
import ChordsScreen from "@/app/Chords";
import NotesScreen from "@/app/Notes";
import RoutineBuilderScreen from "@/app/RoutineBuilder";
import TrainingScreen from "@/app/Training";

export type RootStackParamList = {
    Home: undefined;
    Scales: undefined;
    Chords: undefined;
    Notes: undefined;
    ScaleDetails: Scale;
    Modal: [Exercise | null, string];
    NavBar: undefined;
    RoutineBuilder: undefined;
    Training: undefined;
}


const Tab = createBottomTabNavigator({
    screens: {
        Scales: ScaleScreen,
        Modal: AddToRoutineModal,
        ScaleDetails: ScalesDetailsScreen,
        Chords: ChordsScreen,
        Notes: NotesScreen,
        RoutineBuilder: RoutineBuilderScreen,
        Training: TrainingScreen
    },
    color: 'black'
})

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
    return (
        /*<Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen}></Stack.Screen>
            <Stack.Screen name="Scales" component={ScaleScreen}></Stack.Screen>
            <Stack.Screen name="Modal" component={AddToRoutineModal}></Stack.Screen>
            <Stack.Screen name="ScaleDetails" component={ScalesDetailsScreen}></Stack.Screen>
        </Stack.Navigator>*/

        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'light blue',
            tabBarActiveBackgroundColor: '#747474',
            tabBarLabelStyle: {
                fontSize: 10
            },
            headerShown: false,
        }}>
            <Tab.Screen name="Home" component={HomeScreen} options={{
                tabBarLabel: 'Home'
            }}/>
            <Tab.Screen name="Scales" component={ScaleScreen} options={{
                tabBarLabel: 'Scales',
                tabBarIcon: ({color}) => <FontAwesome color={color} name={"bar-chart"} size={24}/>
            }}/>
            <Tab.Screen name="ScaleDetails" component={ScalesDetailsScreen} options={{
                // TODO this screen should not render on the bottom navigation bar
            }}/>
        </Tab.Navigator>
    );
}

