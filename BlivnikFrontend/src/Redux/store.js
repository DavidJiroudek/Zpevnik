import tagState from "./reducers/tagState";
import tagCounter from "./reducers/tagCounter";
import editMenuState from "./reducers/editMenuState";
import activeChordsState from "./reducers/activeChordsState";
import { configureStore } from '@reduxjs/toolkit'

export default configureStore({
  reducer: {
    tagState,
    tagCounter,
    editMenuState,
    activeChordsState

  }
})
