import React, { useEffect } from 'react';
import CameraScreen from './CameraScreen';
import { Camera, useCameraDevices } from 'react-native-vision-camera';
import NoCameraPermissionScreen from './NoCameraPermissionScreen';

const CameraScreenContainer = () => {

    const [hasPermission, setHasPermission] = React.useState<boolean | undefined>(undefined);

	const requestCameraPermission = async() => {
		const status = await Camera.requestCameraPermission();
		setHasPermission(status === 'authorized');
	};

    useEffect(() => {
        requestCameraPermission();
    }, []);

	if (hasPermission)
		return (
			<CameraScreen
				hasPermission={hasPermission}
			/>
		);
		
	return <NoCameraPermissionScreen requestCameraPermission={requestCameraPermission} />
};

export default CameraScreenContainer;