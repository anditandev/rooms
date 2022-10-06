import { RoomAvailabilityType, RoomTimeAvailabilityType, RoomType, SortButtonType, SortOrderType, SortType } from "@apptypes/index";
import { format } from "date-fns";

export const isTimeAvailable = (
    date: number, 
    availabilityList: RoomAvailabilityType,
) => {
    const timelinesList: string[] = Object.keys(availabilityList);
    const formattedSelectedTime = format(date, 'HH:mm');
    
    for (let index = 0; index < timelinesList.length; index++) {
        const key = timelinesList[index];
        if (key === formattedSelectedTime)
            return availabilityList[key] === RoomTimeAvailabilityType.AVAILABLE;
    };
    
    return false;
};

export const deepCopyRoomsList = (roomsList: RoomType[]) => {
    const newList = roomsList.map(room => {
        return {...room};
    });
    return newList;
};

export const setRoomAvailabilities = (
    date: number, 
    roomsList: RoomType[],
) => {
    
    for (let index = 0; index < roomsList.length; index++) {
        const room = roomsList[index];
        const isAvailableToCurrDate = isTimeAvailable(date, room.availability);
        roomsList[index].isAvailableToCurrDate = isAvailableToCurrDate;
    };
    return roomsList;
};

export const getSortedArrayList = (sortType: SortType, roomsList: RoomType[]) => {
    const orderType = sortType.orderType;
    switch (sortType.buttonType) {
        case SortButtonType.CAPACITY:
            return sortByCapacity(orderType, roomsList);
        case SortButtonType.AVAILABILITY:
            return sortByAvailability(orderType, roomsList);
        case SortButtonType.LEVEL:
            return sortByLevel(orderType, roomsList);
        default:
            // Return unsorted list should foreign sort type was given forcefully
            return roomsList;
    };
};

export const sortByCapacity = (orderType: SortOrderType, roomsList: RoomType[]) => {
    return roomsList.sort((a, b) => {
        const firstNumber = Number(a.capacity);
        const secondNumber = Number(b.capacity);
        if (orderType === SortOrderType.ASCENDING)
            return firstNumber - secondNumber;
        else
            return secondNumber - firstNumber;
    });
};

export const sortByAvailability = (
    orderType: SortOrderType, 
    roomsList: RoomType[]
) => {
    return roomsList.sort((a, b) => {
        const firstBool = a.isAvailableToCurrDate;
        const secondBool = b.isAvailableToCurrDate;

        if (orderType === SortOrderType.ASCENDING)
            // false first, then true
            return (firstBool === secondBool)? 0 : firstBool? 1 : -1;
        else
            // true first, then false
            return (firstBool === secondBool)? 0 : firstBool? -1 : 1;
    });
};

export const sortByLevel = (orderType: SortOrderType, roomsList: RoomType[]) => {
    return roomsList.sort((a, b) => {
        const firstNumber = Number(a.level);
        const secondNumber = Number(b.level);
        if (orderType === SortOrderType.ASCENDING)
            return firstNumber - secondNumber;
        else
            return secondNumber - firstNumber;
    });
};

export const getNextSortOrderType = (
    prevSortType: SortType,
    nextBtnType: SortButtonType,
) => {
    // Change order type to ascending on button type changes
    if (prevSortType.buttonType !== nextBtnType)
        return SortOrderType.ASCENDING;
    else 
    // Else rotate between ascending and descending order
        return prevSortType.orderType === SortOrderType.ASCENDING
        ? SortOrderType.DESCENDING
        : SortOrderType.ASCENDING;
};