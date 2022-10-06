import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NAVIGATION_STRINGS } from '@apptypes/nav';
import MainScreenContainer from '@screens/main/MainScreenContainer';
import BookingStatusScreenContainer from '@screens/booking/BookingStatusScreenContainer';
import CameraScreenContainer from '@screens/camera/CameraScreenContainer';

const Stack = createStackNavigator();

const MainRouter = () => {
    return (
        <Stack.Navigator
            initialRouteName={NAVIGATION_STRINGS.ROOM}
            screenOptions={{
                headerStyle: {
                    backgroundColor: '#FFF',
                },
                headerShadowVisible: false,
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen 
                name={NAVIGATION_STRINGS.ROOM} 
                component={MainScreenContainer}
                options={{
                    title: 'Book a Room'
                }}
            />
            <Stack.Screen 
                name={NAVIGATION_STRINGS.BOOKING_STATUS} 
                component={BookingStatusScreenContainer} 
                options={{
                    title: 'Book a Room',
                }}
            />
            <Stack.Screen 
                name={NAVIGATION_STRINGS.CAMERA} 
                component={CameraScreenContainer} 
                options={{
                    title: 'Scan QR Code',
                }}
            />
        </Stack.Navigator>
    );
};

export default MainRouter;