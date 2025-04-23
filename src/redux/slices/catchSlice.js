import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    catches: [],
};

export const catchSlice = createSlice({
    name: 'catch',
    initialState,
    reducers: {
        addCatch: {
            reducer: (state, action) => {
                state.catches.push(action.payload);
            },
            prepare: (catchData) => ({
                payload: {
                    id: nanoid(),
                    ...catchData,
                },
            }),
        },
        removeCatch: (state, action) => {
            state.catches = state.catches.filter((c) => c.id !== action.payload);
        },
        clearCatches: (state) => {
            state.catches = [];
        },
    },
});

export const { addCatch, removeCatch, clearCatches } = catchSlice.actions;
export default catchSlice.reducer;
