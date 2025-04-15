import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScalesScreen from "@/app/Scales";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import ScaleScreen from "@/app/Scales";
import BottomNavBar from "@/components/BottomNavBar";
import {FontAwesome} from "@expo/vector-icons";

export type RootStackParamList = {
    Home: undefined;
    Scales: undefined;
}

const Tab = createBottomTabNavigator({
    tabBar: (props) => <BottomNavBar/>,
    screens: {
        Scales: ScaleScreen
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
        <Tab.Screen name="Scales" component={ScalesScreen} options={{
            headerShown: false,
            tabBarLabel: 'Scales',
            tabBarIcon: ({color}) => <FontAwesome color={color} name={"bar-chart"} size={24}/>
        }}></Tab.Screen>
    </Tab.Navigator>
  );
}

