import './App.css'
import { configureStore, createAction } from '@reduxjs/toolkit'
import { Action, combineReducers, Dispatch } from 'redux'
import { createRoot } from 'react-dom/client'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { time } from 'console'

// A simple counter that keep incrementing automatically by 1 every second ,
// and has 2 buttons to manually increment or decrement the counter.
// if you used the buttons to increment or decerment the counter manaually,
// the counter will keep incrementing automatically by 1 after you finish using the buttons
// and it will start from the last number the counter has now.

const increment = createAction('increment')
const decrement = createAction('decrement')

// Increment the counter by 1 if increment action dispatched,
// decrement the counter by 1 if decrement action dispatched,
// otherwise leave the counter number as is.
const counter = (startNumber = 0, action: Action) =>
  increment.match(action)
    ? startNumber + 1
    : decrement.match(action)
    ? startNumber - 1
    : startNumber

const root = combineReducers({ counter })

// Increments the counter automatically by 1 every second
const timer = ({ dispatch }: { dispatch: Dispatch<Action> }) => {
  setInterval(() => {
    if (ReduxStore.getState().counter < 10) {
      dispatch(increment())
    }
  }, 1000)

  return (next: (arg0: Action) => void) => (action: Action) => {
    next(action)
  }
}

export const ReduxStore = configureStore({
  reducer: root,
  middleware: [timer],
})

const App = () => {
  const dispatch = useDispatch()
  const counter = useSelector(
    (state: ReturnType<typeof ReduxStore.getState>) => state.counter
  )

  const handleIncrmenet = () => {
    dispatch(increment())
    if (counter === 19) {
      alert('Counter reached to 20')
    }
  }

  useEffect(() => {
    console.log(Date.now())
  }, [])

  return (
    <>
      <button onClick={() => dispatch(decrement())}>-</button>
      {counter}
      <button onClick={handleIncrmenet}>+</button>
    </>
  )
}

export default App
