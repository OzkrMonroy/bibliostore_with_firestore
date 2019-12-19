import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { home } from "../../routes";
import Spinner from "../layout/spinner/Spinner";
import PropTypes from "prop-types";
import Swal from "sweetalert2";

class EditarLibro extends Component {
  tituloRef = React.createRef()
  editorialRef = React.createRef()
  ISBNRef = React.createRef()
  existenciasRef = React.createRef()

  editarLibro = e => {
    e.preventDefault()

    // Crear el objecto a actualizar
    const libroActualizado = {
      titulo: this.tituloRef.current.value,
      editorial: this.editorialRef.current.value,
      ISBN: this.ISBNRef.current.value,
      existencias: this.existenciasRef.current.value,
      prestados: []
    }

    // almacenar en firestore
    const { firestore, libro, history } = this.props

    firestore.update({
      collection: 'libros',
      doc: libro.id
    }, libroActualizado).then(() => {
      Swal.fire(
        '¡Actualizado!',
        'El libro se ha actualizado correctamente',
        'success'
      )
       history.push(home)
    })
  }

  render() {
    const { libro } = this.props;

    if (!libro) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={home} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-2"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12 mb-2">
          <h2>
            <i className="fas fa-book mr-2"></i> Editar Libro
          </h2>

          <div className="row justify-content-center mb-2">
            <div className="col-md-8 mt-3">
              <form onSubmit={this.editarLibro}>
                <div className="form-group">
                  <label>Título:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="titulo"
                    placeholder="Ingresa el título del libro"
                    required
                    defaultValue={libro.titulo}
                    ref={this.tituloRef}
                  />
                </div>

                <div className="form-group">
                  <label>Editorial:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="editorial"
                    placeholder="Ingresa el editorial del libro"
                    required
                    defaultValue={libro.editorial}
                    ref={this.editorialRef}
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
                    defaultValue={libro.ISBN}
                    ref={this.ISBNRef}
                  />
                </div>

                <div className="form-group">
                  <label>Existencias:</label>
                  <input
                    type="number"
                    min="1"
                    className="form-control"
                    name="existencias"
                    placeholder="Ingresa la cantidad de libros disponibles"
                    required
                    defaultValue={libro.existencias}
                    ref={this.existenciasRef}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-success my-2"
                  value="Editar libro"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarLibro.propTypes = {
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
)(EditarLibro);
