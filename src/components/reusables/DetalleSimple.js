import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

export default function DetalleSimple(props) {

  return (
    <div>
      {props.datos ?
        <Container>
          <h1>Detalle de props.datos</h1>
          <Row className="justify-content-md-center">
            <Col md={3}>
              <p className="etiqueta">ID</p>
              <p className="contenido">{props.datos.detalle[0].Id_SR}</p>
            </Col>
            <Col md={3}>
              <p className="etiqueta">Estado</p>
              <p className="contenido">
                {props.datos.detalle[0].Estado_Atendido_SR === 0
                  ? "Pendiente"
                  : "Atendido"}
              </p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <p className="etiqueta">Materia</p>

              <p className="contenido">{props.datos.detalle[0].Nombre_M}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <p className="etiqueta">Grupo</p>
              {props.datos.grupos.map(function (grupo, indice) {
                return (
                  <p className="contenido" key={indice}>
                    {grupo.Id_G_US} - {grupo.Nombre_U} {grupo.Apellido_Paterno_U}{" "}
                    {grupo.Apellido_Materno_U}
                  </p>
                );
              })}
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={3}>
              <p className="etiqueta">Nro estudiantes</p>
              <p className="contenido">
                {props.datos.detalle[0].Numero_Estudiantes_SR}
              </p>
            </Col>
            <Col md={3}>
              <p className="etiqueta">Fecha</p>
              <p className="contenido">{props.datos.detalle[0].Fecha_SR}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={2}>
              <p className="etiqueta">Horario inicio</p>
              <p className="contenido">{props.datos.detalle[0].Hora_Inicio_SR}</p>
            </Col>
            <Col md={2}>
              <p className="etiqueta">Horario fin</p>
              <p className="contenido">{props.datos.detalle[0].Hora_Final_SR}</p>
            </Col>
            <Col md={2}>
              <p className="etiqueta">Periodos</p>
              <p className="contenido">{props.datos.detalle[0].Cantidad_Periodos_SR}</p>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col md={6}>
              <p className="etiqueta">Motivo</p>
              <p className="contenido">{props.datos.detalle[0].Motivo_SR}</p>
            </Col>
          </Row>
        </Container>
        : "Cargando..."
      }
    </div>
  )
}
