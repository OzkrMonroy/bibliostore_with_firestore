import React from 'react';

const FichaSuscriptor = ({alumno}) => {
  return ( 
    <div className="card my-3">
      <h3 className="card-header bg-primary text-white text-center">Datos del alumno</h3>
      <div className="card-body">
        <p className="font-weight-bold">Nombre:<span className="font-weight-normal ml-2">{alumno.nombre}</span></p>
        <p className="font-weight-bold">Código:<span className="font-weight-normal ml-2">{alumno.codigo}</span></p>
        <p className="font-weight-bold">Carrera:<span className="font-weight-normal ml-2">{alumno.carrera}</span></p>
      </div>
    </div>
  );
}
 
export default FichaSuscriptor;