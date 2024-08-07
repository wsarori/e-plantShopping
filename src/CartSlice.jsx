import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    addItem: (state, action) => {
      const { name, image, cost } = action.payload;
      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // Update quantity for existing item (immutable)
        existingItem.quantity = existingItem.quantity + 1;
      } else {
        // Add new item with quantity 1 (immutable)
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },
    removeItem: (state, action) => {
      const { name } = action.payload;
      // Use filter to create a new array without the removed item
      state.items = state.items.filter(item => item.name !== name);
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const index = state.items.findIndex(item => item.name === name);

      if (index !== -1 && quantity > 0) {
        // Update quantity for existing item at the found index (immutable)
        state.items[index].quantity = quantity;
      } else {
        console.warn(`Item '${name}' not found in cart or invalid quantity provided`);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
