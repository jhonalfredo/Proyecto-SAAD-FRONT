import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";


function DetallesReserva() {
  const parametros = useParams();
  const [reserva, setReserva] = useState({
    id: 1,
    estado: "atendido",
    materia: "Introduccion a la programacion",
    grupos: [
      //{ idGrupo: 1, codigoGrupo: "02", docenteGrupo: "Leticia" },
      "02 - Leticia Blanco Coca",
      "ME - Rosemary Salazar",
      "F1 - Patricia Romero",
    ],
    nroEstudiantes: 135,
    fecha: "25/06/2022",
    horaInicio: "18:45",
    horaFin: "21:45",
    periodos: 2,
    motivo:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.",
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:4200/obtener-detalles-reserva/" + parametros.id)
  //     .then((reservaObtenida) => {
  //      setReserva(reservaObtenida);
  //     });
  // }, []);

  return (
    <Container>
      <h1>Detalle de reserva</h1>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <p className="etiqueta">ID</p>
          <p className="contenido">{reserva.id}</p>
        </Col>
        <Col md={3}>
          <p className="etiqueta">Estado</p>
          <p className="contenido">{reserva.estado}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Materia</p>
          <p className="contenido">{reserva.materia}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Grupo</p>
          {reserva.grupos.map(function (grupo, indice) {
            return (
              <p className="contenido" key={indice}>
                {grupo}
              </p>
            );
          })}
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <p className="etiqueta">Nro estudiantes</p>
          <p className="contenido">{reserva.nroEstudiantes}</p>
        </Col>
        <Col md={3}>
          <p className="etiqueta">Fecha</p>
          <p className="contenido">{reserva.fecha}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={2}>
          <p className="etiqueta">Horario inicio</p>
          <p className="contenido">{reserva.horaInicio}</p>
        </Col>
        <Col md={2}>
          <p className="etiqueta">Horario fin</p>
          <p className="contenido">{reserva.horaFin}</p>
        </Col>
        <Col md={2}>
          <p className="etiqueta">Periodos</p>
          <p className="contenido">{reserva.periodos}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Motivo</p>
          <p className="contenido">{reserva.motivo}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default DetallesReserva;
