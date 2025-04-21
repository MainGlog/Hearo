import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScalesScreen from "@/app/Scales";
import {BottomTabBarProps, createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ScaleScreen from "@/app/Scales";
import BottomNavBar from "@/components/BottomNavBar";
import {FontAwesome} from "@expo/vector-icons";
import AddToRoutineModal from "@/components/AddToRoutineModal";
import Exercise from "@/models/Exercise";
import Scale from "@/models/Scale";
import ScalesDetailsScreen from "@/app/ScalesDetails";

export type RootStackParamList = {
    Home: undefined;
    Scales: undefined;
    ScaleDetails: Scale;
    Modal: [Exercise, boolean];
}


const Tab = createBottomTabNavigator({
    tabBar: (props) => <BottomNavBar/>,
    screens: {
        Scales: ScaleScreen,
        Modal: AddToRoutineModal,
        ScaleDetails: ScalesDetailsScreen
    },
    color: 'black'
})

export default function Index({navigation}: BottomTabBarProps) {

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
            <Tab.Screen name="Scales" component={ScalesScreen} options={{
                headerShown: false,
                tabBarLabel: 'Scales',
                tabBarIcon: ({color}) => <FontAwesome color={color} name={"bar-chart"} size={24}/>
            }}/>
            <Tab.Screen name="ScaleDetails" component={ScalesDetailsScreen} options={{
                headerShown: false,
                // TODO this screen should not render on the bottom navigation bar
            }}/>
        </Tab.Navigator>
    );
}

