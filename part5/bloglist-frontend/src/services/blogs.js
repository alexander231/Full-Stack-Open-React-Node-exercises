import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config 
const setToken = newToken => {
  token = `bearer ${newToken}`
  config = {
    headers: {Authorization: token},
  }
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async newObject => {
  
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async ObjectToUpdate => {
  const response = await axios.put(`${baseUrl}/${ObjectToUpdate.id}`, ObjectToUpdate, config)
  return response.data
}

const remove = async ObjectToDelete => {
  const response = await axios.delete(`${baseUrl}/${ObjectToDelete.id}`, config)
  return response.data
}
export default { getAll, create, update, remove, setToken }