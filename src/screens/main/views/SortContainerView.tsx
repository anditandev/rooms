import React, { useRef, useState } from 'react';
import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, interpolate, runOnJS, SharedValue } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import { SortButtonType, SortType } from '@apptypes/index';
import { useAppDispatch } from '@hooks/redux';
import { DEFAULT_SORT_TYPE, SCREEN_DIMENSION } from '@constants/defaultValues';
import { sortTypeModified } from '@reducers/roomsSlice';
import SortButton from '@components/buttons/SortButton';
import MainTextButton from '@components/buttons/MainTextButton';
import MainText from '@components/texts/MainText';
import { getNextSortOrderType } from '@helpers/roomHelper';
import { useHeaderHeight } from '@react-navigation/elements';

interface Props {
    sortContainerAnim: SharedValue<number>;
    containerAnimHandler: (value: number, customDuration?: number) => void;
};

const SortContainerView = (props: Props) => {

    const [sortType, setSortType] = useState<SortType>({...DEFAULT_SORT_TYPE});
    const dispatch = useAppDispatch();
    const navbarHeight = useHeaderHeight();
    const statusBarHeight = StatusBar.currentHeight;
    const containerHeight = useRef(0);

    /**
     * Threshold for container sliding position to determine
     * whether to close or slide container back to top
     */
    const PAN_TRESHOLD = 0.75;

    /**
     * Gap between container and navigation bar
     */

    const mainContainerAnimstyle = useAnimatedStyle(() => {

        return {
            top: interpolate(
                props.sortContainerAnim.value,
                [0,1],
                [SCREEN_DIMENSION.window.height, 0]
            ),
            quality: props.sortContainerAnim.value,
            // height: '100%',
        };
    });

    const updateStates = (buttonType: SortButtonType) => {
        const prevSortType: SortType = sortType;
        const nextOrderType = getNextSortOrderType(prevSortType, buttonType);
        const nextSortType: SortType = {
            buttonType,
            orderType: nextOrderType,
        };

        /**
         * Prevent rerender if no changes are needed
         */
        if (prevSortType.buttonType !== nextSortType.buttonType
            || prevSortType.orderType !== nextSortType.orderType)
            setSortType(nextSortType);
    };

    const hiddenButtonPressHandler = () => {
        props.containerAnimHandler(0);
    };

    const resetPressHandler = () => {
        setSortType({...DEFAULT_SORT_TYPE});
        props.containerAnimHandler(0);
    };

    const applyPressHandler = () => {
        dispatch(
            sortTypeModified(sortType)
        );
        props.containerAnimHandler(0);
    };

    const getCorrectedPanYPos = (yPos: number) => {
        /**
         * As we are using absolute Y position of the screen,
         * and we need to count the percentage of panned
         * position for the visible container view, we 
         * need to set the yPos 0 on the top of the 
         * visible container view by decreasing the whole 
         * area above the visible container view
         */
        return yPos 
        - navbarHeight 
        - (statusBarHeight ? statusBarHeight : 0)
        - (containerHeight.current * 0.3);
    };

    const panHandler = (yPos: number) => {
        const correctedYPos = getCorrectedPanYPos(yPos);
        const percentage = 1 - (correctedYPos / containerHeight.current);
        if (percentage >= 0 && percentage <= 1)
            props.sortContainerAnim.value = percentage;
        else if (percentage < 0)
            props.sortContainerAnim.value = 0;
        else if (percentage > 1)
            props.sortContainerAnim.value = 1;
    };

    const panEndHandler = (yPos: number) => {
        /**
         * Slide view back to top or hide it based on current 
         * dragging position by checking whether current
         * pan position percentage is above or below
         * the pan treshold percentage
         */
        const correctedYPos = getCorrectedPanYPos(yPos);
        const percentage = 1 - (correctedYPos / containerHeight.current);
        if (percentage >= PAN_TRESHOLD)
            props.containerAnimHandler(1);
        else
            props.containerAnimHandler(0);
    };

    const panGesture = Gesture.Pan()
    .onChange((e) => {
        runOnJS(panHandler)(e.absoluteY);
    })
    .onEnd((e) => {
        runOnJS(panEndHandler)(e.absoluteY);
    });

	return (
        <Animated.View 
            onLayout={(e) => {
                containerHeight.current = e.nativeEvent.layout.height;
            }}
            style={[mainContainerAnimstyle, styles.mainContainer]}>
            <Pressable 
                accessibilityLabel={'Close the view'}
                onPress={hiddenButtonPressHandler} 
                style={styles.hiddenButtonStyle} 
            />
            <GestureDetector gesture={panGesture}>
                <View style={[styles.innerContainer]}>
                    <View>
                        <View style={styles.dragButtonContainerStyle}>
                            <View style={styles.dragButtonStyle} />
                        </View>

                        <MainText style={styles.titleTextStyle} text={'Sort'} />
                    </View>

                    <View style={styles.sortButtonsContainerStyle}>
                        <SortButton currSortType={sortType} btnType={SortButtonType.LEVEL} pressHandler={updateStates} />
                        <SortButton currSortType={sortType} btnType={SortButtonType.CAPACITY} pressHandler={updateStates} />
                        <SortButton currSortType={sortType} btnType={SortButtonType.AVAILABILITY} pressHandler={updateStates} />
                    </View>

                    <View style={styles.actionButtonsContainer}>
                        <MainTextButton
                            accessibilityLabel='Reset sorting type to level in ascending order'
                            viewStyle={[
                                styles.actionButtonStyle,
                                styles.resetButtonStyle,
                            ]}
                            textStyle={styles.actionButtonTextStyle}
                            pressHandler={resetPressHandler}
                            text={'Reset'}
                        />
                        <MainTextButton
                            accessibilityLabel='Apply current sorting type to rooms list'
                            viewStyle={[
                                styles.actionButtonStyle,
                                styles.applyButtonStyle,
                            ]}
                            textStyle={styles.actionButtonTextStyle}
                            pressHandler={applyPressHandler}
                            text={'Apply'}
                        />
                    </View>
                </View>
            </GestureDetector>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        position: 'absolute',
        width: SCREEN_DIMENSION.window.width,
        height: '100%',
        justifyContent: 'flex-end',
    },
    hiddenButtonStyle: {
        flex: 1,
    },
	innerContainer: {
        elevation: 24,
        shadowColor: 'rgba(0, 0, 0, 0.5)',
        shadowOffset: {
            height: 2,
            width: 0,
        },
        height: '70%',
        width: SCREEN_DIMENSION.window.width,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
	},
    dragButtonContainerStyle: {
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 16,
        paddingBottom: 20,
    },
    dragButtonStyle: {
        height: 4,
        width: 48,
        borderRadius: 4,
        backgroundColor: '#E6E9ED',
    },
    titleTextStyle: {
        fontSize: 16,
        lineHeight: 19,
        fontWeight: '600',
        textAlign: 'center',
        color: '#000',
    },
    sortButtonsContainerStyle: {
        paddingHorizontal: 15,
        paddingTop: 20,
        alignSelf: 'stretch',
        flex: 1,
    },
    actionButtonsContainer: {
        flexDirection: 'row',
        padding: 16,
    },
    actionButtonStyle: {
        borderRadius: 25,
        paddingVertical: 14,
    },
    resetButtonStyle: {
        backgroundColor: '#434A54',
        marginRight: 11,
        flex: 1,
    },
    applyButtonStyle: {
        backgroundColor: '#4E77E0',
        flex: 2,
    },
    actionButtonTextStyle: {
        fontSize: 17,
        lineHeight: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        color: '#FFF',
    },
});

export default SortContainerView;
