import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    concatAnecdote(state, action) {
      state.push(action.payload)
    },
    updateAnecdote(state, action) {
      const id = action.payload.id


      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.payload
      )
    }
  }
})

const {setAnecdotes, concatAnecdote, updateAnecdote} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.createNew(content)
    dispatch(concatAnecdote(anecdote))
  }
}

export const vote = (anecdote) => {
  return async (dispatch) => {

    const newAnecdote = await anecdoteService.updateOne(anecdote.id, {...anecdote, votes: (anecdote.votes ?? 0) + 1})
    dispatch(updateAnecdote(newAnecdote))
  }
}

export default anecdoteSlice.reducer
