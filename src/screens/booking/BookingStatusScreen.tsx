import React, { useEffect, useRef, useState } from 'react';
import { BackHandler, Linking, Pressable, SafeAreaView, StyleSheet, View } from 'react-native';
import WebView from 'react-native-webview';
import { NAVIGATION_STRINGS, RootStackParamList } from '@apptypes/nav';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import MainText from '@components/texts/MainText';
import { StackNavigationProp } from '@react-navigation/stack';
import { HeaderBackButton } from '@react-navigation/elements';

const BookingStatusScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList, NAVIGATION_STRINGS.CAMERA>>();
    const route = useRoute<RouteProp<RootStackParamList, NAVIGATION_STRINGS.BOOKING_STATUS>>();
    const [uri, setUri] = useState(route.params.url);
    
    const backHandler = () => {
        navigation.popToTop();
        return true;
    };

    const homePressHandler = () => {
        backHandler();
    };

    const openWithExternalBrowser = () => {
        Linking.openURL(uri);
    };

    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', backHandler);
        navigation.setOptions({
            headerLeft: () => (
                <HeaderBackButton onPress={backHandler} />
            ),
        });
        return () => {
            BackHandler.removeEventListener('hardwareBackPress', backHandler);
            Linking.removeAllListeners('url');
        };
    }, []);
    
    return (
		<SafeAreaView style={[styles.container]}>
            <View style={[styles.container]}>
                <WebView
                    style={[styles.container]}
                    source={{
                        uri,
                    }}
                    originWhitelist={['intent:*']}
                    onError={(e) => {
                        /**
                         * Forcefully grab browser fallback url to update
                         * webview url.
                         * If none was found, rely on external browser.
                         */

                        if (e.nativeEvent.url.startsWith("intent:")) {
                            const arrayUrl = e.nativeEvent.url.split(';');
                            let getUrl = '';
                            if (arrayUrl.length > 0) {
                                const index = arrayUrl.findIndex((url) => url.includes('browser_fallback_url'));
                                if (index > 0) {
                                    getUrl = arrayUrl[index].split('=')[1];
                                    getUrl = decodeURIComponent(getUrl);
                                    if (getUrl)
                                        setUri(getUrl);
                                    else 
                                        openWithExternalBrowser();
                                }
                            }
                            return false;
                        } else
                            openWithExternalBrowser();
                        return true;
                    }}
                />
            </View>
            <Pressable onPress={homePressHandler} style={styles.btnStyle}>
                <MainText style={styles.textStyle} text={'Back to Home'} />
            </Pressable>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
	btnStyle: {
        borderRadius: 25,
        backgroundColor: '#4E77E0',
        paddingVertical: 14,
        margin: 16,
	},
    textStyle: {
        fontWeight: 'bold',
        lineHeight: 20,
        fontSize: 17,
        textAlign: 'center',
        color: '#FFF',
    },
});

export default BookingStatusScreen;