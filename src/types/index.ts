export type RoomSliceType = {
    list: RoomType[];
    sortType: SortType;
};

export type RoomType = {
    name: string;
    level: string;
    capacity: string;
    availability: RoomAvailabilityType;
    isAvailableToCurrDate?: boolean;
};

export type RoomAvailabilityType = {
    [key: string]: RoomTimeAvailabilityType;
};

export enum RoomTimeAvailabilityType {
    UNAVAILABLE = '0',
    AVAILABLE = '1'
};

export interface SortType {
    buttonType: SortButtonType;
    orderType: SortOrderType;
};

export enum SortOrderType {
    UNSELECTED,
    ASCENDING,
    DESCENDING,
};

export enum SortButtonType {
    CAPACITY = 'Capacity',
    AVAILABILITY = 'Availability',
    LEVEL = 'Level',
};