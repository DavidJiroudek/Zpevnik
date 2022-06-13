import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: [],
}

export const activeChordSlice = createSlice({
  name: 'activeChordState',
  initialState,
  reducers: {
    addChord: (state, action) => {
        state.value = [...state.value, action.payload];
    },
    changeChords: (state, action) => {
      state.value = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { addChord, changeChords} = activeChordSlice.actions

export default activeChordSlice.reducer