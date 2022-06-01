import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import ModalConfirmacion from "./ModalConfirmacion";
import 'bootstrap/js/src/collapse'
import 'bootstrap/js/src/dropdown';

const AULAS = [
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
    Capacidad_A: 75,
    Edificio_A: "NUEVO EDIF. ACADEMICO 2 (FCYT)",
  },
];

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
      .get("/api/detalleReservaAtendida/" + parametros.id)
      .then((reservaObtenida) => {
        console.log(reservaObtenida.data)
        setReserva(reservaObtenida.data);
      });
  }, []);

  const aceptarSolicitud = () => {
    const texto = localStorage.getItem("datosUser");
    const datosUser = JSON.parse(texto);
    const datos = {
      aulas: ["691HB"] /* aulasSeleccionadas */,
      observacion: "fdsadf" /* observacion */,
      idReserva: reserva.detalle[0].Id_SR,
      codSIS: datosUser.codigoSis,
      fechaReserva: reserva.detalle[0].Fecha_SR,
      horaInicio: reserva.detalle[0].Hora_Inicio_SR,
      periodos: reserva.detalle[0].Cantidad_Periodos_SR,
    };
    axios
      .post("/aceptarSolicitud", datos)
      .then((respuesta) =>
        setMensajeAccionSolicitud("Se ha registrado la solicitud correctamente")
      )
      .catch((error) =>
        setMensajeAccionSolicitud("Algo salió mal durante el registro")
      );
  };

  const rechazarSolicitud = () => {
    const texto = localStorage.getItem("datosUser");
    const datosUser = JSON.parse(texto);
    const datos = {
      observacion: "" /* observacion */,
      idReserva: reserva.detalle[0].Id_SR,
      codSIS: datosUser.codigoSis,
    };
    axios
      .post("/rechazarSolicitud", datos)
      .then((respuesta) =>
        setMensajeAccionSolicitud("Se ha rechazado la solicitud")
      )
      .catch((error) => setMensajeAccionSolicitud("Algo salió mal"));
  };

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
      <Row className="justify-content-md-center">
        <Col md={6}>
          <p className="etiqueta">Aula Asignada</p>
          {reserva.aulas.map(function (aulas, indice) {
            return (
              <p className="contenido" key={indice}>
                {aulas.Id_A} - {"Capacidad de "} {aulas.Capacidad_A}{" "}
                {"estudiantes "}-{aulas.Edificio_A}
              </p>
            );
          })}
        </Col>
      </Row>
      {!!mensajeAccionSolicitud && (
        <div style={{ borderColor: "gray", borderWidth: "1px" }}>
          <img src="imagencheckbox"></img>
          <p>{mensajeAccionSolicitud}</p>
        </div>
      )}

      <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
        Atender Solicitud
      </button>
      <div className="collapse" id="collapseExample">
        <div className="card card-body">
          <div className=''>
          <form class="row g-3 needs-validation" novalidate onSubmit={(e) => { e.preventDefault() }}>
                <Row className="justify-content-md-center">
                  <Col md={6}>
                    <label for="validationCustom03" class="form-label">City</label>
                    <input type="text" class="form-control" id="validationCustom03" required maxLength={500} onChange={(e) => setObservacionR(e.target.value)} />
                    <div id="emailHelp" class="form-text">{observacionR.length} caracteres</div>
                    <div class="invalid-feedback">
                      Please provide a valid city.
                    </div>
                  </Col>
                </Row>
                <Button type="submit" onClick={()=>aceptarSolicitud()}>Aceptar solicitud</Button>
                <Button onClick={() => setModalVisible(true)}>Rechazar solicitud</Button>
              </form>
              <ModalConfirmacion
                modalVisible={modalVisible}
                texto="¿Está seguro de rechazar la solicitud de reserva?"
                accionAceptar={rechazarSolicitud}
                accionCancelar={() => setModalVisible(false)}
              />
          </div>
        </div>
      </div>

    


    </Container>
  );
}

export default DetallesReserva;