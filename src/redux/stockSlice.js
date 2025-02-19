// src/redux/stockSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stocks: [
    {
      id: 1,
      name: "Paracetamol",
      quantity: 100,
      buyPrice: 2000,
      sellPrice: 5000,
    },
    { id: 2, name: "Ibuprofen", quantity: 80, buyPrice: 4000, sellPrice: 8000 },
    {
      id: 3,
      name: "Amoxicillin",
      quantity: 50,
      buyPrice: 5000,
      sellPrice: 10000,
    },
    { id: 4, name: "Cetrizine", quantity: 70, buyPrice: 3000, sellPrice: 7000 },
    { id: 5, name: "Antasida", quantity: 90, buyPrice: 2500, sellPrice: 6000 },
  ],
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    addStock: (state, action) => {
      state.stocks.push(action.payload);
    },
    removeStock: (state, action) => {
      state.stocks = state.stocks.filter(
        (stock) => stock.id !== action.payload
      );
    },
    updateStock: (state, action) => {
      const index = state.stocks.findIndex(
        (stock) => stock.id === action.payload.id
      );
      if (index !== -1) {
        state.stocks[index] = action.payload;
      }
    },
    reduceStock: (state, action) => {
      const { medicineName, quantity } = action.payload;
      const stockItem = state.stocks.find(
        (stock) => stock.name === medicineName
      );
      if (stockItem && stockItem.quantity >= quantity) {
        stockItem.quantity -= quantity;
      }
    },
    increaseStock: (state, action) => {
      const { itemName, quantity, buyPrice, category } = action.payload;
      if (category === "Stok") {
        const stockItem = state.stocks.find((stock) => stock.name === itemName);
        if (stockItem) {
          stockItem.quantity += Number(quantity);
        } else {
          state.stocks.push({
            id: Date.now(),
            name: itemName,
            quantity,
            buyPrice,
            sellPrice: buyPrice * 1.5,
          });
        }
      }
    },
  },
});

export const {
  addStock,
  removeStock,
  updateStock,
  reduceStock,
  increaseStock,
} = stockSlice.actions;
export default stockSlice.reducer;
