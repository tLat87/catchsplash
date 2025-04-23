import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import {useNavigation} from '@react-navigation/native';

const legends = [
    {
        id: '1',
        title: 'Caught on a stiletto',
        story: '«The case was on a remote forest lake, where I come every summer. That day I decided to try a new wobbler, but as luck would...',
        full: '«The case was on a remote forest lake, where I come every summer. That day I decided to try a new wobbler, but as luck would have it, I snagged it on a snag. \n' +
            'The tackle was gone, and I was about to go home, when suddenly I noticed a rusty lock pin on the shore. An old story about how unusual things can bring good luck came to mind. I tied the pin to the line, threw it in and, to my surprise, in a minute I pulled out a 3 kg pike! It was so beautiful, with brightly colored scales that I could not believe my eyes. \n' +
            'Since then I always carry the pin in a box as a talisman - it has become a symbol of good luck for me on fishing. Now when I see it, I think back to that amazing day and laugh at how a simple thing can make a difference.»'
    },
    {
        id: '2',
        title: 'Ghost Pike',
        story: '«On Ladoga, I heard many legends about a pike with white scales that was supposedly seen by one angler in the fog. He had been t...',
        full: '«The case was on a remote forest lake, where I come every summer. That day I decided to try a new wobbler, but as luck would have it, I snagged it on a snag. \n' +
            'The tackle was gone, and I was about to go home, when suddenly I noticed a rusty lock pin on the shore. An old story about how unusual things can bring good luck came to mind. I tied the pin to the line, threw it in and, to my surprise, in a minute I pulled out a 3 kg pike! It was so beautiful, with brightly colored scales that I could not believe my eyes. \n' +
            'Since then I always carry the pin in a box as a talisman - it has become a symbol of good luck for me on fishing. Now when I see it, I think back to that amazing day and laugh at how a simple thing can make a difference.»'
    },
    {
        id: '3',
        title: 'Two Rings - One Fate',
        story: '«On one of his fishing trips, a man named Sergei lost his wedding ring in the river. He searched for it for several days, but in vain...',
        full: "«On Ladoga, I heard many legends about a pike with white scales that was supposedly seen by one angler in the fog. He had been telling this story for 20 years, and everyone laughed, thinking he was making it up. \n" +
            "But in the winter of 2018, he took his friends fishing, and as the fog enveloped the lake, he suddenly felt something unusual happening. And then, unexpectedly, a pike with white scales popped out from under the ice! It weighed as much as 12 kilograms. \n" +
            "The man, not believing his eyes, photographed it and released it back into the water, saying: “Let it remain a legend.” This event became a local sensation, and now every fisherman on Ladoga dreams of catching his own ghost pike.»"
    },
    {
        id: '4',
        title: 'Invisible Carp',
        story: '«In a pond near Kiev, local fishermen had been catching carp for 10 years, but everyone bypassed the snag near the island...',
        full: '«On one of his fishing trips, a man named Sergei lost his wedding ring in the river. He searched for it for several days, but in vain. \n' +
            'A year later, during another fishing trip, he caught a pikeperch and when he started cleaning the fish, he suddenly found... his ring! \n' +
            'The inscription inside matched, and he couldn\'t believe that fate had played him that way. From that moment on, Sergei started fishing only with his wife, believing that it brings good luck. \n' +
            'Every time they go fishing, they remember this story and smile, because it has become a symbol of their love and understanding.»'
    },
    {
        id: '5',
        title: 'Sturgeon Thank You',
        story: '«In Astrakhan, a fisherman named Pavel caught a 50 kg sturgeon. It was a real find! Before releasing the fish, he whispered: «Bring...',
        full: '«In a pond near Kiev, local fishermen had been catching carp for 10 years, but everyone bypassed the snag near the island, sure that it was empty. \n' +
            'One novice, unaware of this, cast corn there and suddenly felt a strong pull on the line. \n' +
            'He pulled out a 25 kg carp, and everyone was shocked! It turned out that this monster had been hiding in an underwater cave for years, and no one had even guessed about its existence. \n' +
            'This story quickly spread around the neighborhood, and now every fisherman, coming to the pond, dreams of catching his own invisible carp, which, perhaps, is also waiting for its time.»'
    },
];

const LegendsScreen = () => {
    const navigation = useNavigation();
    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={()=>{navigation.navigate('StoryScreen', {item})}}>
            <View style={styles.textContainer}>
                <Text style={styles.title}>{item.title}</Text>
                <Text style={styles.story}>{item.story}</Text>
            </View>
            {/*<TouchableOpacity style={styles.heartIcon}>*/}
            {/*    <Image source={require('../assets/img/fluent_heart-12-regular.png')} />*/}
            {/*</TouchableOpacity>*/}
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Fishing legends</Text>

            <Image
                source={require('../assets/img/Img.png')}
                style={styles.image}
                resizeMode="contain"
            />

            <FlatList
                data={legends}
                keyExtractor={item => item.id}
                renderItem={renderItem}
                contentContainerStyle={styles.list}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373481',
        // paddingTop: 50,
        paddingHorizontal: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
    },
    image: {
        width: '100%',
        height: 180,
        marginVertical: 20,
    },
    list: {
        paddingBottom: 40,
    },
    card: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#5e5e8b',
        paddingBottom: 15,
    },
    textContainer: {
        flex: 1,
        paddingRight: 10,
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 15,
        marginBottom: 5,
    },
    story: {
        color: '#ccc',
        fontSize: 13,
        lineHeight: 18,
    },
    heartIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default LegendsScreen;
