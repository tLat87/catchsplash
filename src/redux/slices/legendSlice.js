import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = {
    legends: [],
};

export const catchSlice = createSlice({
    name: 'legend',
    initialState,
    reducers: {
        addLegend: {
            reducer: (state, action) => {
                state.legends.push(action.payload);
            },
            prepare: (catchData) => ({
                payload: {
                    id: nanoid(),
                    ...catchData,
                },
            }),
        },
        removeLegend: (state, action) => {
            state.legends = state.legends.filter((c) => c.id !== action.payload);
        },
        clearLegend: (state) => {
            state.legends = [];
        },
    },
});

export const { addLegend, removeLegend, clearLegend } = catchSlice.actions;
export default catchSlice.reducer;
