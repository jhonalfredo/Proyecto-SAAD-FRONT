import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalConfirmacion from "./ModalConfirmacion";


function DetallesReserva() {
  const [observacionR, setObservacionR] = useState("");
  const parametros = useParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeAccionSolicitud, setMensajeAccionSolicitud] = useState("");
  const [reserva, setReserva] = useState({
    detalle: [
      {
        Id_SR: 1,
        materia_Codigo_M: 2006018,
        Fecha_SR: "2022-03-25",
        Hora_Inicio_SR: "06:45:00",
        Cantidad_Periodos_SR: 2,
        Numero_Estudiantes_SR: 200,
        Estado_Atendido_SR: 1,
        Motivo_SR: "no hay motivo",
        Hora_Final_SR: "08:15:00",
        Creado_en_SR: "2022-03-20 03:14:07",
        Codigo_M: 2006018,
        Nombre_M: "FISICA BASICA I",
        Id_RR: 1,
        Estado_RR: "1",
        Observacion_RR: "No hay observacion",
        Fecha_Reporte_RR: "2022-05-13",
        solicitud_reserva_Id_SR: 1,
        usuario_Codigo_SIS_U: 201801450,
      },
    ],
    grupos: [
      {
        Id_G_US: "F1",
        Codigo_M: 2006018,
        Nombre_M: "FISICA BASICA I",
        Nombre_U: "JOSE ROBERTO",
        Apellido_Paterno_U: "PEREZ",
        Apellido_Materno_U: "CESPEDES",
        Codigo_SIS_U: 201801450,
      },
      {
        Id_G_US: "H1",
        Codigo_M: 2006018,
        Nombre_M: "FISICA BASICA I",
        Nombre_U: "JOSE ROBERTO",
        Apellido_Paterno_U: "PEREZ",
        Apellido_Materno_U: "CESPEDES",
        Codigo_SIS_U: 201801450,
      },
    ],
    aulas: [
      {
        Id_A: "690A",
        Capacidad_A: 75,
        Edificio_A: "NUEVO EDIF. ACADEMICO 2 (FCYT)",
      },
      {
        Id_A: "690B",
        Capacidad_A: 75,
        Edificio_A: "NUEVO EDIF. ACADEMICO 2 (FCYT)",
      },
      {
        Id_A: "690C",
        Capacidad_A: 65,
        Edificio_A: "NUEVO EDIF. ACADEMICO 2 (FCYT)",
      },
    ],
  });

  useEffect(() => {
    axios
      .get("/api/detalleReservaPendiente/" + parametros.id)
      .then((reservaObtenida) => {
        setReserva(reservaObtenida);
      });
  }, []);

  return (
    <Container>
      <h1>Detalle de reserva</h1>
      <Row className="justify-content-md-center">
        <Col md={3}>
          <p className="etiqueta">ID</p>
          <p className="contenido">{reserva.detalle[0].Id_SR}</p>
        </Col>
        <Col md={3}>
          <p className="etiqueta">Estado</p>
          <p className="contenido">
            {reserva.detalle[0].Estado_Atendido_SR == 0
              ? "Rechazado"
              : "Aceptado"}
          </p>
        </Col>
        
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Materia</p>

          <p className="contenido">{reserva.detalle[0].Nombre_M}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Grupo</p>
          {reserva.grupos.map(function (grupo, indice) {
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
            {reserva.detalle[0].Numero_Estudiantes_SR}
          </p>
        </Col>
        <Col md={3}>
          <p className="etiqueta">Fecha</p>
          <p className="contenido">{reserva.detalle[0].Fecha_SR}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={2}>
          <p className="etiqueta">Horario inicio</p>
          <p className="contenido">{reserva.detalle[0].Hora_Inicio_SR}</p>
        </Col>
        <Col md={2}>
          <p className="etiqueta">Horario fin</p>
          <p className="contenido">{reserva.detalle[0].Hora_Final_SR}</p>
        </Col>
        <Col md={2}>
          <p className="etiqueta">Periodos</p>
          <p className="contenido">{reserva.detalle[0].Cantidad_Periodos_SR}</p>
        </Col>
      </Row>
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Motivo</p>
          <p className="contenido">{reserva.detalle[0].Motivo_SR}</p>
        </Col>
      </Row>
    </Container>
  );
}

export default DetallesReserva;
