import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const tagSlice = createSlice({
  name: 'tagState',
  initialState,
  reducers: {
    addTag: (state, action) => {
        state.value = [...state.value, action.payload];
    },
    changeTags: (state, action) => {
      state.value = action.payload;
    },
    removeTagById: (state, action) => {
      state.value = state.value.filter(obj => obj.id !== action.payload)
    }

  },
})

// Action creators are generated for each case reducer function
export const { addTag, changeTags, removeTagById} = tagSlice.actions

export default tagSlice.reducer