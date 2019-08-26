/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {BASE_URL} from '../config/Constants'

import {FETCH_USER, SET_LOADING, GET_PATIENTS, SET_ERROR} from './type/types'

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
  if (patients.type === 'error') {
    dispatch({type: SET_ERROR, payload: patients})
  } else {
    dispatch({type: GET_PATIENTS, payload: patients})
  }
}

export const addPatient = (data, token) => async dispatch => {
  const response = await fetch(`${BASE_URL}/add_user`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(data),
  })
  const res = await response.json()
  return new Promise((resolve, reject) => {
    console.log(res)
    if (res.type === 'error') {
      reject(res)
    } else {
      resolve(res)
    }
  })
}
