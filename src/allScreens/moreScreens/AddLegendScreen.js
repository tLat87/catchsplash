import React, { useState } from 'react';
import {View, Text, TextInput, ScrollView, Button, StyleSheet, TouchableOpacity, Platform, Image} from 'react-native';
import { useDispatch } from 'react-redux';
import DateTimePicker from '@react-native-community/datetimepicker';
import {addCatch} from '../../redux/slices/catchSlice';
import {launchImageLibrary} from 'react-native-image-picker';
import {addLegend} from '../../redux/slices/legendSlice';

const AddLegendScreen = ({ navigation }) => {
    const dispatch = useDispatch();
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [species, setSpecies] = useState('');
    const [description, setDescription] = useState('');
    const [mark, setMark] = useState([]);
    const [tackle, setTackle] = useState('');
    const [weather, setWeather] = useState([]);
    const [moment, setMoment] = useState('');

    const [date, setDate] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);

    const [selectedImage, setSelectedImage] = useState(null);

    const handleChoosePhoto = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
                maxWidth: 800,
                maxHeight: 800,
                quality: 0.8,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.errorCode) {
                    console.log('ImagePicker Error: ', response.errorMessage);
                } else if (response.assets && response.assets.length > 0) {
                    setSelectedImage(response.assets[0].uri);
                }
            }
        );
    };

    const toggleMark = (label) => {
        setMark((prev) =>
            prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
        );
    };

    const toggleWeather = (label) => {
        setWeather((prev) =>
            prev.includes(label) ? prev.filter((w) => w !== label) : [...prev, label]
        );
    };

    const saveCatch = () => {
        dispatch(addLegend({
            title,
            selectedImage,
            date: date.toISOString(),
            location,
            species,
            description,
            mark,
            tackle,
            weather,
            moment,
        }));
        navigation.goBack();
    };

    const marks = ['Trophy', 'Unusual case', 'First fish', 'Just beautiful'];
    const weatherOptions = ['☀️ Clear', '🌤️ Low cloudy', '☁️ Cloudy', '🌧️ Rain', '🌦️ Rain with clearing', '⛈️ Thunderstorm', '🌩️ Heavy rain with thunderstorm', '❄️ Snow', '🌨️ Wet snow', '🌫️ Fog', '💨 Wind', '🌪️ Squally wind', '🌡️ Heat', '💧 Wet (dew)', '🧊 Ice', '🌦️ Changeable weather' ];

    const onChangeDate = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios');
        setDate(currentDate);
    };

    return (
        <ScrollView style={styles.container}>
            <View style={{paddingTop: 60, flexDirection: 'row', justifyContent: 'space-between'}}>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Image source={require('../../assets/img/Frame1462984549.png')} style={{marginBottom: 12}} />
                </TouchableOpacity>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}>
                    Add trophy
                </Text>
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Text style={{color: '#aaa', fontWeight: 'bold', fontSize: 14}}>
                        done
                    </Text>
                </TouchableOpacity>
            </View>

            <Image source={require('../../assets/img/Img.png')} style={{marginBottom: 12, alignSelf: 'center'}} />
            <TouchableOpacity onPress={handleChoosePhoto}>
                {selectedImage ? (
                    <Image
                        source={{ uri: selectedImage }}
                        style={{ width: 200, height: 200,  borderRadius: 10, marginBottom: 12 }}
                    />
                ) : (
                    <Image
                        source={require('../../assets/img/tabler_photo-scan.png')}
                        style={{ marginBottom: 12,}}
                    />
                )}
            </TouchableOpacity>
            <Text style={styles.label}>Title</Text>
            <TextInput
                style={styles.input}
                placeholder="Enter text..."
                placeholderTextColor="#B7AEE0"
                value={title}
                onChangeText={setTitle}
            />
            <Text style={styles.label}>Date and details</Text>
            {Platform.OS === 'ios' ? (
                <DateTimePicker
                    value={date}
                    mode="date"
                    themeVariant="light"
                    display="spinner"
                    onChange={onChangeDate}
                    style={styles.datePicker}
                />
            ) : (
                <Text onPress={() => setShowDatePicker(true)} style={styles.dateText}>
                    {date.toDateString()}
                </Text>
            )}
            {showDatePicker && Platform.OS !== 'ios' && (
                <DateTimePicker value={date} mode="date" display="default" onChange={onChangeDate} />
            )}

            <Text style={styles.label}>Tackle</Text>
            <TextInput style={styles.input} placeholderTextColor='#BAB7FF' placeholder="Location" value={location} onChangeText={setLocation} />

            <Text style={styles.label}>Species</Text>
            <TextInput style={styles.input} placeholderTextColor='#BAB7FF' placeholder="Species" value={species} onChangeText={setSpecies} />

            <Text style={styles.label}>Fish description</Text>
            <TextInput style={styles.input} placeholderTextColor='#BAB7FF' placeholder="Fish description" value={description} onChangeText={setDescription} multiline />

            <Text style={styles.label}>Mark</Text>
            <View style={styles.chipsContainer}>
                {marks.map((m) => (
                    <TouchableOpacity key={m} style={[styles.chip, mark.includes(m) && styles.chipSelected]} onPress={() => toggleMark(m)}>
                        <Text style={{color: '#fff'}}>{m}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.label}>Tackle</Text>
            <TextInput style={styles.input} placeholderTextColor='#BAB7FF' placeholder="Tackle" value={tackle} onChangeText={setTackle} />

            <Text style={styles.label}>Weather</Text>
            <View style={styles.chipsContainer}>
                {weatherOptions.map((w) => (
                    <TouchableOpacity key={w} style={[styles.chip, weather.includes(w) && styles.chipSelected]} onPress={() => toggleWeather(w)}>
                        <Text  style={{color: '#fff'}}>{w}</Text>
                    </TouchableOpacity>
                ))}
            </View>


            <Text style={styles.label}>Spur of the moment</Text>
            <TextInput style={styles.input} placeholderTextColor='#BAB7FF' placeholder="Spur of the moment" value={moment} onChangeText={setMoment} multiline />

            <TouchableOpacity
                onPress={saveCatch}
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
                    Save
                </Text>
            </TouchableOpacity>

            <View style={{marginBottom: 50}}/>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: { padding: 16, backgroundColor: '#373481' },
    input: {
        backgroundColor: '#4D3FA5',
        borderRadius: 10,
        paddingHorizontal: 15,
        marginBottom: 12,
        paddingVertical: 12,
        color: '#FFFFFF',
        fontSize: 16,
    },
    label: { marginBottom: 12, fontWeight: 'bold', fontSize: 16, color: '#FFFFFF' },
    chipsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    chip: {
        backgroundColor: '#5552AC',
        padding: 8,
        margin: 4,
        borderRadius: 10,
    },
    chipSelected: {
        backgroundColor: '#a2d2ff',
    },
    dateText: {
        // backgroundColor: '#4D3FA5',
        borderRadius: 10,
        padding: 15,
        color: '#FFFFFF',
        fontSize: 16,
        textAlign: 'left',
    },
    datePicker: {
        backgroundColor: '#4D3FA5',
        borderRadius: 10,
        marginBottom: 12,
        alignSelf: 'center',
    }
});

export default AddLegendScreen;
