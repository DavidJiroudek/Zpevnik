import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: null,
}

export const editMenuSlice = createSlice({
  name: 'editMenuState',
  initialState,
  reducers: {
    changeEditMenu: (state, action) => {
      state.value = action.payload;
    },

  },
})

// Action creators are generated for each case reducer function
export const { changeEditMenu} = editMenuSlice.actions

export default editMenuSlice.reducer