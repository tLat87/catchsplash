import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Provider} from "react-redux";
import {PersistGate} from "redux-persist/integration/react";
import {persistor, store} from "./src/redux/store";
import MainTabNavigator from "./src/navigation/MainTabNavigator";
import CatchDetailsScreen from "./src/allScreens/moreScreens/CatchDetailsScreen";
import AddCatchScreen from "./src/allScreens/moreScreens/AddCatchScreen";
import LegendMoreScreen from "./src/allScreens/moreScreens/LegendMoreScreen";
import QuizGame from "./src/allScreens/moreScreens/QuizGame";
import AddLegendScreen from "./src/allScreens/moreScreens/AddLegendScreen";
import StoryScreen from "./src/allScreens/moreScreens/MoreTextScreen";

const Stack = createStackNavigator();

const Left = () => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity onPress={() => navigation.goBack()}>
        </TouchableOpacity>
    )
}

export default function App() {

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <NavigationContainer>
                    <Stack.Navigator screenOptions={{ headerLeft: Left, headerStyle: { backgroundColor: '#360013' },
                        headerTitleStyle: {
                            color: 'white',
                            fontWeight: 'bold',
                            fontSize: 24,
                        },
                    }}>
                       <Stack.Screen name="MainTab" component={MainTabNavigator} options={{ headerShown: false }} />

                        <Stack.Screen name="AddCatchScreen" component={AddCatchScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="CatchDetailsScreen" component={CatchDetailsScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="LegendMoreScreen" component={LegendMoreScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="QuizGame" component={QuizGame} options={{ headerShown: false }} />
                        <Stack.Screen name="AddLegendScreen" component={AddLegendScreen} options={{ headerShown: false }} />
                        <Stack.Screen name="StoryScreen" component={StoryScreen} options={{ headerShown: false }} />

                    </Stack.Navigator>
                </NavigationContainer>
          </PersistGate>
         </Provider>
    );
}
