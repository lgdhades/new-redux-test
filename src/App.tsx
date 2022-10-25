// App Description:
// A simple counter that has a timer to increment/decrement it automatically
// based on the value of the dropdown menu.
// It has also manual buttons to increment/decrement it manually,
// and it has some rules implemented in certain cases.

import './App.css'
import { useEffect } from 'react'
import { configureStore, createAction } from '@reduxjs/toolkit'
import { Action, combineReducers, Dispatch } from 'redux'
import { useDispatch, useSelector } from 'react-redux'

const increment = createAction('increment')
const decrement = createAction('decrement')

let addedNumber = 1
const getMenuNumber = (value: string) => {
  addedNumber = Number(value)
}

// Increment the counter by the value of "addedNumber" variable if increment action dispatched,
// decrement the counter by the value of "addedNumber" variable if decrement action dispatched,
// otherwise leaves the counter number as is.
const counter = (startNumber = 0, action: Action) =>
  increment.match(action)
    ? startNumber + addedNumber
    : decrement.match(action)
    ? startNumber - addedNumber
    : startNumber

const root = combineReducers({ counter })

// Increments the counter automatically every second if the counter value was between 0 & 9
// and decrements the counter automatically every second if the counter value was below 0.
const timer = ({ dispatch }: { dispatch: Dispatch<Action> }) => {
  setInterval(() => {
    if (
      ReduxStore.getState().counter < 10 &&
      ReduxStore.getState().counter > -1
    ) {
      dispatch(increment())
    } else if (ReduxStore.getState().counter < 0) {
      dispatch(decrement())
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

  // shows alert when the counter reaches to 20
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
      <div>
        <select onChange={(e) => getMenuNumber(e.target.value)}>
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
        </select>
      </div>
    </>
  )
}

export default App
