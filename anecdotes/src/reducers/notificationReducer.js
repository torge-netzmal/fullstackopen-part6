import {createSlice} from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: 'filter',
  initialState: null,
  reducers: {
    setNotificationText: (state, action) => action.payload,
    removeNotificationText: () => null
  }
})

const {setNotificationText, removeNotificationText} = notificationSlice.actions

export const setNotification = (text, seconds = 5) => {
  return async (dispatch) => {
    dispatch(setNotificationText(text))
    setTimeout(() => dispatch(removeNotificationText()), seconds * 1000)
  }
}

export default notificationSlice.reducer