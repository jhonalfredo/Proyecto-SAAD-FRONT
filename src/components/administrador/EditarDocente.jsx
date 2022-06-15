import React, { useState, useMemo, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAdmin from "./MenuAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import ModalConfirmacion from "../docente/ModalConfirmacion";
//import "./Login.css";

function EditarDocente() {
  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeAccionSolicitud, setMensajeAccionSolicitud] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [codigoSis, setCodigoSis] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [idRol, setIdRol] = useState(null);
  const navigate = useNavigate();
  const esNombreValido = useMemo(() => {
    return nombre.length == 0 || /^[a-zA-Z\s\u00f1\u00d1\u00E0-\u00FC]+$/g.test(nombre);
  }, [nombre]);
  const { id } = useParams();

  useEffect(() => {
    cargarDatos();
  }, []);

  function cargarDatos(){
    setModalVisible(false)
    axios.get("/api/obtenerDocente/" + id).then(dato => {
      let docente = dato.data[0];
      console.log("he recuperado....................", docente);
    setNombre(docente.Nombre_U);
    setApellidoPaterno(docente.Apellido_Paterno_U);
    setApellidoMaterno(docente.Apellido_Materno_U);
    setCodigoSis(docente.Codigo_SIS_U);
    setCorreoElectronico(docente.Correo_U);
    setContrasenia(docente.Contrasenia_U);
    setIdRol(docente.Rol_U);
  })
  }

  const esContraseniaValida = useMemo(() => {
    return (
      contrasenia.length == 0 ||contrasenia.length >= 8
    );
  }, [contrasenia]);

  const esApellidoPaternoValido = useMemo(() => {
    return (
      apellidoPaterno.length == 0 || /^[a-zA-Z\s\u00f1\u00d1\u00E0-\u00FC]+$/g.test(apellidoPaterno)
    );
  }, [apellidoPaterno]);

  const esApellidoMaternoValido = useMemo(() => {
    return (
      apellidoMaterno.length == 0 || /^[a-zA-Z\s\u00f1\u00d1\u00E0-\u00FC]+$/g.test(apellidoMaterno)
    );
  }, [apellidoMaterno]);

  const esCodigoSisValido = useMemo(() => {
    return codigoSis.length == 0 || codigoSis.length == 9 && /^\d+$/.test(codigoSis);
  }, [codigoSis]);

  const esCorreoElectronicoValido = useMemo(() => {
    return (
      correoElectronico.length == 0 ||
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        correoElectronico
      )
    );
  }, [correoElectronico]);

  const editarDocente = async (e) => {
    e.preventDefault();
    const datosDocente = {
      Nombre_U: nombre,
      Apellido_Paterno_U: apellidoPaterno,
      Apellido_Materno_U: apellidoMaterno,
      Codigo_SIS_U: codigoSis,
      Correo_U: correoElectronico,
      Contrasenia_U: contrasenia,
      Rol_U: idRol,
    };

    if (
      !!contrasenia &&
      esContraseniaValida&&
      !!apellidoPaterno &&
      esApellidoPaternoValido &&
      !!apellidoMaterno &&
      esApellidoMaternoValido &&
      !!nombre &&
      esNombreValido &&
      !!correoElectronico &&
      esCorreoElectronicoValido/* &&
      !!codigoSis &&
      esCodigoSisValido*/
    ) {
      console.log(datosDocente);
      await axios.patch("/api/editarUsuario", datosDocente);
      alert("La edicion de docente fue exitoso!");
      navigate("/administrador/solicitudes");
    } else {
      alert(
        "Hay errores en uno o mas campos, y/o uno o mas campos estan vacios, por favor verificar"
      );
    }

    // mandar el objeto datos docente al backend con axios.post('URL', datosDocente)
  };
  function cambiarCodigoSis(event) {
    setCodigoSis(event.target.value);
  }

  function enviarDatos(e) {
    e.preventDefault();
    if (
      !!nombre &&
      esNombreValido &&
      !!correoElectronico &&
      esCorreoElectronicoValido &&
      !!codigoSis &&
      esCodigoSisValido
    ) {
      console.log("prueba");
      var dato = {
        nombre: nombre,
        apellidoP: apellidoPaterno,
        apellidoM: apellidoMaterno,
        codigo: codigoSis,
        correo: correoElectronico,
        cont: contrasenia,
      };
      console.log(dato);
    } else {
      alert(
        "Hay errores en uno o mas campos, y/o uno o mas campos estan vacios, por favor verificar"
      );
    }
  }

  return (
    <div>
    
      <Container>
        <Row>
          <Col md={12}>
            <h1>Editar Datos de docente</h1>
          </Col>
        </Row>
        <Form onSubmit={(e) => enviarDatos(e)}>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  value={nombre}
                  isInvalid={!esNombreValido}
                  onChange={(event) => setNombre(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un texto válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Correo electrónico</Form.Label>
                <Form.Control
                  value={correoElectronico}
                  type="email"
                  isInvalid={!esCorreoElectronicoValido}
                  onChange={(event) => setCorreoElectronico(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un correo electronico válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Apellido paterno</Form.Label>
                <Form.Control
                  value={apellidoPaterno}
                  isInvalid={!esApellidoPaternoValido}
                  onChange={(event) => setApellidoPaterno(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un texto válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contraseña</Form.Label>
                <Form.Control
                  value={contrasenia}
                  isInvalid={!esContraseniaValida}
                  onChange={(event) => setContrasenia(event.target.value)}
                  type="password"
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe contener mínimo de 8 caracteres
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Apellido materno</Form.Label>
                <Form.Control
                  value={apellidoMaterno}
                  isInvalid={!esApellidoMaternoValido}
                  onChange={(event) => setApellidoMaterno(event.target.value)}
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un texto válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <div class="col-md-3">
                <label for="validationCustom04" class="form-label">
                  Rol
                </label>
                <select
                  class="form-select"
                  id="validationCustom04"
                  onChange={(event) => setIdRol(event.target.value)}
                  required
                >
                  <option selected disabled value="">
                    Elegir Rol
                  </option>
                
                    {idRol===1?<option value="1" selected>Docente</option>: <option value="1">Docente</option>}
                    {idRol===2?<option value="2" selected>Administrador</option>: <option value="2">Administrador</option>}
                    {idRol===3?<option value="3" selected>Ambos</option>: <option value="3">Ambos</option>}
                                    
                </select>
                <div class="invalid-feedback">Seleccione un Rol</div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Codigo sis</Form.Label>
                <Form.Control
                  value={codigoSis}
                  onChange={cambiarCodigoSis}
                  disabled
                  type="number"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un codigo SIS válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Col md={6}>
            <Button onClick={() => setModalVisible(true)}>Guardar Cambios</Button>
          </Col>
        </Form>
        <ModalConfirmacion
                modalVisible={modalVisible}
                texto="¿Desea guardar los cambios realizados?"
                accionAceptar={editarDocente}
                accionCancelar={() =>
                  cargarDatos()
                }
              />
      </Container>
    </div>
  );
}

export default EditarDocente;
