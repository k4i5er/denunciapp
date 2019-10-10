import React,{ Component, createContext } from 'react'
import AUTH_SERVICE from '../services/auth'

export const MyContext = createContext()

class MyProvider extends Component {
  state = {
    bearer: null
  }

  // Register logged user at the context 
  userRegister = (bearer) => {
    this.setState({ bearer })
  }

  // Logout context service
  logOff = async () => {
    try {
      await AUTH_SERVICE.logOut()
      this.setState.bearer= null
    } catch(err){
      return err
    }
  }

  getBearer = () => {
    return this.state.bearer
  }

  getUserFullName = () => {
    return `${this.state.name} ${this.state.lastName}`
  }

  render() {
    const { state, userRegister, getBearer, getUserFullName, logOff } = this
    return (
      <MyContext.Provider value={{ state, userRegister, getBearer, getUserFullName, logOff }}>
        {this.props.children}
      </MyContext.Provider>
    )
  }

}

export default MyProvider