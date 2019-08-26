/* eslint-disable react/static-property-placement */
import {SET_LOADING_TASKS, GET_TASKS, SET_ERROR} from '../actions/type/types'

const initialState = {
  tasks: [],
  error: {},
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TASKS:
      return {
        ...state,
        loading: true,
      }
    case GET_TASKS:
      return {
        ...state,
        tasks: action.payload,
        error: {},
        loading: false,
      }
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
