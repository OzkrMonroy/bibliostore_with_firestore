import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { suscriptores } from '../../routes'
import PropTypes from 'prop-types'
import { successAlert } from '../../alertDialogs'
// Firestore
import { firestoreConnect } from 'react-redux-firebase'

class NuevoSuscriptor extends Component {
  state = { 
    nombre : '',
    apellido: '',
    carrera: '',
    codigo: ''
   }

  // Agrega un nuevo suscriptor a la bd
  agregarSuscriptor = e => {
    e.preventDefault()

    // Obtener los valores del state
    const nuevoSuscriptor = this.state

    // Extraer firestore de props
    const { firestore, history } = this.props

    // Guardarlo en la base de datos
    firestore.add({collection: 'suscriptores'}, nuevoSuscriptor)
             .then(() => {
               successAlert('Agregado', 'El suscriptor se ha agregado correctamente')
               history.push(suscriptores)
              })
  }

  //  Lee los datos del formulario
  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  render() { 
    return ( 
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={suscriptores} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-2"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12 mb-2">
          <h2><i className="fas fa-user-plus mr-2"></i> Nuevo Suscriptor</h2>
          
          <div className="row justify-content-center mb-2">
            <div className="col-md-8 mt-3">
              <form onSubmit={this.agregarSuscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="nombre"
                    placeholder="Ingresa el nombre del suscriptor"
                    required
                    onChange={this.leerDato}
                    value={this.state.nombre}
                  />
                </div>

                <div className="form-group">
                  <label>Apellido:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="apellido"
                    placeholder="Ingresa el apellido del suscriptor"
                    required
                    onChange={this.leerDato}
                    value={this.state.apellido}
                  />
                </div>

                <div className="form-group">
                  <label>Carrera:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="carrera"
                    placeholder="Ingresa la carrera del suscriptor"
                    required
                    onChange={this.leerDato}
                    value={this.state.carrera}
                  />
                </div>

                <div className="form-group">
                  <label>Código:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="codigo"
                    placeholder="Ingresa el codigo del suscriptor"
                    required
                    onChange={this.leerDato}
                    value={this.state.codigo}
                  />
                </div>

                <input type="submit" className="btn btn-success my-2" value="Agregar suscriptor"/>
              </form>
            </div>
          </div>
        </div>
      </div>
     );
  }
}

NuevoSuscriptor.propTypes = {
  firestore : PropTypes.object.isRequired
}
 
export default firestoreConnect()(NuevoSuscriptor);