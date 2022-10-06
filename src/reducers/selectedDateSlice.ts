import { formatToClosestThirtyMinutes } from '@helpers/dateTimeHelper';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: number = formatToClosestThirtyMinutes(new Date()).getTime();

const selectedDateSlice = createSlice({
    name: 'date',
    initialState,
    reducers: {
        selectedDateModified(_, action: PayloadAction<number>) {
            const date = action.payload;
            return date;
        },
    },
});

export const { 
    selectedDateModified,
} = selectedDateSlice.actions;

export default selectedDateSlice.reducer;