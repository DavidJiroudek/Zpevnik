import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const tagCounterSlice = createSlice({
  name: 'tagCounter',
  initialState,
  reducers: {
    increment: (state) => {
        state.value += 1;
    }
  },
})

// Action creators are generated for each case reducer function
export const { increment} = tagCounterSlice.actions

export default tagCounterSlice.reducer