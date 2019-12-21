import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from 'react-router-dom'
import { mostrarLibro , nuevoLibro } from '../../routes'
import Spinner from "../layout/spinner/Spinner";

import PropTypes from 'prop-types'
import { successAlert, confirmAlert } from '../../alertDialogs'

const Libros = ({ libros, firestore }) => {
  
  if (!libros) return <Spinner />;

  // Eliminar Libro
  const eliminarLibro = id => {

    confirmAlert('¿Estás seguro?', "Esta acción no se puede deshacer", 'Eliminar', 'Cancelar')
    .then((result) => {
      if (result.value) {
        // Eliminar
        firestore.delete({
          collection : 'libros',
          doc : id
        })
        successAlert('¡Eliminado!', 'El libro se ha eliminado correctamente')
      }
    })
  }

  return (
    <div className="row">
      <div className="col-md-12 mb-4">
        <Link to={nuevoLibro} className="btn btn-primary">
          <i className="fas fa-plus mr-2"></i> Crear Libro
        </Link>
      </div>
      <div className="col-md-8">
        <h2><i className="fas-fa-book"></i>Libros</h2>
      </div>
      <table className="table table-striped mt-4">
        <thead className="text-light bg-primary text-center">
          <tr>
            <th>Título</th>
            <th>ISBN</th>
            <th>Editorial</th>
            <th>Existencias</th>
            <th>Disponibles</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {libros.map(libro => (
            <tr key={libro.id}>
              <td>{libro.titulo}</td>
              <td>{libro.ISBN}</td>
              <td>{libro.editorial}</td>
              <td>{libro.existencias}</td>
              <td>{libro.existencias - libro.prestados.length}</td>
              <td>
                <Link 
                  to={`${mostrarLibro}/${libro.id}`}
                  className="btn btn-block btn-success"
                >
                  <i className="fas fa-angle-double-right mr-2"></i> Más información
                </Link>
                <button 
                  className="btn btn-danger btn-block" 
                  onClick={() => eliminarLibro(libro.id)}>
                  <i className="fas fa-trash-alt mr-2"></i> Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Libros.propTypes = {
  firestore: PropTypes.object.isRequired,
  libros: PropTypes.array
}

export default compose(
  firestoreConnect([{ collection: "libros" }]),
  connect((store, props) => ({
    libros: store.firestore.ordered.libros
  }))
)(Libros);
