import {createSlice} from "@reduxjs/toolkit";

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    createAnecdote(state, action) {
      const content = action.payload
      state.push(content)
    },
    vote(state, action) {
      const id = action.payload

      const anecdoteToChange = state.find(n => n.id === id)

      const changedAnecdote = {
        ...anecdoteToChange,
        votes: (anecdoteToChange.votes ?? 0) + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    }
  }
})
export const {setAnecdotes, createAnecdote, vote} = anecdoteSlice.actions
export default anecdoteSlice.reducer
