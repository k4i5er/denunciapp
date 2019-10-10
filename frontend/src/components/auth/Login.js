import React, { Component } from 'react';
import AUTH_SERVICE from '../../services/auth'
import { Link } from 'react-router-dom'
import { Icon } from 'semantic-ui-react'
import {MyContext} from '../../context'

class Login extends Component {

  state = {
    user: {}
  }

  componentDidMount() {
    
  }

  handleInput = (e) =>{
    const { user } = this.state
    const key = e.target.name
    user[key] = e.target.value
    this.setState({ user })
    console.log(this.state.user)
  }

  doLogin = async (e) => {
    e.preventDefault()
    try {
        const bearer = await AUTH_SERVICE.localLogin(this.state.user)
        this.context.userRegister(bearer)
        this.props.history.push('/view/crimes')
    } catch (err) {
      this.setState({ feedback: 'Usuario o contraseña incorrecta' })
      setTimeout(() => { this.setState({ feedback: '' }) }, 3000)
    }
  }

  render() {
    return (
      <div>
        <form name="login" onSubmit={this.doLogin}>
          <p>{this.state.feedback}</p>
          <label htmlFor="email">Usuario</label>
          <input type="text" name="email" value={this.state.user.username} onChange={this.handleInput} />
          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" value={this.state.user.password} onChange={this.handleInput} />
          <input type="submit" value="Login" />
        </form>
        <p>¿No tienes una cuenta? Puedes crear una <Link to="/auth/signup">aquí</Link></p>
      </div>
    );
  }
}

Login.contextType = MyContext

export default Login;