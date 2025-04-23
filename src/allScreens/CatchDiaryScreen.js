import React, {useState} from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList, Modal,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const FilterModal = ({ visible, onClose, filters, setFilters }) => {
    const toggleOption = (key, value) => {
        setFilters((prev) => {
            const current = prev[key];
            return {
                ...prev,
                [key]: current.includes(value)
                    ? current.filter((v) => v !== value)
                    : [...current, value],
            };
        });
    };

    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={{
                flex: 1,
                backgroundColor: 'rgba(0,0,0,0.7)',
                justifyContent: 'flex-end',
                marginBottom: 100,
            }}>
                <View style={{
                    backgroundColor: '#373481',
                    borderTopLeftRadius: 20,
                    borderTopRightRadius: 20,
                    padding: 20,
                }}>
                    <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 18 }}>Filters</Text>

                    <Text style={{ color: '#ccc', marginTop: 10 }}>by type</Text>
                    <TouchableOpacity onPress={() => toggleOption('fishType', 'Pike')}>
                        <Text style={{ color: filters.fishType.includes('Pike') ? '#8DECF3' : '#fff' }}>✓ Pike</Text>
                    </TouchableOpacity>

                    <Text style={{ color: '#ccc', marginTop: 10 }}>by location</Text>
                    <TouchableOpacity onPress={() => toggleOption('location', 'Oka River, Kaluga Region')}>
                        <Text style={{ color: filters.location.includes('Oka River, Kaluga Region') ? '#8DECF3' : '#fff' }}>✓ Oka River, Kaluga Region</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => toggleOption('location', 'Lake Svetloye, Karelia')}>
                        <Text style={{ color: filters.location.includes('Lake Svetloye, Karelia') ? '#8DECF3' : '#fff' }}>✓ Lake Svetloye, Karelia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={onClose} style={{ marginTop: 20, alignSelf: 'flex-end' }}>
                        <Text style={{ color: '#8DECF3', fontWeight: 'bold' }}>Done</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};


const DiarySection = ({ title, showFilter, filters, onFilterPress }) => {
    const navigation = useNavigation();
    const data = useSelector((state) => state.catch.catches);

    const filteredData = data.filter((entry) => {
        const fishMatch = filters.fishType.length === 0 || filters.fishType.includes(entry.fishType);
        const locationMatch = filters.location.length === 0 || filters.location.includes(entry.location);
        return fishMatch && locationMatch;
    });

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity onPress={onFilterPress}>
                    <Image source={require('../assets/img/mynaui_filter.png')} />
                </TouchableOpacity>
            </View>
            {filteredData.length === 0 ? (
                <View>
                    <Image source={require('../assets/img/1.png')} style={{ alignSelf: 'center' }} />
                    <Text style={{ fontSize: 16, fontWeight: '600', color: '#fff', alignSelf: 'center' }}>
                        There's nothing here yet
                    </Text>
                </View>
            ) : (
                filteredData.map((entry) => (
                    <TouchableOpacity key={entry.id} style={styles.entryRow} onPress={() => navigation.navigate('CatchDetailsScreen', { entry })}>
                        <Image source={{ uri: entry.selectedImage }} style={styles.entryImage} />
                        <View style={styles.entryContent}>
                            <Text style={styles.entryTitle}>{entry.title}</Text>
                            <Text style={styles.entryDate}>
                                {new Date(entry.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </Text>
                        </View>
                        <Text style={styles.entryTag}>{entry.mark}</Text>
                    </TouchableOpacity>
                ))
            )}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCatchScreen')}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};


const TrophySection = ({ title, showFilter, filters, onFilterPress }) => {
    const navigation = useNavigation();
    const data = useSelector((state) => state.legend.legends);

    const filteredData = data.filter((entry) => {
        const fishMatch = filters.fishType.length === 0 || filters.fishType.includes(entry.fishType);
        const locationMatch = filters.location.length === 0 || filters.location.includes(entry.location);
        return fishMatch && locationMatch;
    });

    return (
        <View style={styles.section}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <TouchableOpacity onPress={onFilterPress}>
                    <Image source={require('../assets/img/mynaui_filter.png')} />
                </TouchableOpacity>
            </View>

            {filteredData.length === 0 ? (
                <View>
                    <Image
                        source={require('../assets/img/1.png')}
                        style={{ alignSelf: 'center' }}
                    />
                    <Text style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: '#fff',
                        alignSelf: 'center'
                    }}>
                        There's nothing here yet
                    </Text>
                </View>
            ) : (
                filteredData.map((entry) => (
                    <TouchableOpacity
                        key={entry.id}
                        style={styles.entryRow}
                        onPress={() => navigation.navigate('LegendMoreScreen', { entry })}
                    >
                        <Image source={{ uri: entry.selectedImage }} style={styles.entryImage} />
                        <View style={styles.entryContent}>
                            <Text style={styles.entryTitle}>{entry.title}</Text>
                            <Text style={styles.entryDate}>
                                {new Date(entry.date).toLocaleDateString('en-GB', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric',
                                })}
                            </Text>
                        </View>
                        <Text style={styles.entryTag}>{entry.tag}</Text>
                    </TouchableOpacity>
                ))
            )}

            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddLegendScreen')}>
                <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
        </View>
    );
};


const CatchDiaryScreen = () => {
    const [filterVisible, setFilterVisible] = useState(false);
    const [filters, setFilters] = useState({
        fishType: [],
        location: [],
        displayAs: null,
    });

    const toggleFilter = () => setFilterVisible(!filterVisible);

    return (
        <>
            <ScrollView style={styles.container}>
                <Text style={styles.header}>Catch diary</Text>
                <DiarySection title="Catch diary" filters={filters} onFilterPress={toggleFilter} />
                <TrophySection title="Trophy Collection" filters={filters} onFilterPress={toggleFilter} />
            </ScrollView>

            <FilterModal
                visible={filterVisible}
                onClose={() => setFilterVisible(false)}
                filters={filters}
                setFilters={setFilters}
            />
        </>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#373481',
        paddingHorizontal: 20,
        // paddingTop: 50,
    },
    header: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
    },
    section: {
        marginBottom: 30,
    },
    sectionHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: '600',
        color: '#fff',
    },
    entryRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 15,
        borderBottomWidth: 1,
        borderColor: '#5e5e8b',
        paddingBottom: 10,
    },
    entryImage: {
        width: 50,
        height: 50,
        borderRadius: 10,
        marginRight: 10,
    },
    entryContent: {
        flex: 1,
    },
    entryTitle: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 14,
    },
    entryDate: {
        fontSize: 12,
        color: '#ccc',
    },
    entryTag: {
        color: '#ccc',
        fontSize: 12,
        borderBottomWidth: 1,
        alignSelf: 'flex-start',
        borderColor: '#ccc',
    },
    addButton: {
        marginTop: 10,
        backgroundColor: '#8DECF3',
        borderRadius: 10,
        alignItems: 'center',
        paddingVertical: 12,
    },
    addButtonText: {
        fontWeight: 'bold',
        color: '#fff',
        fontSize: 16,
    },
});

export default CatchDiaryScreen;
