import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { home } from "../../routes";
import Spinner from "../layout/spinner/Spinner";
import PropTypes from "prop-types";
import { successAlert } from '../../alertDialogs'
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

// Redux actions
import { buscarUsuario }  from '../../actions/buscarUsuarioAction'

class PrestamoLibro extends Component {
  state = { 
    busqueda : '',
    error: false
   }

  buscarAlumno = e => {
    e.preventDefault()

    const { busqueda } = this.state

    const { firestore, buscarUsuario } = this.props

    // hacer la consulta
    const coleccion = firestore.collection('suscriptores')
    const consulta = coleccion.where("codigo", "==", busqueda).get()

    // leer datos
    consulta.then(res => {
      if(res.empty) {
        // no hay resultado
        buscarUsuario({})
        this.setState({
          error : true
        })
      }else {
        // colocar los datos con redux
        const datos = res.docs[0]
        buscarUsuario(datos.data())
        this.setState({
          error: false
        })
      }
    })
  }

  leerDato = e => {
    this.setState({
      [e.target.name] : e.target.value
    })
  }

  solicitarPrestamo = () => {
    const { usuario, buscarUsuario } = this.props
    usuario.fecha_solicitud = new Date().toLocaleDateString()

    // Los elementos de props no se pueden mutar, toma una copia y crea un arreglo nuevo
    let prestados = []
    prestados = [...this.props.libro.prestados, usuario]

    // Copiar el objeto de libro 
    let libro = {...this.props.libro}

    // Eliminar los prestados que posea
    delete libro.prestados

    // Asignar los nuevos prestados
    libro.prestados = prestados

    const {firestore, history} = this.props

    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libro).then(() => {
      successAlert('¡Agregado!', 'El libro se asignó al usuario correctamente')
      buscarUsuario({})
      history.push(home)
    })

  }

  render() { 
    const { libro } = this.props

    if(!libro) return <Spinner/>

    // extraer datos del alumno
    const { usuario } = this.props
    const { error } = this.state

    return ( 
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={home} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-2"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12">
          <h2 className="mb-5">
            <i className="fas fa-book mr-2"></i>
            Solicitar prestamo : {libro.titulo}
          </h2>

          <div className="row justify-content-center">
            <div className="col-md-8">
              <form onSubmit={this.buscarAlumno} className="mb-4">
                <legend className="color-primary text-center mb-4">
                  Busca el suscriptor por código
                </legend>
                <div className="form-group mb-4">
                  <input 
                    type="text" 
                    name="busqueda"
                    placeholder="Código"
                    className="form-control" 
                    onChange={this.leerDato}
                  />
                </div>
                <input type="submit" value="Buscar alumno" className="btn btn-success btn-block"/>
              </form>
              {/* Muestra la ficha del alumno */}
              {usuario.nombre ? <FichaSuscriptor alumno={usuario} solicitarPrestamo={this.solicitarPrestamo}/> : null}
              {error ? <div className="alert alert-danger text-center">Datos incorrectos</div> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
 
PrestamoLibro.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "libros",
      storeAs: "libro",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered }, usuario }, props) => ({
    libro: ordered.libro && ordered.libro[0],
    usuario: usuario
  }), { buscarUsuario })
)(PrestamoLibro);