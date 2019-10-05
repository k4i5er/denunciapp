import axios from 'axios'
const baseURL = 'http://localhost:3000/api/auth'

const SERVICE = axios.create({ withCredentials: true, baseURL })

const AUTH_SERVICE = {
  signup: async (user) => {
    return await SERVICE.post('/signup', user)
  },
  localLogin: async (user) => {
    return await SERVICE.post('/login', user)
  },
  facebookLogin: async () => {
    return await SERVICE.get('/facebook')
  },
  googleLogin: async () => {
    return await SERVICE.get('/google')
  },
  logOut: async () => {
    return await SERVICE.get('/logout')
  }
}

export default AUTH_SERVICE