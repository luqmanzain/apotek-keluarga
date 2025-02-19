// src/redux/financeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    incomes: [],
    expenses: [],
};

const financeSlice = createSlice({
    name: "finance",
    initialState,
    reducers: {
        addIncome: (state, action) => {
            state.incomes.push(action.payload);
        },
        addExpense: (state, action) => {
            state.expenses.push(action.payload);
        }
    },
});

export const { addIncome, addExpense } = financeSlice.actions;
export default financeSlice.reducer;
