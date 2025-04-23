import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Linking} from 'react-native';

const SettingsScreen = () => {
    const [metric, setMetric] = useState(true);

    const openPrivacyPolicy = () => {
        Linking.openURL('https://www.termsfeed.com/live/feac3573-ec8f-4dfb-bba0-a8cc0138edee');
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Settings</Text>

            {/* Иллюстрация */}
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/img/1.png')} // Замени на свою картинку
                    // style={styles.image}
                    resizeMode="contain"
                />
            </View>

            {/*/!* Блок выбора единиц измерения *!/*/}
            {/*<View style={styles.section}>*/}
            {/*    <Text style={styles.sectionTitle}>Units of measurement</Text>*/}

            {/*    <View style={styles.checkboxRow}>*/}
            {/*        <Image source={require('../assets/img/system-uicons_checkbox-empty.png')} />*/}
            {/*        <Text style={styles.checkboxLabel}>Metric system (kg, meters)</Text>*/}
            {/*    </View>*/}

            {/*    <View style={styles.checkboxRow}>*/}
            {/*        <Image source={require('../assets/img/313.png')} />*/}
            {/*        <Text style={styles.checkboxLabel}>Imperial system (pounds, feet)</Text>*/}
            {/*    </View>*/}
            {/*</View>*/}

            {/* Навигационные пункты */}
            <TouchableOpacity style={styles.link} onPress={openPrivacyPolicy}>
                <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.link} onPress={openPrivacyPolicy}>
                <Text style={styles.linkText}>Terms of Use</Text>
            </TouchableOpacity>

            {/*<TouchableOpacity style={styles.link}>*/}
            {/*    <Text style={styles.linkText}>About Developer</Text>*/}
            {/*</TouchableOpacity>*/}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373481', // фон как на скрине
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#fff',
        // marginTop: 40,
        alignSelf: 'center',
    },
    imageContainer: {
        alignItems: 'center',
        marginVertical: 20,
    },
    image: {
        width: 240,
        height: 180,
    },
    section: {
        backgroundColor: 'transparent',
        marginBottom: 20,
    },
    sectionTitle: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 10,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
    },
    checkboxLabel: {
        color: '#fff',
        fontSize: 14,
    },
    link: {
        borderTopWidth: 1,
        borderTopColor: '#5e5e8b',
        paddingVertical: 15,
    },
    linkText: {
        color: '#fff',
        fontSize: 15,
    },
});

export default SettingsScreen;
