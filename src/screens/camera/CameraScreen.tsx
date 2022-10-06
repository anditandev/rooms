import { NAVIGATION_STRINGS, RootStackParamList } from '@apptypes/nav';
import { isValidHttp } from '@helpers/urlHelper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import { BarcodeFormat, useScanBarcodes } from 'vision-camera-code-scanner';

interface Props {
    hasPermission?: boolean;
};

const CameraScreen = (props: Props) => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAVIGATION_STRINGS.CAMERA>>();
    const devices = useCameraDevices();
    const device = devices.back;

    const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
        checkInverted: true,
    });

    const barcodeHandler = () => {
        if (barcodes && barcodes.length > 0 && barcodes[0].rawValue) {
            const url = barcodes[0].rawValue;
            const isUrl = isValidHttp(url);
            if (isUrl) {
                navigation.navigate(NAVIGATION_STRINGS.BOOKING_STATUS, {
                    url: url,
                });
            };
        };
    };

    const renderCameraView = () => {
        if (device != null && props.hasPermission)
            return (
                <Camera
                    style={StyleSheet.absoluteFill}
                    device={device}
                    isActive={true}
                    frameProcessor={frameProcessor}
                    frameProcessorFps={5}
                />
            );
    };

    useEffect(() => {
        barcodeHandler();
    }, [barcodes]);

    return (
        <SafeAreaView style={{flex: 1}}>
            {renderCameraView()}
        </SafeAreaView>
    );
};

export default CameraScreen;