import React, { Component, createContext } from 'react'
// import AUTH_SERVICE from '../services/auth'

export const Context = createContext()

class Provider extends Component {
  state = {
    user: null
  }

  // Login service
  registerUser = (user) => {
    this.setState({ user })
  }

  logOff = async () => {
    // try {
    //   await 
    // }
  }

}