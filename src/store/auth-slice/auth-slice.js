import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isLoggedIn: null,
  userId: null,
  token: null,
  tokenExpirationDate: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action) { // action.payload{ userId, token, expiration }
      state.isLoggedIn = !!action.payload.token
      state.userId = action.payload.userId
      state.token = action.payload.token

      // Udemy Mern 12 - 186
      const tokenExpirationDate = new Date(new Date().getTime() + 1000 * 60 * 60) // current time + one hour
      state.tokenExpirationDate = action.payload.expiration ? action.payload.expiration : tokenExpirationDate.toISOString()

      localStorage.setItem('userData', JSON.stringify({
        userId: action.payload.userId,
        token: action.payload.token,
        expiration: state.tokenExpirationDate 
      }))
    },
    logout(state) {
      state.isLoggedIn = false
      state.userId = null
      state.token = null
      state.tokenExpirationDate = null
    },
    setIsLoggedInToFalse(state, action) {
      state.isLoggedIn = false
    }
  }
})

export const authActions = authSlice.actions

export default authSlice