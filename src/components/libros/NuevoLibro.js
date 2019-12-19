import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { home } from '../../routes'
import PropTypes from 'prop-types'
import Swal from 'sweetalert2'
// Firestore
import { firestoreConnect } from 'react-redux-firebase'

class NuevoLibro extends Component {
  state = { 
    titulo : '',
    editorial: '',
    ISBN: '',
    existencias: 1,
    prestados: []
   }

   agregarLibro = e => {
    e.preventDefault()

    // Obtener los valores del state
    const nuevoLibro = this.state

    // Extraer firestore de props
    const { firestore, history } = this.props

    // Guardarlo en la base de datos
    firestore.add({collection: 'libros'}, nuevoLibro)
             .then(() => {
              Swal.fire(
                '¡Agregado!',
                'El libro se ha agregado correctamente',
                'success'
              )
               history.push(home)
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
          <Link to={home} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-2"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12 mb-2">
          <h2><i className="fas fa-book mr-2"></i> Nuevo Libro</h2>
          
          <div className="row justify-content-center mb-2">
            <div className="col-md-8 mt-3">
              <form onSubmit={this.agregarLibro}>
                <div className="form-group">
                  <label>Título:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="titulo"
                    placeholder="Ingresa el título del libro"
                    required
                    onChange={this.leerDato}
                    value={this.state.titulo}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="editorial"
                    placeholder="Ingresa la editorial del libro"
                    required
                    onChange={this.leerDato}
                    value={this.state.editorial}
                  />
                </div>

                <div className="form-group">
                  <label>ISBN:</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    name="ISBN"
                    placeholder="Ingresa el ISBN del libro"
                    required
                    onChange={this.leerDato}
                    value={this.state.ISBN}
                  />
                </div>

                <div className="form-group">
                  <label>Existencia:</label>
                  <input 
                    type="number"
                    min="1"
                    className="form-control" 
                    name="existencias"
                    placeholder="Ingresa la cantidad de libros"
                    required
                    onChange={this.leerDato}
                    value={this.state.existencias}
                  />
                </div>

                <input type="submit" className="btn btn-success my-2" value="Agregar libro"/>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
NuevoLibro.propTypes = {
  firestore : PropTypes.object.isRequired
}
 
export default firestoreConnect()(NuevoLibro);