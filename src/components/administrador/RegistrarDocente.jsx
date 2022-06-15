import React, { useState, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAdmin from "./MenuAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
//import "./Login.css";

function RegistrarDocente() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [codigoSis, setCodigoSis] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [idRol, setIdRol] = useState(1);
  const navigate = useNavigate();

  const esContraseniaValida = useMemo(() => {
    return (
      contrasenia.length >= 8 || contrasenia.length == 0
    );
  }, [contrasenia]);

  const esNombreValido = useMemo(() => {
    return nombre.length == 0 || /^[a-zA-Z\s\u00f1\u00d1\u00E0-\u00FC]+$/g.test(nombre);
  }, [nombre]);

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


  const registrarDocente = async (e) => {
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
      esContraseniaValida &&
      !!apellidoPaterno &&
      esApellidoPaternoValido &&
      !!apellidoMaterno &&
      esApellidoMaternoValido &&
      !!nombre &&
      esNombreValido &&
      !!correoElectronico &&
      esCorreoElectronicoValido &&
      !!codigoSis &&
      esCodigoSisValido

    ) {
      console.log(datosDocente);
      let error = false;
      try {
        await axios.post("/api/registro", datosDocente);
      }
      catch (e) { error = true; }
      if (error) {
        Swal.fire(
          'Error',
          'Algo salió mal',
          'error'
        )
      }
      else {
        if (idRol == 1) {
          navigate("/administrador/docentes");
        }
        else {
          navigate("/administrador/administradores");
        }
        Swal.fire(
          'Éxito',
          'El registro se realizó correctamente',
          'success'
        )
      }

    } else {
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
      <MenuAdmin />
      <Container>
        <Row>
          <Col md={12}>
            <h1>Registrar Usuario</h1>
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
                  name="pwd" id="input-pwd"
                  value={contrasenia}
                  isInvalid={!esContraseniaValida}
                  onChange={(event) => setContrasenia(event.target.value)}
                  type="password"
                />
                <Form.Control.Feedback type="invalid">
                  La contraseña debe contener mínimo de 8 caracteres
                </Form.Control.Feedback>
                <span toggle="#input-pwd" class="fa fa-fw fa-eye field-icon toggle-password"></span>
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

                  <option value="1">Docente</option>
                  <option value="2">Administrador</option>
                  <option value="3">Ambos</option>
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
                  isInvalid={!esCodigoSisValido}
                  type="number"
                />
                <Form.Control.Feedback type="invalid">
                  Ingrese un codigo SIS válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Col md={6}>
            <Button
              className="botonRegistrarDocente"
              onClick={registrarDocente}
            >
              Registrar Usuario
            </Button>
          </Col>
        </Form>
      </Container>
    </div>
  );
}

export default RegistrarDocente;
