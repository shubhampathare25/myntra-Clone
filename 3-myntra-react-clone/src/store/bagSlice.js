import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: "bag",
  // Aata state madhe objects thevu: { id: item.id, quantity: 1 }
  initialState: [], 
  reducers: {
    addToBag: (state, action) => {
      const existingItem = state.find(item => item.id === action.payload);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.push({ id: action.payload, quantity: 1 });
      }
    },
    removeFromBag: (state, action) => {
      return state.filter(item => item.id !== action.payload);
    },
    incrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },
    decrementQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
    },
  }
});

export const bagActions = bagSlice.actions;
export default bagSlice;