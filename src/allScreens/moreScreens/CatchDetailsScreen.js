import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import {removeCatch} from '../../redux/slices/catchSlice';
import {useDispatch} from 'react-redux';

const CatchDetailsScreen = ({navigation, route}) => {
    const {entry} = route.params;
    const dispatch = useDispatch();
    return (
      <ScrollView style={styles.container}>
        <View
          style={{
            paddingTop: 60,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={require('../../assets/img/Frame1462984549.png')}
              style={{marginBottom: 12}}
            />
          </TouchableOpacity>
        </View>
        <Image source={{uri: entry.selectedImage}} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{entry.title}</Text>
          <Text style={styles.label}>Date</Text>
          <Text style={styles.text}>
            {new Date(entry.date).toLocaleDateString('en-GB', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </Text>

          <Text style={styles.label}>Location</Text>
          <Text style={styles.text}>{entry.location}</Text>

          <Text style={styles.label}>Species</Text>
          <Text style={styles.text}>{entry.species}</Text>

          <Text style={styles.label}>Fish description</Text>
          <Text style={styles.text}>{entry.description}</Text>

          <Text style={styles.label}>Mark</Text>
          <View style={styles.badge}>
            {entry.mark.map((item, index) => (
              <Text style={styles.badgeText}>{item}</Text>
            ))}
          </View>

          <Text style={styles.label}>Weather</Text>
          <View style={styles.badge}>
              {entry.weather.map((item, index) => (
                  <Text style={styles.badgeText}>{item}</Text>
              ))}
          </View>

          <Text style={styles.label}>Spur of the moment</Text>
          <Text style={styles.text}>
              {entry.moment}
          </Text>

          <TouchableOpacity style={styles.deleteButton} onPress={()=>{
              dispatch(removeCatch(entry.id))
              navigation.goBack();
          }}>
            <Text style={styles.deleteText}>Delete</Text>
          </TouchableOpacity>
        </View>
          <View style={{marginBottom: 40}}/>
      </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#2e2e82',
        flex: 1,
    },
    image: {
        width: '100%',
        height: 200,
        borderRadius: 10,
    },
    content: {
        padding: 16,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 12,
    },
    label: {
        color: '#aaa',
        fontSize: 14,
        marginTop: 10,
    },
    text: {
        color: '#fff',
        fontSize: 16,
    },
    badge: {
        paddingVertical: 6,
        // paddingHorizontal: 12,
        borderRadius: 6,
        gap: 8,
        alignSelf: 'flex-start',
        marginTop: 4,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginBottom: 10,
    },
    badgeText: {
        color: '#fff',
        fontWeight: '600',
        backgroundColor: '#5a59b5',
        padding: 8,
        borderRadius: 6,
    },
    deleteButton: {
        backgroundColor: '#e75a4d',
        padding: 14,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
    },
    deleteText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});

export default CatchDetailsScreen;
