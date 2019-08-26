/* eslint-disable react/static-property-placement */
import {SET_LOADING_TEMPLATES, GET_TEMPLATES, SET_ERROR} from '../actions/type/types'

const initialState = {
  templates: [],
  error: {},
  loading: false,
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING_TEMPLATES:
      return {
        ...state,
        loading: true,
      }
    case GET_TEMPLATES:
      return {
        ...state,
        templates: action.payload,
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
