import axios from 'axios'
const baseURL = `${process.env.REACT_APP_BASEURL}/api/data`

const SERVICE = axios.create({ withCredentials: true, baseURL })

const DATA_SERVICE = {
  getCrimes: async () => {
    const data = await SERVICE.get('/crimes')
    return data
      
  },
  getCrime: async (crimeId) => {
    return await SERVICE.get(`/crime/${crimeId}`)
  }
  
}

export default DATA_SERVICE