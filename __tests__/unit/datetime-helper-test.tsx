import 'react-native';
import { formatToClosestThirtyMinutes, getFormattedDate, getFormattedTime } from '@helpers/dateTimeHelper';
import { format } from 'date-fns';

describe('Datetime helper test', () => {

    describe('Date format test', () => {

        test('timestamp 0 should have time format of 07:00 AM', () => {
            expect(getFormattedDate(new Date(0))).toStrictEqual('1st Jan 1970');
        });

        test('timestamp 1664326800000 should have time format of 08:00 AM', () => {
            expect(getFormattedDate(new Date(1664326800000))).toStrictEqual('28th Sep 2022');
        });

        test('timestamp -1 should have time format of 03:00 PM', () => {
            expect(getFormattedDate(new Date(-1))).toStrictEqual('1st Jan 1970');
        });

        test('timestamp 1663920000000 should have time format of 06:59 AM', () => {
            expect(getFormattedDate(new Date(1663920000000))).toStrictEqual('23rd Sep 2022');
        });
    });

    describe('Time format test', () => {
        test('timestamp 0 should have time format of 07:00 AM', () => {
            expect(getFormattedTime(new Date(0))).toStrictEqual('07:00 AM');
        });

        test('timestamp 1664326800000 should have time format of 08:00 AM', () => {
            expect(getFormattedTime(new Date(1664326800000))).toStrictEqual('08:00 AM');
        });

        test('timestamp -1 should have time format of 03:00 PM', () => {
            expect(getFormattedTime(new Date(-1))).toStrictEqual('06:59 AM');
        });

        test('timestamp 1663920000 should have time format of 06:59 AM', () => {
            expect(getFormattedTime(new Date(1663920000000))).toStrictEqual('03:00 PM');
        });
    });

    describe('Initial date state test', () => {
    
        test('current date should be rounded to either 0 minute or 30 minutes', () => {
            const time = formatToClosestThirtyMinutes(new Date());
            const minute = format(time, 'mm');
            expect(['30', '00']).toContainEqual(minute);
        });
    
        test('timestamp 1664330340000 should be rounded to 30 minutes', () => {
            const time = formatToClosestThirtyMinutes(new Date(1664330340000));
            const minute = format(time, 'mm');
            expect(minute).toEqual('30');
        });
    
        test('timestamp 1664328620000 should be rounded to 30 minutes', () => {
            const time = formatToClosestThirtyMinutes(new Date(1664328620000));
            const minute = format(time, 'mm');
            expect(minute).toEqual('30');
        });
    
        test('timestamp 1664327400000 should be rounded to 0 minute', () => {
            const time = formatToClosestThirtyMinutes(new Date(1664327400000));
            const minute = format(time, 'mm');
            expect(minute).toEqual('00');
        });
    });
});
