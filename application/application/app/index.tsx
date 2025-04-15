import {createNativeStackNavigator} from "@react-navigation/native-stack";
import ScalesScreen from "@/app/Scales";

export type RootStackParamList = {
    Home: undefined;
    Scales: undefined;
}

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function Index() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Scales" component={ScalesScreen}></Stack.Screen>
    </Stack.Navigator>
  );
}
