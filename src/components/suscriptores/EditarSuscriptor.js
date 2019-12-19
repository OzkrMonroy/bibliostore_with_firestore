import React, { Component } from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { suscriptores } from "../../routes";
import Spinner from "../layout/spinner/Spinner";
import PropTypes from "prop-types";
import Swal from 'sweetalert2'

class EditarSuscriptor extends Component {
  nombreRef = React.createRef()
  apellidoRef = React.createRef()
  carreraRef = React.createRef()
  codigoRef = React.createRef()

  editarSuscriptor = e => {
    e.preventDefault()

    // Crear el objecto a actualizar
    const suscriptorActualizado = {
      nombre: this.nombreRef.current.value,
      apellido: this.apellidoRef.current.value,
      carrera: this.carreraRef.current.value,
      codigo: this.codigoRef.current.value
    }

    // almacenar en firestore
    const { firestore, suscriptor, history } = this.props

    firestore.update({
      collection: 'suscriptores',
      doc: suscriptor.id
    }, suscriptorActualizado).then(() => {
      Swal.fire(
        '¡Actualizado!',
        'El suscriptor se ha actualizado correctamente',
        'success'
      )
       history.push(suscriptores)
    })
  }
  
  render() {
    const { suscriptor } = this.props;

    if (!suscriptor) return <Spinner />;

    return (
      <div className="row">
        <div className="col-12 mb-4">
          <Link to={suscriptores} className="btn btn-secondary">
            <i className="fas fa-arrow-circle-left mr-2"></i> Volver al Listado
          </Link>
        </div>
        <div className="col-12 mb-2">
          <h2>
            <i className="fas fa-user mr-2"></i> Editar Suscriptor
          </h2>

          <div className="row justify-content-center mb-2">
            <div className="col-md-8 mt-3">
              <form onSubmit={this.editarSuscriptor}>
                <div className="form-group">
                  <label>Nombre:</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nombre"
                    placeholder="Ingresa el nombre del suscriptor"
                    required
                    defaultValue={suscriptor.nombre}
                    ref={this.nombreRef}
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
                    defaultValue={suscriptor.apellido}
                    ref={this.apellidoRef}
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
                    defaultValue={suscriptor.carrera}
                    ref={this.carreraRef}
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
                    defaultValue={suscriptor.codigo}
                    ref={this.codigoRef}
                  />
                </div>

                <input
                  type="submit"
                  className="btn btn-success my-2"
                  value="Editar suscriptor"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditarSuscriptor.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "suscriptores",
      storeAs: "suscriptor",
      doc: props.match.params.id
    }
  ]),
  connect(({ firestore: { ordered } }, props) => ({
    suscriptor: ordered.suscriptor && ordered.suscriptor[0]
  }))
)(EditarSuscriptor);
