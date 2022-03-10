import { createSlice } from '@reduxjs/toolkit'

const initialState = {}

const languagesSlice = createSlice({
  name: 'languages',
  initialState,
  reducers: {}
})

export const languagesActions = languagesSlice.actions

export default languagesSlice