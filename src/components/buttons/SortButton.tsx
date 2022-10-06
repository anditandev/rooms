import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import SortDirectionIcon from '@assets/svgs/SortDirectionIcon';
import { SortButtonType, SortOrderType, SortType } from '@apptypes/index';
import MainText from '@components/texts/MainText';

interface Props {
    btnType: SortButtonType;
    currSortType: SortType;
    pressHandler: (btnType: SortButtonType) => void;
};

const SortButton = (props: Props) => {
    
    const renderIcon = () => {
        if (props.currSortType.buttonType === props.btnType)
            return <SortDirectionIcon color={'#000'} />
    };

    const rotateStyle = props.currSortType.orderType === SortOrderType.DESCENDING 
    && props.currSortType.buttonType === props.btnType
    && {
        transform: [
            {
              rotate: '180deg'
            }
        ],
    };

    const pressHandler = () => {
        props.pressHandler(props.btnType);
    };

    return (
        <Pressable onPress={pressHandler} style={styles.container}>
            <MainText style={styles.btnText} text={props.btnType} />
            <View style={[rotateStyle, styles.selectionOval]}>
                {renderIcon()}
            </View>
        </Pressable>
    );
};

const styles = StyleSheet.create({
	container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 9,
        paddingVertical: 6,
	},
    selectionOval: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderColor: '#AAB2BD',
        borderWidth: 3,
        alignItems: 'center',
        justifyContent: 'center',
    },
    btnText: {
        fontSize: 16,
        lineHeight: 20,
        color: '#212121',
    },
});


export default React.memo(SortButton);
