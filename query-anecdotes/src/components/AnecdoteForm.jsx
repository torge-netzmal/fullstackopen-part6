import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {createAnecdote, getAnecdotes} from "../requests.js";
import {useContext} from "react";
import NotificationContext from "../NotificationContext.jsx";

const AnecdoteForm = () => {

  const queryClient = useQueryClient()
  const {notificationDispatch} = useContext(NotificationContext)

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
      notificationDispatch({type: 'SET', payload: `You created '${newAnecdote.content}'`})
      setTimeout(() => notificationDispatch({type: 'CLEAR'}), 5000)
    },
    onError: () => {
      notificationDispatch({type: 'SET', payload: 'Anecdote creation failed'})
      setTimeout(() => notificationDispatch({type: 'CLEAR'}), 5000)
    }
  })

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote"/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
