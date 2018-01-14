// @flow
import {
  get,
  post,
  put,
  patch
} from 'api/utils'

export async function taskSearchAPI(searchString) {
  if (searchString) {
    return get('/task?search=' + encodeURI(searchString))
  } else {
    return get('/task')
  }
}
export async function taskGetAPI(taskId) {
  return get('/task/' + taskId)
}
export async function taskAddAPI(data) {
  return post('/task', data)
}
export async function taskSaveAPI(data) {
  return put('/task/' + data._id, data)
}
export async function taskUpdateAPI(data) {
  return patch('/task/' + data._id, data)
}