import { configureStore } from '@reduxjs/toolkit';
import roomsReducer from '@reducers/roomsSlice';
import selectedDateReducer from '@reducers/selectedDateSlice';

const store = configureStore({
    reducer: {
        rooms: roomsReducer,
        selectedDate: selectedDateReducer,
    },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;