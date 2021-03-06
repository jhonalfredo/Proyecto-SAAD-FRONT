import React, { useState, useMemo, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import MenuAdmin from "./MenuAdmin";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import UList from "../UList";
//import "./Login.css";

function RegistrarDocente() {
  const idFuncion = 3;

  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [codigoSis, setCodigoSis] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const navigate = useNavigate();
  const [listaRoles, setListaRoles] = useState([]);
  const [listaRolSel, setListaRolSel] = useState([]);



  useEffect(() => {
    if (UList.funcionVerificada(idFuncion)) {
      cargarRoles(); 
    }else{
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Acceso denegado',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/administrador");
    }
  }, [])

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

  
  

  function cargarRoles() {
    axios.get("/api/obtenerRoles").then(dato => {
      setListaRoles(dato.data);
      console.log(dato.data);
    })
  }

  const registrarDocente = async (e) => {
    e.preventDefault();
    

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
      &&listaRolSel.length>0
    ) {
      const datosDocente = {
        Nombre_U: nombre.toUpperCase(),
        Apellido_Paterno_U: apellidoPaterno.toUpperCase(),
        Apellido_Materno_U: apellidoMaterno.toUpperCase(),
        Codigo_SIS_U: codigoSis,
        Correo_U: correoElectronico,
        Contrasenia_U: contrasenia,
        roles: listaRolSel,
      };
      console.log(datosDocente);
      let error = false;
      try {
        await axios.post("/api/registro", datosDocente);
      }
      catch (e) { error = true; }
      if (error) {
        Swal.fire(
          'Error',
          'Algo sali?? mal',
          'error'
        )
      }
      else {
        if (!UList.esAdmin(listaRolSel)) {
          navigate("/administrador/docentes");
        }
        else {
          navigate("/administrador/administradores");
        }
        Swal.fire(
          '??xito',
          'El registro se realiz?? correctamente',
          'success'
        )
      }

    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Hay errores en uno o mas campos, y/o uno o mas campos estan vacios, por favor verificar',
        showConfirmButton: false,
        timer: 1500
      })
    }

    // mandar el objeto datos docente al backend con axios.post('URL', datosDocente)
  };
  function cambiarCodigoSis(event) {
    setCodigoSis(event.target.value);
  }

  function seleccionRol(idRol, seleccionado) {
    if (seleccionado) {
      let listaNueva = [...listaRolSel, idRol];
      console.log("seleccionados", listaNueva);
      setListaRolSel(listaNueva);
    } else {
      let listaNueva = listaRolSel.filter(dato => dato !== idRol);
      console.log("seleccionados", listaNueva);
      setListaRolSel(listaNueva);
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
        <Form>
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
                  Ingrese un texto v??lido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Correo electr??nico</Form.Label>
                <Form.Control
                  value={correoElectronico}
                  type="email"
                  isInvalid={!esCorreoElectronicoValido}
                  onChange={(event) => setCorreoElectronico(event.target.value)}
                />

                <Form.Control.Feedback type="invalid">
                  Ingrese un correo electronico v??lido
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
                  Ingrese un texto v??lido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group>
                <Form.Label>Contrase??a</Form.Label>
                <Form.Control
                  name="pwd" id="input-pwd"
                  value={contrasenia}
                  isInvalid={!esContraseniaValida}
                  onChange={(event) => setContrasenia(event.target.value)}
                  type="password"
                />
                <Form.Control.Feedback type="invalid">
                  La contrase??a debe contener m??nimo de 8 caracteres
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
                  Ingrese un texto v??lido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <p className="m-0">Roles</p>

                <div className='card p-1' style={{ minHeight: "50px" }}>
                  <div className="form-check">
                  {listaRoles.map((e, indice) =>
                    <div key={e.Id_R} className = "p-1" >
                      <input type="checkbox" className="form-check-input" id={e.Id_R} onChange = {(obj)=>{seleccionRol(e.Id_R, obj.target.checked)}}/>
                      <label className="form-check-label" htmlFor={e.Id_R}>{e.Nombre_R}</label>
                    </div>
                  )}
                  </div>
                  
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
                  Ingrese un codigo SIS v??lido
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
