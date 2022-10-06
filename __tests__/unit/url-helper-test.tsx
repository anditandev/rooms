import { isValidHttp } from '@helpers/urlHelper';
import 'react-native';

describe('URL helper test', () => {

    const uriList = [
        {
            uri: 'https://lipsum.com',
            isValid: true,
        },
        {
            uri: 'http://lipsum.com',
            isValid: true,
        },
        {
            uri: 'http://lipsum',
            isValid: false,
        },
        {
            uri: 'htt://lipsum.com',
            isValid: false,
        },
        {
            uri: 'www.freecodecamp.com',
            isValid: true,
        },
        {
            uri: 'intent://freecodecamp.com',
            isValid: false,
        },
        {
            uri: 'test',
            isValid: false,
        },
        {
            uri: '123',
            isValid: false,
        },
    ];

    test.each(uriList)('Each http/https uri should be valid/invalid based on its expected outcome', (obj) => {
        const result = isValidHttp(obj.uri);
        const expectedBool = obj.isValid;
        expect(result).toBe(expectedBool);
    });
});
