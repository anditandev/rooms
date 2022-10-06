import React, { useEffect, useState } from 'react';
import MainScreen from './MainScreen';
import { Alert, ActivityIndicator, StyleSheet, View } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { getRoom } from '@apis/rooms';
import { useAppDispatch } from '@hooks/redux';
import { roomsListModified } from '@reducers/roomsSlice';

const MainScreenContainer = () => {

	const [isGettingData, setIsGettingData] = useState(true);
    const dispatch = useAppDispatch();

	const getAllRooms = async(time?: number, date?: number) => {
		try {
			const allRooms = await getRoom();
			dispatch(
				roomsListModified(allRooms)
			);
			setIsGettingData(false);
		} catch (e) {
			Alert.alert('Error', String(e));
			setIsGettingData(false);
		};
	};

	const renderMainScreen = () => {
		if (!isGettingData) 
			return <MainScreen />
		
		return (
			<View style={styles.container}>
				<ActivityIndicator color={'#000'} size={'large'} />
			</View>
		);
	};
	
	useEffect(() => {
		getAllRooms();
	},[]);

    return (
		<GestureHandlerRootView style={{flex: 1}}>
			{renderMainScreen()}
		</GestureHandlerRootView>
    );
};

const styles = StyleSheet.create({
	container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
		backgroundColor: '#FFF',
	},
});

export default MainScreenContainer;