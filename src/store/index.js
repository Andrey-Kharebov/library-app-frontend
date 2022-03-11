import { configureStore } from '@reduxjs/toolkit'

import authSlice from './auth-slice/auth-slice'
import languagesSlice from './languages-slice/languages-slice'
import uiSlice from './ui-slice/ui-slice'

const store = configureStore({
  reducer: {
    authReducer: authSlice.reducer,
    languagesReducer: languagesSlice.reducer,
    uiReducer: uiSlice.reducer
  }
})

export default store