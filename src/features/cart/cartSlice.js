import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addtoCart , fetchItemsByUserId  , updateCart , deleteItemfromCart , resetCart} from './cartAPI';

const initialState = {
  status : 'idle',
  items: [],
};

export const addtoCartAsync = createAsyncThunk(
  'cart/addtoCart',
  async (item) => {
    const response = await addtoCart(item);
    return response.data;
  }
);
export const fetchItemsByUserIdAsync = createAsyncThunk(
  'cart/fetchItemsByUserId',
  async (userId) => {
    const response = await fetchItemsByUserId(userId);
    return response.data;
  }
);
export const updateCartAsync = createAsyncThunk(
  'cart/updateCart',
  async (update) => {
    const response = await updateCart(update);
    return response.data;
  }
);
export const deleteItemfromCartAsync = createAsyncThunk(
  'cart/deleteItemfromCart',
  async (itemId) => {
    const response = await deleteItemfromCart(itemId);
    return response.data;
  }
);
export const resetCartAsync = createAsyncThunk(
  'cart/resetCart',
  async (userId) => {
    const response = await resetCart(userId);
    return response.data;
  }
);



export const counterSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(addtoCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addtoCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items.push(action.payload) ;
      })
      .addCase(fetchItemsByUserIdAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = action.payload ;
      })
      .addCase(updateCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updateCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.items.findIndex(item=>item.id===action.payload.id);
        state.items[index] = action.payload ;
      })
      .addCase(deleteItemfromCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deleteItemfromCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const index= state.items.findIndex(item=>item.id===action.payload.id);
        state.items.splice(index,1) ;
      })
      .addCase(resetCartAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(resetCartAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.items = [] ;
      });
  },
});

export const { increment } = counterSlice.actions;

export const selectItems = (state) => state.cart.items;


export default counterSlice.reducer;
