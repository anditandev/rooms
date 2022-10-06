import React, { useState } from 'react';
import { Alert, ActivityIndicator ,Pressable, StyleSheet, View } from 'react-native';
import SortIcon from '@assets/svgs/SortIcon';
import RoomsList from '@components/lists/RoomsList';
import MainText from '@components/texts/MainText';
import { getRoom } from '@apis/rooms';
import { useAppDispatch } from '@hooks/redux';
import { roomsListModified } from '@reducers/roomsSlice';

interface Props {
    sortPressHandler: () => void;
};

const ListView = (props: Props) => {

    const [listRefreshing, setListRefreshing] = useState(false);
    const dispatch = useAppDispatch();

	const getAllRooms = async(time?: number, date?: number) => {
		try {
			const allRooms = await getRoom();
			dispatch(
				roomsListModified(allRooms)
			);
		} catch (e) {
            throw e;
		};
	};

    const refreshList = async() => {
        if (!listRefreshing) {
            setListRefreshing(true);
            await getAllRooms()
            .then(() => {
                setListRefreshing(false);
            })
            .catch((e) => {
                Alert.alert('Error', String(e));
                setListRefreshing(false);
            });
        };
    };

    if (listRefreshing)
        return (
            <View style={styles.container}>
                <ActivityIndicator color={'#000'} size={'large'} />
            </View>
        );

	return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <MainText style={styles.titleText} text={'Rooms'} />
                <Pressable accessibilityLabel='Open sorting view' onPress={props.sortPressHandler} style={styles.iconBtnContainer}>
                    <MainText style={styles.iconText} text={'Sort'} />
                    <View style={styles.iconContainer}>
                        <SortIcon color='#000' />
                    </View>
                </Pressable>
            </View>

            <View style={styles.roomsListContainer}>
                <RoomsList listRefreshing={listRefreshing} refreshList={refreshList} />
            </View>
        </View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        marginTop: 24,
        paddingBottom: 24,
        backgroundColor: '#fff',
	},
    titleText: {
        fontSize: 14,
        lineHeight: 16,
        color: '#AAB2BD',
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    iconBtnContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 'bold',
        color: '#212121',
    },
    iconContainer: {
        height: 10,
        width: 15,
        marginLeft: 6.5,
    },
    roomsListContainer: {
        flex: 1,
        marginTop: 8,
    },
});

export default ListView;
