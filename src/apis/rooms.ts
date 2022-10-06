const BASE_URI = 'https://gist.githubusercontent.com/yuhong90/7ff8d4ebad6f759fcc10cc6abdda85cf/raw/463627e7d2c7ac31070ef409d29ed3439f7406f6/room-availability.json';

export const getRoom = async() => {
    try {
        const response = await fetch(BASE_URI, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
        });
        const parsedJson: any = await response.json();
        return parsedJson;
    } catch (e) {
        throw e;
    };
};