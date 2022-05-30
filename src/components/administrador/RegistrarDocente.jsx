import React, { useState, useMemo } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAdmin from "./MenuAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./Login.css";

function RegistrarDocente() {
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [codigoSis, setCodigoSis] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const navigate = useNavigate();
  const esNombreValido = useMemo(() => {
    return nombre.length == 0 || /^[a-zA-Z\s]+$/g.test(nombre)
  }, [nombre])

const esApellidoPaternoValido = useMemo(() => {
    return apellidoPaterno.length == 0 || /^[a-zA-Z\s]+$/g.test(apellidoPaterno)
  }, [apellidoPaterno])

  const esApellidoMaternoValido = useMemo(() => {
    return apellidoMaterno.length == 0 || /^[a-zA-Z\s]+$/g.test(apellidoMaterno)
  }, [apellidoMaterno])

  const esCodigoSisValido = useMemo(() => {
    return codigoSis.length == 9 && /^\d+$/.test(codigoSis);
  }, [codigoSis]);

  const esCorreoElectronicoValido = useMemo(() => {
    return correoElectronico.length == 0 || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(correoElectronico);
  }, [correoElectronico])

  
  const registrarDocente = async (e) => {
    e.preventDefault();
    const datosDocente = {
      'Nombre_U' : nombre,
      'Apellido_Paterno_U': apellidoPaterno,
      'Apellido_Materno_U': apellidoMaterno,
      'Codigo_SIS_U':codigoSis,
      'Correo_U':correoElectronico,
      'Contrasenia_U':contrasenia,
      'Rol_U': 1
    };
   
    if (!!nombre && esNombreValido && !!correoElectronico && esCorreoElectronicoValido && !!codigoSis && esCodigoSisValido) {
     

      console.log(datosDocente);
      await axios.post('/api/registro' , datosDocente);
      alert('El registro de docente fue exitoso!');
      navigate("/administrador/solicitudes")
    } else {
      alert('Hay errores en uno o mas campos, y/o uno o mas campos estan vacios, por favor verificar')
    }
    
    // mandar el objeto datos docente al backend con axios.post('URL', datosDocente)
  }
  function cambiarCodigoSis(event) {
    setCodigoSis(event.target.value)
  }

  function enviarDatos(e) {
    e.preventDefault();
    if (!!nombre && esNombreValido && !!correoElectronico && esCorreoElectronicoValido && !!codigoSis && esCodigoSisValido) {
      console.log('prueba');
      var dato = {
        nombre: nombre,
        apellidoP: apellidoPaterno,
        apellidoM: apellidoMaterno,
        codigo: codigoSis,
        correo: correoElectronico,
        cont: contrasenia
      }
      console.log(dato);
    } else {
      alert('Hay errores en uno o mas campos, y/o uno o mas campos estan vacios, por favor verificar')
    }
  }

  return (
    <div>
      <MenuAdmin />
      <Container>
        <Row>
          <Col md={12}>
            <h1>Registrar docente</h1>
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
                  Ingrese un texto valido
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
                  Ingrese un correo electronico valido
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
                  Ingrese un texto valido
                </Form.Control.Feedback>
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
                  isInvalid={!esApellidoMaternoValido}
                  onChange={(event) => setApellidoMaterno(event.target.value)}
                />
                 <Form.Control.Feedback type="invalid">
                  Ingrese un texto valido
                </Form.Control.Feedback>
              </Form.Group>
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
                  Ingrese un codigo SIS valido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
          <Col md={6}>
              <Button className="botonRegistrarDocente" onClick={registrarDocente}>Registrar docente</Button>
            </Col>
        </Form>
      </Container>
    </div>
  );
}

export default RegistrarDocente;
