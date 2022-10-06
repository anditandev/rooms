import 'react-native';
import { RoomType, SortButtonType, SortOrderType, SortType } from '@apptypes/index';
import { deepCopyRoomsList, getNextSortOrderType, getSortedArrayList, isTimeAvailable, setRoomAvailabilities } from '@helpers/roomHelper';
import { DEFAULT_ROOMS_LIST_TEST_DATA } from '@constants/defaultValues';

describe('Room helper test', () => {

    const data: RoomType[] = JSON.parse(DEFAULT_ROOMS_LIST_TEST_DATA);

    describe('Deep copying test', () => {
        const copiedArr: RoomType[] = deepCopyRoomsList(data);
    
        test('deep copied array should be defined', () => {
            expect(copiedArr).toBeDefined();
        });
    
        test('deep copied array should have same initial length', () => {
            expect(copiedArr.length).toEqual(data.length);
        });
    
        test('changes on deep copied array should not affect the original data', () => {
            copiedArr[0].level = '1222222';
            copiedArr[1].isAvailableToCurrDate = true;
            copiedArr[2].name = 'Chicken Rice';

            expect(copiedArr[0].level).not.toEqual(data[0].level);
            expect(copiedArr[1].isAvailableToCurrDate).not.toEqual(data[1].isAvailableToCurrDate);
            expect(copiedArr[2].name).not.toEqual(data[2].name);
        });
    });

    describe('Single room availability Test', () => {
        const room = {...data[0]};
    
        test('expect room availability to current time is initially undefined', () => {
            expect(room.isAvailableToCurrDate).toBeUndefined();
        });
    
        test('given 14:00 as the selected time, expect room availability to current time as available/true and not undefined', () => {
            const timestamp = 1664348400000; // 2022-09-28 14:00:00
            const result = isTimeAvailable(timestamp, room.availability);
            room.isAvailableToCurrDate = result;
            expect(room.isAvailableToCurrDate).toBeDefined();
            expect(result).toBeTruthy();
        });
    
        test('given 18:00 as the selected time, expect room availability to current time as not available/false and not undefined', () => {
            const timestamp = 1664362800000; // 2022-09-28 18:00:00
            const result = isTimeAvailable(timestamp, room.availability);
            room.isAvailableToCurrDate = result;
            expect(room.isAvailableToCurrDate).toBeDefined();
            expect(result).toBeFalsy();
        });
    });

    describe('Room list hour 14:00 availabilities Test', () => {
        const timestamp = 1664348400000; // 2022-09-28 14:00:00
        let roomsList: RoomType[] = [
            {...data[0]},
            {...data[1]}
        ];
    
        beforeAll(() => {
            roomsList = setRoomAvailabilities(timestamp, roomsList);
        });
    
        test.each(roomsList)('given 14:00 as the selected time, expect all rooms\' availability to current time as not available/false and not undefined', (room) => {
            expect(room.isAvailableToCurrDate).toBeDefined();
            expect(room.isAvailableToCurrDate).toBeTruthy();
        });
    });

    describe('Room list hour 18:00 availabilities Test', () => {
        const timestamp = 1664362800000; // 2022-09-28 18:00:00
        let roomsList: RoomType[] = [
            {...data[0]},
            {...data[1]}
        ];
    
        beforeAll(() => {
            roomsList = setRoomAvailabilities(timestamp, roomsList);
        });
    
        test.each(roomsList)('given 18:00 as the selected time, expect all rooms\' availability to current time as available/true and not undefined', (room) => {
            expect(room.isAvailableToCurrDate).toBeDefined();
            expect(room.isAvailableToCurrDate).toBeFalsy();
        });
    });

    describe('Rooms sorting test', () => {
        let roomsList: RoomType[] = deepCopyRoomsList(data);
    
        beforeAll(() => {
            const timestamp = 1664348400000; // 2022-09-28 14:00:00
            roomsList = setRoomAvailabilities(timestamp, roomsList);
        });

        test('given sorting by level on ascending order, prev room\'s level should be lower or equal than the next', () => {
            const sortType: SortType = {
                orderType: SortOrderType.ASCENDING,
                buttonType: SortButtonType.LEVEL
            };
            roomsList = getSortedArrayList(sortType, roomsList);
            for (let i = 0; i < roomsList.length; i += 1) {
                if (i + 1 < roomsList.length) {
                    const currRoomLvl = Number(roomsList[i].level);
                    const nextRoomLvl = Number(roomsList[i + 1].level);
                    expect(currRoomLvl).toBeLessThanOrEqual(nextRoomLvl);
                };
            };
        });

        test('given sorting by level on descending order, prev room\'s level should be higher or equal than the next', () => {
            const sortType: SortType = {
                orderType: SortOrderType.DESCENDING,
                buttonType: SortButtonType.LEVEL
            };

            roomsList = getSortedArrayList(sortType, roomsList);
            for (let i = 0; i < roomsList.length; i += 1) {
                if (i + 1 < roomsList.length) {
                    const currRoomLvl = Number(roomsList[i].level);
                    const nextRoomLvl = Number(roomsList[i + 1].level);
                    expect(currRoomLvl).toBeGreaterThanOrEqual(nextRoomLvl);
                };
            };
        });

        test('given sorting by capacity on ascending order, prev room\'s capacity should be lower or equal than the next', () => {
            const sortType: SortType = {
                orderType: SortOrderType.ASCENDING,
                buttonType: SortButtonType.CAPACITY
            };

            roomsList = getSortedArrayList(sortType, roomsList);
            for (let i = 0; i < roomsList.length; i += 1) {
                if (i + 1 < roomsList.length) {
                    const currRoomCapacity = Number(roomsList[i].capacity);
                    const nextRoomCapacity = Number(roomsList[i + 1].capacity);
                    expect(currRoomCapacity).toBeLessThanOrEqual(nextRoomCapacity);
                };
            };
        });

        test('given sorting by capacity on descending order, prev room\'s capacity should be higher or equal than the next', () => {
            const sortType: SortType = {
                orderType: SortOrderType.DESCENDING,
                buttonType: SortButtonType.CAPACITY
            };

            roomsList = getSortedArrayList(sortType, roomsList);
            for (let i = 0; i < roomsList.length; i += 1) {
                if (i + 1 < roomsList.length) {
                    const currRoomCapacity = Number(roomsList[i].capacity);
                    const nextRoomCapacity = Number(roomsList[i + 1].capacity);
                    expect(currRoomCapacity).toBeGreaterThanOrEqual(nextRoomCapacity);
                };
            };
        });

        test('given sorting by availability on ascending order, all unavailable rooms should be first on the list followed by all available rooms', () => {
            const sortType: SortType = {
                orderType: SortOrderType.ASCENDING,
                buttonType: SortButtonType.AVAILABILITY
            };

            roomsList = getSortedArrayList(sortType, roomsList);
            for (let i = 0; i < roomsList.length; i += 1) {
                if (i + 1 < roomsList.length) {
                    const currRoomAvailability = Number(roomsList[i].isAvailableToCurrDate);
                    const nextRoomAvailability = Number(roomsList[i + 1].isAvailableToCurrDate);
                    expect(nextRoomAvailability).toBeGreaterThanOrEqual(currRoomAvailability);
                };
            };
        });

        test('given sorting by availability on ascending order, all available rooms should be first on the list followed by all unavailable rooms', () => {
            const sortType: SortType = {
                orderType: SortOrderType.DESCENDING,
                buttonType: SortButtonType.AVAILABILITY
            };

            roomsList = getSortedArrayList(sortType, roomsList);
            for (let i = 0; i < roomsList.length; i += 1) {
                if (i + 1 < roomsList.length) {
                    const currRoomAvailability = Number(roomsList[i].isAvailableToCurrDate);
                    const nextRoomAvailability = Number(roomsList[i + 1].isAvailableToCurrDate);
                    expect(nextRoomAvailability).toBeLessThanOrEqual(currRoomAvailability);
                };
            };
        });
    });

    describe('Next sort order test', () => {

        test('given same sort button type, next sort order should be ascending from descending', () => {
            const sortType: SortType = {
                orderType: SortOrderType.DESCENDING,
                buttonType: SortButtonType.AVAILABILITY
            };
            const result = getNextSortOrderType(sortType, SortButtonType.AVAILABILITY);
            
            expect(result).toEqual(SortOrderType.ASCENDING)
        });

        test('given same sort button type, next sort order should be descending from ascending', () => {
            const sortType: SortType = {
                orderType: SortOrderType.ASCENDING,
                buttonType: SortButtonType.AVAILABILITY
            };
            const result = getNextSortOrderType(sortType, SortButtonType.AVAILABILITY);
            
            expect(result).toEqual(SortOrderType.DESCENDING)
        });

        test('given different sort button type, next sort order should be ascending', () => {
            const sortType: SortType = {
                orderType: SortOrderType.DESCENDING,
                buttonType: SortButtonType.LEVEL
            };
            const result = getNextSortOrderType(sortType, SortButtonType.AVAILABILITY);
            
            expect(result).toEqual(SortOrderType.ASCENDING)
        });
    });
});
