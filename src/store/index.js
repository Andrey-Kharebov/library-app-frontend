import { configureStore } from '@reduxjs/toolkit'

import languagesSlice from './languages-slice/languages-slice'
import uiSlice from './ui-slice/ui-slice'

const store = configureStore({
  reducer: {
    languagesReducer: languagesSlice.reducer,
    uiReducer: uiSlice.reducer
  }
})

export default store