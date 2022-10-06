import React, { useState } from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import RNDateTimePicker, { DateTimePickerAndroid, DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { useAppDispatch, useAppSelector } from '@hooks/redux';
import { selectedDateModified } from '@reducers/selectedDateSlice';
import MainText from '@components/texts/MainText';
import { getFormattedDate, getFormattedTime } from '@helpers/dateTimeHelper';

const platform = Platform.OS;

const TimeSelectorView = () => {

    const [dateMode, setDateMode] = useState<any>('date');
    const [isPickerShown, setIsPickerShown] = useState(false);
    const timestamp = useAppSelector(state => state.selectedDate);
    const selectedDate = new Date(timestamp);
    const dispatch = useAppDispatch();

    function onChange(_: DateTimePickerEvent, selectedDate?: Date) {
        if (platform !== 'android') {
            setIsPickerShown(false);
        };
        
        const currentDate = selectedDate;
        if (currentDate) {
            const timestamp = Number(currentDate);
            dispatch(
                selectedDateModified(timestamp)
            );
        };
    }

    const datePressHandler = () => {
        if (platform !== 'android') {
            setDateMode('date');
            setIsPickerShown(true);
        }
        else
            DateTimePickerAndroid.open({
                value: selectedDate,
                onChange,
                mode: 'date',
            });
    };

    const timePressHandler = () => {
        if (platform !== 'android') {
            setDateMode('time');
            setIsPickerShown(true);
        }
        else
            DateTimePickerAndroid.open({
                value: selectedDate,
                onChange,
                mode: 'time',
                minuteInterval: 30,
            });
    };

    const renderCalendarComponent = () => {
        /**
         * Use DateTimePicker component for other platform
         * beside android
         */
        
        return platform !== 'android'
        && isPickerShown
        && (
            <RNDateTimePicker
                testID="dateTimePicker"
                value={selectedDate}
                mode={dateMode}
                minimumDate={new Date()}
                minuteInterval={30}
                onChange={onChange}
            />
        );
    };

	return (
		<>
            <Pressable accessibilityLabel='Show date picker' onPress={datePressHandler} >
                <MainText style={styles.buttonTitle} text={'Date'} />
                <View style={styles.buttonInnerContainer}>
                    <MainText style={styles.buttonText} text={getFormattedDate(selectedDate)} />
                </View>
            </Pressable>

            <Pressable accessibilityLabel='Show time picker' onPress={timePressHandler} style={styles.timeslotMainBtnContainer}>
                <MainText style={styles.buttonTitle} text={'Timeslot'} />
                <View style={styles.buttonInnerContainer}>
                    <MainText style={styles.buttonText} text={getFormattedTime(selectedDate)} />
                </View>
            </Pressable>

            {renderCalendarComponent()}
		</>
	);
};

const styles = StyleSheet.create({
    buttonInnerContainer: {
        borderBottomColor: '#E6E9ED',
        borderBottomWidth: 1,
        paddingTop: 2,
        paddingBottom: 5,
    },
    buttonTitle: {
        fontSize: 14,
        lineHeight: 16,
        color: '#AAB2BD',
    },
    buttonText: {
        fontSize: 14,
        lineHeight: 17,
        color: '#212121',
    },
    timeslotMainBtnContainer: {
        marginTop: 27
    },
});

export default TimeSelectorView;
