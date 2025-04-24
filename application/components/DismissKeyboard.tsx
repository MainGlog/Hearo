import {Keyboard, TouchableWithoutFeedback} from "react-native";
import {ReactNode} from "react";


export default function DismissKeyboard({children}: {children: ReactNode}) {
    return (
    <TouchableWithoutFeedback
        onPress={() => Keyboard.dismiss()}
    >
        {children}
    </TouchableWithoutFeedback>);
}