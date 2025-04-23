import * as React from 'react';
import { Text, Pressable, View, StyleSheet } from 'react-native';
import {
    NavigationHelpersContext,
    useNavigationBuilder,
    TabRouter,
    TabActions, createNavigatorFactory,
} from '@react-navigation/native';

export default function TabNavigator(id: string, initialRouteName: string,
                        children: any[]) {
    const { state, navigation, descriptors, NavigationContent } =
        useNavigationBuilder(TabRouter, {
            id,
            initialRouteName,
            children
        });

    return (
        <NavigationContent>
            <View style={[{ flexDirection: 'row' }, styles.tabBar]}>
                {state.routes.map((route, index) => (
                    <Pressable
                        key={route.key}
                        onPress={() => {
                            const isFocused = state.index === index;
                            const event = navigation.emit({
                                type: 'tabPress',
                                target: route.key,
                                canPreventDefault: true,
                            });

                            if (!isFocused) {
                                navigation.dispatch({
                                    ...TabActions.jumpTo(route.name, route.params),
                                    target: state.key,
                                });
                            }
                        }}
                        style={{ flex: 1 }}
                    >
                        <Text>Name</Text>
                    </Pressable>
                ))}
            </View>
            <View style={[{ flex: 1 }, styles.content]}>
                {state.routes.map((route, i) => {
                    return (
                        <View
                            key={route.key}
                            style={[
                                StyleSheet.absoluteFill,
                                { display: i === state.index ? 'flex' : 'none' },
                            ]}
                        >
                            {descriptors[route.key].render()}
                        </View>
                    );
                })}
            </View>
        </NavigationContent>
    );
}

const styles = StyleSheet.create({
    tabBar: {

    },
    content: {

    }
})