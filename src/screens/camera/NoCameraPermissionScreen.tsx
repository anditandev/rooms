import MainTextButton from '@components/buttons/MainTextButton';
import MainText from '@components/texts/MainText';
import React from 'react';
import { Linking, SafeAreaView, StyleSheet, View } from 'react-native';

interface Props {
    requestCameraPermission: () => void;
};

const NoCameraPermissionScreen = (props: Props) => {

    const appSettingButtonPressHandler = () => {
        Linking.openSettings();
    };

    return (
        <SafeAreaView style={styles.container}>
            <MainText text='Please allow camera permission' style={styles.textStyle}/>
            <MainTextButton
                pressHandler={props.requestCameraPermission}
                accessibilityLabel='Request camera permission'
                viewStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                text={'Request Permission'}
            />
            <MainText 
                text='* if the button above does nothing when pressed, you may have denied further camera permission request. Please allow camera permission from the settings.' 
                style={styles.subtitleTextStyle}
            />
            <MainTextButton
                pressHandler={appSettingButtonPressHandler}
                accessibilityLabel='Navigate to app settings'
                viewStyle={styles.buttonStyle}
                textStyle={styles.buttonTextStyle}
                text={'To App settings'}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        paddingHorizontal: 20,
	},
    textStyle: {
        fontWeight: '500',
        fontSize: 16,
        color: '#000',
    },
    subtitleTextStyle: {
        marginTop: 12,
        fontSize: 13,
        color: '#000',
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
        paddingHorizontal: 26,
    },
});

export default NoCameraPermissionScreen;