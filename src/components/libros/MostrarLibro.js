import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { home, editarLibro, prestamoLibro } from "../../routes";
import Spinner from "../layout/spinner/Spinner";
import PropTypes from "prop-types";

class MostrarLibro extends Component {

  devolverLibro = id => {
    const { firestore } = this.props

    const libroActualizado = {...this.props.libro}

    const prestados = libroActualizado.prestados.filter(prestado => prestado.codigo !== id)

    libroActualizado.prestados = prestados

    firestore.update({
      collection: 'libros',
      doc: libroActualizado.id
    }, libroActualizado).then(console.log('se devolvió el libro'))
  };

  render() {
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    let btnPrestamo;

    if (libro.existencias - libro.prestados.length > 0) {
      btnPrestamo = (
        <Link
          to={`${prestamoLibro}/${libro.id}`}
          className="btn btn-success my-3"
        >
          Solicitar Prestamo
        </Link>
      );
    } else {
      btnPrestamo = null;
    }

    return (
      <div className="row">
        <div className="col-md-6 mb-4">
          <Link to={home} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-2"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-md-6">
          <Link
            to={`${editarLibro}/${libro.id}`}
            className="btn btn-primary float-right"
          >
            <i className="fas fa-pencil-alt mr-2"></i> Editar Libro
          </Link>
        </div>
        <hr className="mx-auto w-100" />

        <div className="col-12">
          <h2 className="mb-4">{libro.titulo}</h2>
          <p>
            <span className="font-weight-bold mr-2">Editorial:</span>
            {libro.editorial}
          </p>
          <p>
            <span className="font-weight-bold mr-2">ISBN:</span>
            {libro.ISBN}
          </p>
          <p>
            <span className="font-weight-bold mr-2">Existencias:</span>
            {libro.existencias}
          </p>
          <p>
            <span className="font-weight-bold mr-2">Disponibles:</span>
            {libro.existencias - libro.prestados.length}
          </p>
          <p>
            <span className="font-weight-bold mr-2">Prestados:</span>
            {libro.prestados.length}
          </p>

          {btnPrestamo}

          <hr className="mx-auto w-100" />

          <h3 className="mt-3">Personas que poseen el libro:</h3>
          <div className="row">
            {libro.prestados.map(prestado => (
              <div className="col-4 my-4">
                <div className="card my-2" key={prestado.codigo}>
                  <h4 className="card-header bg-primary text-light text-center">
                    {prestado.nombre} {prestado.apellido}
                  </h4>
                  <div className="card-body">
                    <p>
                      <span className="font-weight-bold mr-2">Código:</span>
                      {prestado.codigo}
                    </p>
                    <p>
                      <span className="font-weight-bold mr-2">Carrera:</span>
                      {prestado.carrera}
                    </p>
                    <p>
                      <span className="font-weight-bold mr-2">
                        Fecha de solicitud:
                      </span>
                      {prestado.fecha_solicitud}
                    </p>
                  </div>
                  <div className="card-footer">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => this.devolverLibro(prestado.codigo)}
                    >
                      Devolver Libro
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

MostrarLibro.propTypes = {
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
)(MostrarLibro);
