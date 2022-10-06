export type RootStackParamList = {
    Room: undefined;
    BookingStatus: BookingStatusNavigationsOptions;
    Camera: undefined;
};

export enum NAVIGATION_STRINGS {
    ROOM = 'Room',
    BOOKING_STATUS = 'BookingStatus',
    CAMERA = 'Camera',
};

export interface BookingStatusNavigationsOptions {
    url: string;
};