import 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';
import MainTextButton from '@components/buttons/MainTextButton';
import MainText from '@components/texts/MainText';
import { Pressable, Text } from 'react-native';
import RoomView from '@components/lists/items/RoomView';
import SortButton from '@components/buttons/SortButton';
import { SortButtonType, SortOrderType, SortType } from '@apptypes/index';
import SortDirectionIcon from '@assets/svgs/SortDirectionIcon';

describe('Main Text component test', () => {

    const text = 'Text 1';
    const style = {
        fontSize: 16,
    };

    const textComponent = renderer
    .create(
        <MainText style={style} text={text} />
    )
    .root;

    test('expect text to have the same text', () => {
        const textChild = textComponent.findByType(Text).props.children;
        expect(textChild).toEqual(text);
    });
    test('expect text to have the defined style passed from prop', () => {
        const textStyle = textComponent.findByType(Text).props.style;
        expect(textStyle).toContain(style);
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

    let num = 15;
    const fn = jest.fn(() => {
        num += 20;
    });

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
    .root
    .findByType(Pressable);
    

    test('expect text to have the same text', () => {
        const textInButton = buttonComponent
        .findByType(Text)
        .props.children;
        
        expect(textInButton).toContain(text);
    });

    test('expect button to have the same view style', () => {
        const buttonChild = buttonComponent.props.style;
        expect(buttonChild).toContain(viewStyle);
    });

    test('expect button to have the same text style', () => {
        const textStyleInButton = buttonComponent
        .findByType(Text)
        .props.style;
        
        expect(textStyleInButton).toContain(textStyle);
    });

    test('on pressing button, value num which is 15 should be added to 35', () => {
        buttonComponent.props.onPress();
        expect(num).toEqual(35);
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
    .root
    .findAllByType(MainText);

    test('Expect component to have 4 text children', () => {
        const children = roomViewComponent.length;
        expect(children).toEqual(4);
    });

    test('Expect first text to have the name text', () => {
        const text = roomViewComponent[0]
        .findByType(Text)
        .props
        .children
        expect(text).toEqual(name);
    });

    test('Expect second text to have the level text', () => {
        const text = roomViewComponent[1]
        .findByType(Text)
        .props
        .children
        expect(text).toEqual(`Level ${level}`);
    });

    test('Expect third text to have the availability text', () => {
        const text = roomViewComponent[2]
        .findByType(Text)
        .props
        .children
        expect(text).toEqual('Not Available');
    });

    test('Expect fourth text to have the capacity text', () => {
        const text = roomViewComponent[3]
        .findByType(Text)
        .props
        .children
        expect(text).toEqual(`${capacity} Pax`);
    });
});

describe('Sort button component test', () => {

    describe('Different sorting button type test', () => {

        const currSortType: SortType = {
            buttonType: SortButtonType.AVAILABILITY,
            orderType: SortOrderType.ASCENDING,
        };
    
        const mainButtonType = SortButtonType.LEVEL;
        let string = 'a';
        const fn = jest.fn((btnType: SortButtonType) => {
            string = btnType;
        });
    
        const sortBtnComponent = renderer
        .create(
            <SortButton
                currSortType={currSortType} 
                btnType={mainButtonType} 
                pressHandler={fn}
            />
        )
    
        test(`on pressing button, value string which is a should be now ${mainButtonType}`, () => {
            const sortButton = sortBtnComponent
            .root
            .findByType(Pressable);
    
            sortButton.props.onPress();
            expect(string).toEqual(mainButtonType);
        });
    
        test(`text component should have ${mainButtonType} value`, () => {
            const text = sortBtnComponent
            .root
            .findByType(MainText)
            .findByType(Text)
            .props
            .children;
    
            expect(text).toEqual(mainButtonType);
        });
    
        test('given different current sorting type, sort direction should not exist', () => {
            const icons = sortBtnComponent
            .root
            .findAllByType(SortDirectionIcon)
    
            expect(icons.length).toEqual(0);
        });
    });

    describe('Same sorting button type test', () => {

        const currSortType: SortType = {
            buttonType: SortButtonType.LEVEL,
            orderType: SortOrderType.ASCENDING,
        };
    
        const mainButtonType = SortButtonType.LEVEL;
        const fn = jest.fn();
    
        const sortBtnComponent = renderer
        .create(
            <SortButton
                currSortType={currSortType} 
                btnType={mainButtonType} 
                pressHandler={fn}
            />
        )
    
        test('given different current sorting type, sort direction should not exist', () => {
            const icons = sortBtnComponent
            .root
            .findAllByType(SortDirectionIcon)
    
            expect(icons.length).toEqual(1);
        });
    });


});

