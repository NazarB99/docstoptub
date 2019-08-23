/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {BASE_URL} from '../config/Constants'

import {FETCH_USER, SET_LOADING, GET_PATIENTS} from './type/types'

export const login = (username, password) => async dispatch => {
  dispatch({type: SET_LOADING})
  const response = await fetch(`${BASE_URL}/get_user?login=${username}&password=${password}`)
  const user = await response.json()
  console.log(user)

  dispatch({type: FETCH_USER, payload: user})
}

export const getPatients = token => async dispatch => {
  dispatch({type: SET_LOADING})
  const response = await fetch(`${BASE_URL}/get_users`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const patients = await response.json()
  console.log(patients)

  dispatch({type: GET_PATIENTS, payload: patients})
}
