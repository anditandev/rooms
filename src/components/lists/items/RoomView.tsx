import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated from 'react-native-reanimated';
import MainText from '@components/texts/MainText';

interface Props {
    name: string;
    level: string;
    capacity: string;
    isAvailable: boolean;
};

const RoomView = (props: Props) => {

    const isAvailable = props.isAvailable;
    const availabilityTextColor = isAvailable ? '#52BA50' : '#939393';
    const availabilityText = isAvailable ? 'Available' : 'Not Available';

    return (
        <Animated.View style={[styles.container]}>
            <View>
                <MainText style={styles.nameTextStyle} text={props.name} />
                <MainText style={styles.levelTextStyle} text={`Level ${props.level}`} />
            </View>
            <View>
                <MainText 
                    style={[
                        styles.availabilityTextStyle,
                        {
                            color: availabilityTextColor,
                        },
                    ]} 
                    text={availabilityText} 
                />
                <MainText style={styles.capacityTextStyle} text={`${props.capacity} Pax`} />
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 8,
        backgroundColor: '#F7F7F7',
        marginTop: 8,
        flexDirection: 'row',
        paddingHorizontal: 24,
        paddingVertical: 16,
        justifyContent: 'space-between',
    },
    nameTextStyle: {
        fontSize: 16,
        lineHeight: 16,
        fontWeight: 'bold',
        color: '#4F4F4F',
    },
    levelTextStyle: {
        fontSize: 14,
        lineHeight: 16,
        color: '#4F4F4F',
        marginTop: 8,
    },
    availabilityTextStyle: {
        fontSize: 14,
        lineHeight: 16,
        textAlign: 'right',
        fontStyle: 'italic',
    },
    capacityTextStyle: {
        fontSize: 14,
        lineHeight: 16,
        color: '#4F4F4F',
        textAlign: 'right',
        marginTop: 8,
    },
});

const equalValues = (prevValue: Props, nextValue: Props) => {
    return prevValue.name === nextValue.name
    && prevValue.isAvailable === nextValue.isAvailable
    && prevValue.capacity === nextValue.capacity
    && prevValue.level === nextValue.level
};

export default React.memo(RoomView, equalValues);
