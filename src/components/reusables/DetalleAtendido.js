import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function DetalleAtendido(props) {
  console.log(props.datos);

  function tipoSol(estado){
    let res = "";
    if(estado==="0"){
      res = "Rechazada"
    }else if(estado==="1"){
      res = "Aceptada"
    }else if(estado==="2"){
      res = "Cancelada"
    }
    return res;
  }

  return (
    <div>
        <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Aula Asignada</p>
          {props.datos.aulas.map(function (aulas, indice) {
            return (
              <p className="contenido" key={indice}>
                {aulas.Id_A} - {"Capacidad de "} {aulas.Capacidad_A}{" "}
                {"estudiantes "}-{aulas.Edificio_A}
              </p>
            );
          })}
        </Col>
        <div>Observación</div>
          <div>
            {props.datos.detalle[0].Observacion_RR}
          </div>
          <div>Solicitud</div>
          <div>
            {tipoSol(props.datos.detalle[0].Estado_RR)}
          </div>
          <div>Fecha atendida</div>
          <div>{props.datos.detalle[0].Fecha_Reporte_RR}</div>
      </Row>
    </div>
  )
}
