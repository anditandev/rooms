import React, { useState } from 'react';
import { useAppSelector } from '@hooks/redux';
import { FlatList, ListRenderItem, RefreshControl, StyleSheet, Text, View } from 'react-native';
import RoomView from './items/RoomView';
import { RoomType, SortType } from '@apptypes/index';
import { deepCopyRoomsList, getSortedArrayList, setRoomAvailabilities } from '@helpers/roomHelper';
import MainTextButton from '@components/buttons/MainTextButton';
import MainText from '@components/texts/MainText';

const getFreshSortedList = (
    roomsList: RoomType[], 
    selectedDate: number, 
    sortType: SortType
) => {
    let newList = deepCopyRoomsList(roomsList);
    newList = setRoomAvailabilities(selectedDate, [...newList]);
    newList = getSortedArrayList(sortType, newList);
    return newList;
};

interface Props {
    listRefreshing: boolean;
    refreshList: () => void;
};

const RoomsList = (props: Props) => {

    const refreshList = () => {
        props.refreshList();
    };

    const roomsList = useAppSelector(state => state.rooms.list);
    const sortType = useAppSelector(state => state.rooms.sortType);
    const selectedDate = useAppSelector(state => state.selectedDate);
    const sortedList = getFreshSortedList(roomsList, selectedDate, sortType);

    const renderItem: ListRenderItem<RoomType> = ({item}) => {
        const room = item;
        const isAvailable = room.isAvailableToCurrDate 
        ? room.isAvailableToCurrDate 
        : false;

        return (
            <RoomView 
                name={room.name}
                level={room.level}
                capacity={room.capacity}
                isAvailable={isAvailable}
            />
        );
    };

    if (roomsList.length === 0) 
        return (
            <View style={styles.emptyListContainerStyle}>
                <MainText 
                    style={styles.textStyle} 
                    text={'There is no room in the list. Try refreshing?'} />
                <MainTextButton
                    pressHandler={refreshList}
                    accessibilityLabel='Refresh rooms list'
                    viewStyle={styles.buttonStyle}
                    textStyle={styles.buttonTextStyle}
                    text={'Refresh'}
                />
            </View>
        );

    return (
        <FlatList 
            showsVerticalScrollIndicator={false}
            data={sortedList}
            renderItem={renderItem}
            contentContainerStyle={styles.listContainerStyle}
            refreshControl={
                props.listRefreshing != undefined ? (
                    <RefreshControl refreshing={props.listRefreshing} onRefresh={refreshList}  />
                )
                : undefined
            }
        />
    );
};

const styles = StyleSheet.create({
	listContainerStyle: {
        paddingBottom: 8,
	},
    emptyListContainerStyle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    textStyle: {
        fontWeight: '500',
        fontSize: 14,
        color: '#000',
        textAlign: 'center',
    },
    buttonTextStyle: {
        fontWeight: '500',
        fontSize: 16,
        color: '#FFF',
        textAlign: 'center',
    },
    buttonStyle: {
        marginTop: 12,
        backgroundColor: '#4E77E0',
        borderRadius: 25,
        paddingVertical: 14,
        alignSelf: 'stretch',
    },
});

export default RoomsList;
