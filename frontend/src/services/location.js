import axios from 'axios'
const baseURL = `${process.env.REACT_APP_BASEURL}/api/location`

const SERVICE = axios.create({ baseURL })

const LOCATION_SERVICE = {
  report:  (userReport) => {
      console.log("locationService...", baseURL, userReport)
      return  SERVICE.post('/report', userReport)
    // return axios.post(`${baseURL}/report`, userReport)
  },
}

export default LOCATION_SERVICE