/* eslint-disable camelcase */
/* eslint-disable import/prefer-default-export */
import {BASE_URL} from '../config/Constants'

import {GET_TEMPLATES, SET_LOADING_TEMPLATES, SET_ERROR} from './type/types'

export const getTemplates = token => async dispatch => {
  dispatch({type: SET_LOADING_TEMPLATES})
  const response = await fetch(`${BASE_URL}/get_templates`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  })
  const templates = await response.json()
  if (templates.type === 'error') {
    dispatch({type: SET_ERROR, payload: templates})
  } else {
    dispatch({type: GET_TEMPLATES, payload: templates})
  }
}

export const addTemplate = (data, token) => async dispatch => {
  const response = await fetch(`${BASE_URL}/add_template`, {
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
