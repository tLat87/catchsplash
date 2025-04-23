import {Image, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const QuizScreen = ({ navigation }) => {
    return (
        <View style={{flex: 1,
            backgroundColor: '#373481',
            paddingTop: 70,
            paddingHorizontal: 20}}>

            <Text style={{color:'white', fontWeight: '900', fontSize: 25, textAlign: 'center'}}>
                What do you know about incredible fishing?
            </Text>
            <Image source={require('../assets/img/big.png')} style={{alignSelf: 'center'}} />

            <TouchableOpacity
                onPress={() => navigation.navigate('QuizGame')}
                style={{
                    backgroundColor: '#83F8FF',
                    padding: 20,
                    alignItems: 'center',
                    width: '50%',
                    alignSelf: 'center',
                    borderRadius: 10,
                    shadowColor: '#468083',
                    shadowOffset: {
                        width: 10,
                        height: 10.29,
                    },
                    shadowOpacity: 10,
                    shadowRadius: 0,
                    elevation: 5,
                }}
            >
                <Text
                    style={{
                        color: '#726DF1',
                        fontWeight: '900',
                        fontSize: 25,
                        textAlign: 'center',
                    }}
                >
                    play
                </Text>
            </TouchableOpacity>

        </View>
    );
};

export default QuizScreen
