import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet, Image } from 'react-native';
import {name} from 'react-native-sound';

const questions = [
    {
        "question": "The heaviest fish caught in fresh water?",
        "options": [
            "Catfish - 293 kg (Mekong River)",
            "Sturgeon - 212 kg (Volga River)",
            "Carp - 120 kg (Bungsamran Lake)",
            "Piranha - 50 kg (Amazon)"
        ],
        "answerIndex": 0
    },
    {
        "question": "Where does the moon fish (Mola mola) live?",
        "options": [
            "In Lake Baikal",
            "On the Moon",
            "In the open ocean",
            "In your neighbor's aquarium"
        ],
        "answerIndex": 2
    },
    {
        "question": "How old was the oldest sturgeon caught?",
        "options": [
            "25 years old",
            "50 years old",
            "100 years old",
            "152 years old"
        ],
        "answerIndex": 3
    },
    {
        "question": "Which fish was caught on a .... Coke can?",
        "options": [
            "Trout",
            "Shark",
            "Carp",
            "Piranha"
        ],
        "answerIndex": 1
    },
    {
        "question": "The blobfish (Blobfish) is known for:",
        "options": [
            "Can sing",
            "Looks like a jelly fish",
            "Glows in the dark",
            "Flies over water"
        ],
        "answerIndex": 1
    },
    {
        "question": "What was the length of the legendary “monster sturgeon” from Canada?",
        "options": [
            "2 meters",
            "4 meters",
            "6 meters",
            "8 meters"
        ],
        "answerIndex": 2
    },
    {
        "question": "What did fishermen in the Middle Ages use instead of hooks?",
        "options": [
            "Animal bones",
            "Dragon teeth (myth)",
            "Stones",
            "Plant thorns"
        ],
        "answerIndex": 0
    },
    {
        "question": "Which fish can walk on land?",
        "options": [
            "Snakehead",
            "Carp",
            "Salmon",
            "Stingray"
        ],
        "answerIndex": 0
    },
    {
        "question": "Who caught the wish-fulfilling goldfish?",
        "options": [
            "Grandfather from Pushkin's fairy tale",
            "Jeremy Wade (River Monsters)",
            "Ernest Hemingway (The Old Man and the Sea)",
            "Nobody is a myth!"
        ],
        "answerIndex": 0
    },
    {
        "question": "What happened to the fisherman who caught the fish with the “I ♥ NY” ring?",
        "options": [
            "Became mayor of New York City",
            "Got a fine for illegal fishing",
            "Found the owner of the ring through social media",
            "It's a fake!"
        ],
        "answerIndex": 2
    }
]

const QuizGame = ({navigation}) => {
    const [current, setCurrent] = useState(0);
    const [selected, setSelected] = useState(null);
    const [correctCount, setCorrectCount] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showResult, setShowResult] = useState(false);

    const handleChoose = () => {
        if (selected === null) return;

        const isCorrect = selected === questions[current].answerIndex;
        if (isCorrect) {
            setCorrectCount(correctCount + 1);
            nextQuestion();
        } else {
            setShowModal(true);
        }
    };

    const nextQuestion = () => {
        setShowModal(false);
        setSelected(null);
        if (current + 1 === questions.length) {
            setShowResult(true);
        } else {
            setCurrent(current + 1);
        }
    };

    const getResultTitle = () => {
        if (correctCount <= 3) return '🐟 Beginning Hooker';
        if (correctCount <= 6) return '🌊 Intuit fisherman';
        if (correctCount <= 9) return '🏆 Lord of the Waves';
        return '🐋 Master of No Net';
    };

    const getResultDescription = () => {
        if (correctCount <= 3)
            return 'Your knowledge is still at the level of a float... But a sea of possibilities lies ahead!';
        if (correctCount <= 6)
            return 'Your gut is there, but facts are confused with legends. Time to cast the nets of knowledge deeper!';
        if (correctCount <= 9)
            return 'You know where the giants hide and how to catch luck by the tail. Almost a master!';
        return 'You catch facts with your bare hands! Even Neptune applauds your knowledge.';
    };

    if (showResult) {
        return (
            <View style={styles.container}>
                <Image source={require('../../assets/img/big.png')} style={{alignSelf: 'center'}} />
                <Text style={[styles.resultTitle, {color: '#61DFE7', fontSize: 45, fontWeight: '900'}]}>GAME OVER</Text>
                <Text style={styles.resultTitle}>{getResultTitle()}</Text>
                <Text style={styles.resultDescription}>{getResultDescription()}</Text>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                >
                    <Image source={require('../../assets/img/iconamoon_exit-bold.png')} style={{alignSelf: 'center', marginTop: 50}} />
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>

            <TouchableOpacity
                onPress={() => navigation.goBack()}
            >
                <Image source={require('../../assets/img/iconamoon_exit-bold.png')} style={{alignSelf: 'flex-end'}} />
            </TouchableOpacity>

            <Text style={styles.counter}>{`${current + 1}/10`}</Text>
            <Image source={require('../../assets/img/big.png')} style={{alignSelf: 'center'}} />
            <Text style={styles.question}>{questions[current].question}</Text>

            {questions[current].options.map((option, index) => (
                <TouchableOpacity
                    key={index}
                    style={[styles.option, selected === index && styles.selectedOption]}
                    onPress={() => setSelected(index)}
                >
                    <Text style={{padding: 8,paddingHorizontal: 12,  backgroundColor: '#ffff', borderRadius: 8, fontWeight: 'bold'}}>A</Text>
                    <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
            ))}

            <TouchableOpacity onPress={handleChoose} style={styles.chooseBtn}>
                <Text style={styles.chooseText}>CHOOSE</Text>
            </TouchableOpacity>

            <Modal visible={showModal} transparent animationType="slide">
                <View style={styles.modalOverlay}>
                    <View style={styles.modalBox}>
                        <Text style={styles.modalTitle}>INCORRECT</Text>
                        <Text style={styles.modalSub}>You chose the wrong option</Text>
                        <TouchableOpacity onPress={nextQuestion}>
                            <Text style={styles.closeBtn}>✕</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2E217A',
        justifyContent: 'center',
        padding: 20,
    },
    counter: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        marginBottom: 20,
    },
    question: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    option: {
        backgroundColor: '#4A3FA2',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    selectedOption: {
        borderWidth: 2,
        borderColor: 'white',
    },
    optionText: {
        color: 'white',
        fontSize: 16,
    },
    chooseBtn: {
        backgroundColor: '#A6F4F9',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#468083',
        shadowOffset: {
            width: 10,
            height: 10.29,
        },
        shadowOpacity: 10,
        shadowRadius: 0,
        elevation: 5,
    },
    chooseText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#726DF1',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalBox: {
        backgroundColor: '#3C2F91',
        padding: 30,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 28,
        color: '#FF3B3B',
        fontWeight: 'bold',
    },
    modalSub: {
        color: 'white',
        marginTop: 10,
        fontSize: 16,
    },
    closeBtn: {
        fontSize: 24,
        color: 'white',
        marginTop: 20,
    },
    resultTitle: {
        fontSize: 28,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'white',
    },
    resultDescription: {
        fontSize: 18,
        textAlign: 'center',
        marginTop: 20,
        color: '#aaa',
    },
});

export default QuizGame;
