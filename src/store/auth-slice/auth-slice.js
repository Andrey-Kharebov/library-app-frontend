import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: false,
  token: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = !!action.payload.token
      state.token = action.payload.token
    },
    logout(state) {
      state.isLoggedIn = false
      state.token = null
    }
  }
})

export const authActions = authSlice.actions

export default authSlice