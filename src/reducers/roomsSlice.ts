import { RoomSliceType, RoomType, SortType } from '@apptypes/index';
import { DEFAULT_SORT_TYPE } from '@constants/defaultValues';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: RoomSliceType = {
    list: [],
    sortType: {
        ...DEFAULT_SORT_TYPE
    },
};

const roomsSlice = createSlice({
    name: 'rooms',
    initialState,
    reducers: {
        roomsListModified(state, action: PayloadAction<RoomType[]>) {
            const newList = action.payload;
            state.list = newList;
        },
        sortTypeModified(state, action: PayloadAction<SortType>) {
            const { buttonType, orderType } = action.payload;
            if (state.sortType.buttonType != buttonType)
                state.sortType.buttonType = buttonType;
            if (state.sortType.orderType != orderType)
                state.sortType.orderType = orderType;
        },
    },
});

export const { 
    roomsListModified,
    sortTypeModified,
} = roomsSlice.actions;

export default roomsSlice.reducer;