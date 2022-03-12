import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: null,
  token: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) {
      state.isLoggedIn = !!action.payload.token
      state.token = action.payload.token
      localStorage.setItem('userData', JSON.stringify({
        userId: action.payload.userId,
        token: action.payload.token
      }))
    },
    logout(state) {
      state.isLoggedIn = false
      state.token = null
    },
    setIsLoggedInToFalse(state, action) {
      state.isLoggedIn = false
    }
  }
})

export const authActions = authSlice.actions

export default authSlice