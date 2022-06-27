import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function DetalleAtendido(props) {
  console.log(props.datos);

  function tipoSol(estado) {
    let res = "";
    if (estado === "0") {
      res = "Rechazada"
    } else if (estado === "1") {
      res = "Aceptada"
    } else if (estado === "2") {
      res = "Cancelada"
    }
    return res;
  }

  return (
    <div className='px-5'>
      <div class="row pb-3">
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Solicitud</h5>
              <p class="card-text">{tipoSol(props.datos.detalle[0].Estado_RR)}</p>
            </div>
          </div>
        </div>
        <div class="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Fecha Atendida</h5>
              <p class="card-text" >
                {props.datos.detalle[0].Fecha_Reporte_RR}</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Atendido por</h5>
              <p class="card-text" >
                {props.datos.detalle[0].Nombre_U + " " + props.datos.detalle[0].Apellido_Paterno_U + " " + props.datos.detalle[0].Apellido_Materno_U}</p>
            </div>
          </div>

        </div>
        </div>

        <div class="card mb-3 w-90">
          <div class="card-body">
            <h5 class="card-title">Observación</h5>
            <p class="card-text">{props.datos.detalle[0].Observacion_RR}</p>
          </div>
        </div>

        <div class="card mb-3 w-90">
          <div class="card-body">
            <h5 class="card-title">Aula Asignada</h5>
            <p class="card-text">{props.datos.aulas.map(function (aulas, indice) {
              return (
                <p className="contenido" key={indice}>
                  {aulas.Id_A} - {"Capacidad de "} {aulas.Capacidad_A}{" "}
                  {"estudiantes "}-{aulas.Edificio_A}
                </p>
              );
            })}</p>
          </div>
        


      </div>
    </div>
  )
}
