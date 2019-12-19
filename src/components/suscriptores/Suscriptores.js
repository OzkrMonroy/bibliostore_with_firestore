import React from 'react';
import { compose } from 'redux'
import { connect } from 'react-redux'
import { firestoreConnect } from 'react-redux-firebase'
import { Link } from 'react-router-dom'
import { mostrarSuscriptor, nuevoSuscriptor } from '../../routes'
import Spinner from '../layout/spinner/Spinner';

import PropTypes from 'prop-types'
import Swal from 'sweetalert2'

const Suscriptores = ({suscriptores, firestore}) => {

  if(!suscriptores) return <Spinner/>

  // Elimnar suscriptor
  const eliminarSuscriptor = id => {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        // Eliminar
        firestore.delete({
          collection : 'suscriptores',
          doc : id
        })
        Swal.fire(
          '¡Eliminado!',
          'El suscriptor se ha eliminado correctamente',
          'success'
        )
      }
    })
  }

  return ( 
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={nuevoSuscriptor} className="btn btn-primary">
          <i className="fas fa-plus mr-2"></i> Crear suscriptor
        </Link>
      </div>
      <div className="col-md-8">
        <h2><i className="fas-fa-users"></i>Suscriptores</h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary">
          <tr>
            <th>Nombre</th>
            <th>Carrera</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {suscriptores.map(suscriptor => (
            <tr key={suscriptor.id}>
              <td>{suscriptor.nombre} {suscriptor.apellido}</td>
              <td>{suscriptor.carrera}</td>
              <td>
                <Link 
                  to={`${mostrarSuscriptor}/${suscriptor.id}`}
                  className="btn btn-block btn-success"
                >
                  <i className="fas fa-angle-double-right mr-2"></i> Más información
                </Link>
                <button 
                  className="btn btn-danger btn-block" 
                  onClick={() => eliminarSuscriptor(suscriptor.id)}>
                  <i className="fas fa-trash-alt mr-2"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
   );
}

Suscriptores.propTypes = {
  firestore: PropTypes.object.isRequired,
  suscriptores: PropTypes.array
}

// compose crea un pontenciador para el store. Lo cual nos permite tener mas opciones.
// Para obtener los datos de Firestore usamos firestoreConnect e indicamos el nombre de la colección, en
// este caso es "suscriptores". Luego a traves de connect obtenemos los datos del store y lo guardamos
// como props.

export default compose(
  firestoreConnect([{collection: 'suscriptores'}]),
  connect((store, props) => ({
    suscriptores : store.firestore.ordered.suscriptores
  }))
)(Suscriptores);