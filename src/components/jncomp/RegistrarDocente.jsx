import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
//import "./Login.css";

function RegistrarDocente() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [codigoSis, setCodigoSis] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");

  function registrarDocente() {
    const datosDocente = {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      codigoSis,
      correoElectronico,
      contrasenia,
    };
    console.log(datosDocente);
    // mandar el objeto datos docente al backend con axios.post('URL', datosDocente)
  }

  return (
    <Container>
      <Row>
        <Col md={12}>
          <h1>Registrar docente</h1>
        </Col>
      </Row>
      <Form>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={nombre}
                onChange={(event) => setNombre(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Correo electrónico</Form.Label>
              <Form.Control
                value={correoElectronico}
                type="email"
                onChange={(event) => setCorreoElectronico(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Apellido paterno</Form.Label>
              <Form.Control
                value={apellidoPaterno}
                onChange={(event) => setApellidoPaterno(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Contraseña</Form.Label>
              <Form.Control
                value={contrasenia}
                onChange={(event) => setContrasenia(event.target.value)}
                type="password"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Apellido materno</Form.Label>
              <Form.Control
                value={apellidoMaterno}
                onChange={(event) => setApellidoMaterno(event.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Button onClick={registrarDocente}>Registrar docente</Button>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Codigo sis</Form.Label>
              <Form.Control
                value={codigoSis}
                onChange={(event) => setCodigoSis(event.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default RegistrarDocente;
