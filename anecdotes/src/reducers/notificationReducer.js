import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    setNotification: (state, action) => action.payload,
    removeNotification: () => null
  }
})

export const {setNotification, removeNotification} = notificationSlice.actions
export default notificationSlice.reducer