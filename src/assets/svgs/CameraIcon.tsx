import React from 'react';
import Svg, { Path } from 'react-native-svg';

type Props = {
    color: string;
}

const CameraIcon = (props: Props) => {
    return (
        <Svg width={'100%'} height={'100%'} viewBox='0 0 24 20'>
            <Path 
                d='M23 17C23 17.5304 22.7893 18.0391 22.4142 18.4142C22.0391 18.7893 21.5304 19 21 19H3C2.46957 19 1.96086 18.7893 1.58579 18.4142C1.21071 18.0391 1 17.5304 1 17V6C1 5.46957 1.21071 4.96086 1.58579 4.58579C1.96086 4.21071 2.46957 4 3 4H7L9 1H15L17 4H21C21.5304 4 22.0391 4.21071 22.4142 4.58579C22.7893 4.96086 23 5.46957 23 6V17Z'
                stroke={props.color} 
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
                strokeWidth={2}
            />
            <Path 
                d='M12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15Z'
                stroke={props.color} 
                strokeLinejoin={'round'}
                strokeLinecap={'round'}
                strokeWidth={2}
            />
        </Svg>
    );
};

export default CameraIcon;