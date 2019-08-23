/* eslint-disable react/static-property-placement */
import {FETCH_USER, SET_LOADING, GET_PATIENTS} from '../actions/type/types'

const initialState = {
  user: {},
  patients: [],
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USER:
      return {
        ...state,
        user: action.payload,
        loading: false,
      }
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      }
    case GET_PATIENTS:
      return {
        ...state,
        patients: action.payload,
        loading: false,
      }
    default:
      return state
  }
}
