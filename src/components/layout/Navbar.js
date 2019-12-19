import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { suscriptores, home } from "../../routes";
import { compose } from "redux";
import { connect } from "react-redux";
import { firebaseConnect } from "react-redux-firebase";
import PropTypes from 'prop-types'

class Navbar extends Component {
  state = {
    usuarioAuntenticado: false
  };

  // obtener los props en automático
  static getDerivedStateFromProps(nextProps, prevState) {
    // console.log(nextProps);
    const { auth } = nextProps;

    if (auth.uid) {
      return { usuarioAuntenticado: true };
    } else {
      return { usuarioAuntenticado: false };
    }
  }

  cerrarSesion = () => {
    const { firebase } = this.props

    firebase.logout()
  }

  render() {
    const { usuarioAuntenticado } = this.state;
    // extraer datos de la persona autenticada
    const { auth } = this.props

    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-5">
        <nav className="navbar-navbar-light">
          <span className="navbar-brand h1 mb-0">
            Administrador de biblioteca
          </span>
        </nav>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarColor01"
          aria-controls="navbarColor01"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarColor01">
          {usuarioAuntenticado ? (
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <NavLink
                  to={suscriptores}
                  className="nav-link"
                  activeClassName="active"
                  exact={true}
                >
                  Suscriptores
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to={home}
                  className="nav-link"
                  activeClassName="active"
                  exact={true}
                >
                  Libros
                </NavLink>
              </li>
            </ul>
          ) : null}

          {usuarioAuntenticado ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="#!" className="nav-link">{auth.email}</a>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger" onClick={this.cerrarSesion}>Cerrar sesión</button>
              </li>
            </ul>
          ) : null}
        </div>
      </nav>
    );
  }
}

Navbar.propTypes = {
  firebase : PropTypes.object.isRequired,
  auth : PropTypes.object.isRequired
}

export default compose(
  firebaseConnect(),
  connect((state, props) => ({
    auth: state.firebase.auth
  }))
)(Navbar);
