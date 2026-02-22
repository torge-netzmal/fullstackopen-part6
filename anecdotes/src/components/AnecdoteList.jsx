import {useDispatch, useSelector} from "react-redux";
import {vote} from "../reducers/anecdoteReducer";
import {setNotification, removeNotification} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter(a => a.content.includes(state.filter)).sort((a, b) => b.votes - a.votes))
  const dispatch = useDispatch()
  return (
    anecdotes.map(anecdote => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => {
            console.log(anecdote)
            dispatch(vote(anecdote.id))
            dispatch(setNotification(`You voted '${anecdote.content}'`))
            setTimeout(() => dispatch(removeNotification()), 5000)
          }}>vote
          </button>
        </div>
      </div>
    ))
  )


}

export default AnecdoteList