import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
    color: string;
}

const SortIcon = (props: Props) => {
    return (
        <Svg width={'100%'} height={'100%'} viewBox='0 0 16 10'>
            <Path 
                d='M0.5 10H5.5V8.33333H0.5V10ZM0.5 0V1.66667H15.5V0H0.5ZM0.5 5.83333H10.5V4.16667H0.5V5.83333Z'
                fill={props.color} 
            />
        </Svg>
    );
};

export default SortIcon;