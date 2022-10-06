import React from 'react';
import MainText from '@components/texts/MainText';
import { Pressable, TextStyle, ViewStyle} from 'react-native';

interface Props {
    accessibilityLabel?: string;
    viewStyle?: ViewStyle | ViewStyle[];
    textStyle?: TextStyle | TextStyle[];
    pressHandler?: () => void;
    text: string;
};

const MainTextButton = (props: Props) => {

    const pressHandler = () => {
        if (props.pressHandler)
            props.pressHandler();
    };

	return (
        <Pressable 
            accessibilityLabel={props.accessibilityLabel} 
            onPress={pressHandler} 
            style={[props.viewStyle]}
        >
            <MainText style={props.textStyle} text={props.text} />
        </Pressable>
	);
};

export default MainTextButton;
