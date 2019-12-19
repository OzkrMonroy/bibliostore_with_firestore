import React, { Component } from 'react';
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { home } from "../../routes";
import Spinner from "../layout/spinner/Spinner";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import FichaSuscriptor from '../suscriptores/FichaSuscriptor';

class PrestamoLibro extends Component {
  state = { 
    busqueda : '',
    resultado : {},
    error: false
   }

  buscarAlumno = e => {
    e.preventDefault()

    const { busqueda } = this.state

    const { firestore } = this.props

    // hacer la consulta
    const coleccion = firestore.collection('suscriptores')
    const consulta = coleccion.where("codigo", "==", busqueda).get()

    // leer datos
    consulta.then(res => {
      if(res.empty) {
        // no hay resultado
        this.setState({
          resultado : {},
          error : true
        })
      }else {
        const datos = res.docs[0]
        this.setState({
          resultado : datos.data(),
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
    const suscriptor = this.state.resultado
    suscriptor.fecha_solicitud = new Date().toLocaleDateString()

    const libroActualizado = this.props.libro

    libroActualizado.prestados.push(suscriptor)

    const {firestore, history} = this.props

    firestore.update({
      collection: 'libros',
      doc: libroActualizado.id
    }, libroActualizado).then(() => {
      Swal.fire(
        '¡Agregado!',
        'El libro se asignó al usuario correctamente',
        'success'
      )
       history.push(home)
    })

  }

  render() { 
    const { libro } = this.props

    if(!libro) return <Spinner/>

    // extraer datos del alumno
    const { resultado, error } = this.state

    let fichaAlumno, btnSolicitar

    if(resultado.nombre) {
      fichaAlumno = <FichaSuscriptor alumno={resultado}/>
      btnSolicitar = <button className="btn btn-dark btn-block mb-4" 
                      onClick={this.solicitarPrestamo}>Solicitar libro
                     </button>
    }else {
      fichaAlumno = null
      btnSolicitar = null
    }

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
              {fichaAlumno}
              {btnSolicitar}
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
  connect(({ firestore: { ordered } }, props) => ({
    libro: ordered.libro && ordered.libro[0]
  }))
)(PrestamoLibro);