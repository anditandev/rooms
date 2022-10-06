import React from 'react';
import Svg, { Path, Polygon } from 'react-native-svg';

type Props = {
    color: string;
}

const SortDirectionIcon = (props: Props) => {
    return (
        <Svg width={'100%'} height={'100%'} viewBox='0 0 32 32'>
            <Polygon 
                points={'16,10 26,20 6,20'}
                fill={props.color}
            />
        </Svg>
    );
};

export default SortDirectionIcon;