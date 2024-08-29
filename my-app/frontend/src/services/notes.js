import axios from '../util/apiClient'
const baseUrl = '/notes'

const getAll = async() => {
  const response = await axios.get(baseUrl)
  return response.data
}

export default { getAll }