import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Image, Text} from 'react-native';
import SettingsScreen from '../allScreens/SettingsScreen';
import LegendsScreen from '../allScreens/LegendsScreen';
import CatchDiaryScreen from '../allScreens/CatchDiaryScreen';
import QuizScreen from '../allScreens/QuizScreen';

const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                // headerShown: false,
                headerTitle: '',
                headerStyle: {
                    backgroundColor: '#373481',
                },
                tabBarStyle: {
                    backgroundColor: '#5552AC',
                },
               tabBarLabelStyle: {
                    color: '#EBEBF580',
               },
                tabBarActiveTintColor: '#fff',
                tabBarInactiveTintColor: '#EBEBF580',
                tabBarLabel: ({ focused, color }) => (
                    <Text style={{ color, fontSize: 12 }}>
                        {route.name}
                    </Text>
                ),
                headerShadowVisible: false,
            })}
        >
            <Tab.Screen
                name="CatchDiaryScreen"
                component={CatchDiaryScreen}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: 12 }}>
                            Home
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/img/carbon_home.png')}  />
                    ),
                }}
            />
            <Tab.Screen
                name="LegendsScreen"
                component={LegendsScreen}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: 12 }}>
                            Legends
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/img/carbon_book.png')}  />
                    ),
                }}
            />
            <Tab.Screen
                name="QuizScreen"
                component={QuizScreen}
                options={{
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={{ color, fontSize: 12 }}>
                            Quiz
                        </Text>
                    ),
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/img/icon-park-outline_game-ps.png')}  />
                    ),
                }}
            />
            <Tab.Screen
                name="Settings"
                component={SettingsScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <Image source={require('../assets/img/solar_settings-outline.png')}  />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default MainTabNavigator;
