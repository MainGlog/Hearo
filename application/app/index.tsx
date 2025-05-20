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
import Routine from "@/models/Routine";
import RoutineDetails from "@/app/RoutineDetails";
import RoutineDetailsScreen from "@/app/RoutineDetails";

export type RootStackParamList = {
    TabNavigator: undefined;
    Home: undefined;
    Scales: undefined;
    Chords: undefined;
    Notes: undefined;
    ScaleDetails: Scale;
    Modal: [Exercise | null, string];
    NavBar: undefined;
    RoutineBuilder: undefined;
    Training: undefined;
    RoutineDetails: Routine;
}


export const Tab = createBottomTabNavigator({
    screens: {
        Home: HomeScreen,
        Scales: ScaleScreen,
        ScaleDetails: ScalesDetailsScreen,
        Modal: AddToRoutineModal,
        Chords: ChordsScreen,
        Notes: NotesScreen,
        RoutineBuilder: RoutineBuilderScreen,
        RoutineDetails: RoutineDetailsScreen,
        Training: TrainingScreen,
    },
    color: 'black'
})

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
    return (
        <Tab.Navigator screenOptions={{
            tabBarActiveTintColor: 'black',
            tabBarInactiveTintColor: 'light blue',
            tabBarActiveBackgroundColor: '#747474',
            tabBarLabelStyle: {
                fontSize: 10
            },
            headerShown: false,
        }}>

            <Tab.Screen
                name="Home"
                component={HomeScreen as React.ComponentType<any>}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => <FontAwesome color={color} name={"bar-chart"} size={24}/>,
                    tabBarStyle: {marginLeft: "12.5%"}
                }}
            />
            <Tab.Screen
                name="ScaleDetails"
                component={ScalesDetailsScreen as React.ComponentType<any>}
                options={{
                    tabBarButton: () => null
                }}
            />
            <Tab.Screen
                name="Scales"
                component={ScaleScreen}
                options={{
                    tabBarLabel: 'Scales',
                    tabBarIcon: ({color}) => <FontAwesome color={color} name={"bar-chart"} size={24}/>,
                }}
            />

            <Tab.Screen
                name="RoutineDetails"
                component={RoutineDetailsScreen as React.ComponentType<any>}
                options={{
                tabBarButton: () => null
            }}/>
        </Tab.Navigator>
    );
}
/*
<Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'light blue',
                tabBarActiveBackgroundColor: '#747474',
                tabBarLabelStyle: {
                    fontSize: 10
                },
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="HomeStack"
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({color}) => <FontAwesome color={color} name="home" size={24}/>
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="RoutineDetails" component={RoutineDetails} options={{ headerShown: false }} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen
                name="ScalesStack"
                options={{
                    tabBarLabel: 'Scales',
                    tabBarIcon: ({color}) => <FontAwesome color={color} name="bar-chart" size={24}/>
                }}
            >
                {() => (
                    <Stack.Navigator>
                        <Stack.Screen name="Scales" component={ScaleScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="ScaleDetails" component={ScalesDetailsScreen} options={{ headerShown: false }} />
                    </Stack.Navigator>
                )}
            </Tab.Screen>

            <Tab.Screen
                name="Training"
                component={TrainingScreen}
                options={{
                    tabBarLabel: 'Training',
                    tabBarIcon: ({color}) => <FontAwesome color={color} name="play" size={24}/>
                }}
            />

            <Tab.Screen
                name="RoutineBuilder"
                component={RoutineBuilderScreen}
                options={{
                    tabBarLabel: 'Routines',
                    tabBarIcon: ({color}) => <FontAwesome color={color} name="list" size={24}/>
                }}
            />
        </Tab.Navigator>
 */