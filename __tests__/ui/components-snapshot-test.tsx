import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MainTextButton from '@components/buttons/MainTextButton';
import MainText from '@components/texts/MainText';
import { Pressable, Text } from 'react-native';
import RoomView from '@components/lists/items/RoomView';

describe('Main Text component test', () => {

    const text = 'Text 1';
    const style = {
        fontSize: 16,
    };

    const textComponent = renderer
    .create(
        <MainText style={style} text={text} />
    )
    .toJSON();

    test('expect component to match snapshot', () => {
        expect(textComponent).toMatchSnapshot();
    });
});

describe('Main Button Text component test', () => {

    const text = 'Button 1';
    const accessibilityLabel = 'Press handler for button 1';
    const textStyle = {
        fontSize: 16,
        color: '#FFF',
    };

    const viewStyle = {
        marginTop: 12,
        backgroundColor: '#4E77E0',
        borderRadius: 25,
    };

    const fn = jest.fn();
    const buttonComponent = renderer
    .create(
        <MainTextButton
            pressHandler={fn}
            accessibilityLabel={accessibilityLabel}
            viewStyle={viewStyle}
            textStyle={textStyle}
            text={text}
        />
    )
    .toJSON();

    test('expect component to match snapshot', () => {
        expect(buttonComponent).toMatchSnapshot();
    });
});

describe('Room view component test', () => {

    const name = 'Test 1';
    const level = '3';
    const capacity = '10';
    const availability = false;

    const roomViewComponent = renderer
    .create(
        <RoomView
            name={name}
            level={level}
            capacity={capacity}
            isAvailable={availability}
        />
    )
    .toJSON();

    test('expect component to match snapshot', () => {
        expect(roomViewComponent).toMatchSnapshot();
    });
});

