import React, { useEffect } from 'react';
import { Pressable, SafeAreaView, StyleSheet } from 'react-native';
import TimeSelectorView from './views/TimeSelectorView';
import { useSharedValue, withTiming } from 'react-native-reanimated';
import CameraIcon from '@assets/svgs/CameraIcon';
import { useNavigation } from '@react-navigation/native';
import { NAVIGATION_STRINGS, RootStackParamList } from '@apptypes/nav';
import ListView from './views/ListView';
import SortContainerView from './views/SortContainerView';
import { StackNavigationProp } from '@react-navigation/stack';
import { Camera } from 'react-native-vision-camera';

const MainScreen = () => {

    const sortContainerAnim = useSharedValue(0);
    const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAVIGATION_STRINGS.ROOM>>();

    const openCamera = () => {
        containerAnimHandler(0);
        navigation.navigate(NAVIGATION_STRINGS.CAMERA);
    };

    const containerAnimHandler = (value: number, customDuration?: number) => {
        const duration = customDuration ? customDuration : 120;
        sortContainerAnim.value = withTiming(value, {
            duration: duration,
        });
    };

    const sortPressHandler = () => {
        if (sortContainerAnim.value === 0)
            containerAnimHandler(1, 240);
    };

    const setCameraIcon = async() => {
        try {
            await Camera.getAvailableCameraDevices();
            navigation.setOptions({
                headerRight: () => 
                    <Pressable onPress={openCamera} style={styles.cameraBtnStyle}>
                        <CameraIcon color='#000' />
                    </Pressable>
                ,
            });
        } catch {
            // TODO: Handle case of device with no camera
            return;
        };
    };

    useEffect(() => {
        setCameraIcon();
    }, [navigation]);

	return (
        <>
            <SafeAreaView style={styles.container}>
                <TimeSelectorView />
                <ListView sortPressHandler={sortPressHandler} />
            </SafeAreaView>
            <SortContainerView 
                sortContainerAnim={sortContainerAnim} 
                containerAnimHandler={containerAnimHandler}
            />
        </>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        paddingTop: 17,
        paddingHorizontal: 24,
        backgroundColor: '#FFF',
	},
    cameraBtnStyle: {
        height: 36,
        width: 42,
        padding: 10,
        marginRight: 14,
    },
});

export default MainScreen;
