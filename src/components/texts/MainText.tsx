import React from 'react';
import { StyleSheet, Text, TextStyle} from 'react-native';

interface Props {
    style?: TextStyle | TextStyle[];
    text: string;
};

const MainText = (props: Props) => {
	return (
        <Text style={[styles.textStyle, props.style]}>
            {props.text}
        </Text>
	);
};

const styles = StyleSheet.create({
	textStyle: {
        fontSize: 14,
	},
});

export default MainText;
