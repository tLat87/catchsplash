import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const StoryScreen = ({route}) => {
    const navigation = useNavigation();
    const {item} = route.params;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                    source={require('../../assets/img/Frame1462984549.png')}

                />

            </TouchableOpacity>

            <Image
                source={require('../../assets/img/Img.png')} // заменить на нужный путь
                style={styles.image}
            />

            <Text style={styles.title}>{item.title}</Text>

            <Text style={styles.paragraph}>
                {item.full}
            </Text>


        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2e82',
        flex: 1,
        paddingTop: 80,
        padding: 20,
        flexGrow: 1,
    },
    backText: {
        color: '#8bd3ff',
        fontSize: 16,
        marginBottom: 10,
    },
    image: {
        alignSelf: 'center',
        width: 180,
        height: 180,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#ffffff',
        marginBottom: 10,
    },
    paragraph: {
        color: '#ccccff',
        fontSize: 16,
        lineHeight: 24,
        marginBottom: 12,
    },
    heartButton: {
        position: 'absolute',
        top: 20,
        right: 20,
    },
    heart: {
        fontSize: 24,
    },
});

export default StoryScreen;
