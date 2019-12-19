import React, { Component } from 'react';
import { firebaseConnect } from 'react-redux-firebase'
import PropTypes from 'prop-types'

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  iniciarSesion = e => {
    e.preventDefault()

    // Extraemos firebase
    const { firebase } = this.props

    const { email, password } = this.state

    // autenticamos el usuario
    firebase.login({
      email,
      password
    }).then( res => console.log('Iniciaste sesión'))
      .catch(err => console.log(err))

  }

  render() { 
    return (
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card mt-5">
            <div className="card-body">
              <h2 className="text-center py-4">
                <i className="fas fa-lock mr-2"></i> Iniciar sesión
              </h2>
              <form onSubmit={this.iniciarSesion}>
                <div className="form-group">
                  <label>Email:</label>
                  <input 
                    type="email"
                    className="form-control"
                    name="email"
                    required
                    value={this.state.email}
                    onChange={this.leerDato}
                  />
                </div>

                <div className="form-group">
                  <label>Contraseña:</label>
                  <input 
                    type="password" 
                    className="form-control"
                    name="password"
                    required
                    value={this.state.password}
                    onChange={this.leerDato}
                  />
                </div>

                <input type="submit" value="Iniciar Sesión" className="btn btn-success btn-block"/>

              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  firebase : PropTypes.object.isRequired
}

export default firebaseConnect()(Login);