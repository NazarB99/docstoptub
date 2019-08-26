/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {BASE_URL} from '../config/Constants'

import {GET_TASKS, SET_LOADING_TASKS, SET_ERROR} from './type/types'

export const getTasks = token => async dispatch => {
  dispatch({type: SET_LOADING_TASKS})
  const response = await fetch(`${BASE_URL}/get_tasks`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const tasks = await response.json()
  if (tasks.type === 'error') {
    dispatch({type: SET_ERROR, payload: tasks})
  } else {
    dispatch({type: GET_TASKS, payload: tasks})
  }
}

export const addTask = (data, token) => async dispatch => {
  const response = await fetch(`${BASE_URL}/add_task`, {
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
