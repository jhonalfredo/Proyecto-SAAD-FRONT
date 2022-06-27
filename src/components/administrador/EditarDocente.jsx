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
import Swal from "sweetalert2";
import UList from "../UList";
//import "./Login.css";

function EditarDocente() {
  const idFuncion = 4;

  const [modalVisible, setModalVisible] = useState(false);
  const [mensajeAccionSolicitud, setMensajeAccionSolicitud] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidoPaterno, setApellidoPaterno] = useState("");
  const [apellidoMaterno, setApellidoMaterno] = useState("");
  const [codigoSis, setCodigoSis] = useState("");
  const [correoElectronico, setCorreoElectronico] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  //const [idRol, setIdRol] = useState(null);
  const navigate = useNavigate();
  const esNombreValido = useMemo(() => {
    return nombre.length == 0 || /^[a-zA-Z\s\u00f1\u00d1\u00E0-\u00FC]+$/g.test(nombre);
  }, [nombre]);
  const { id } = useParams();

  const[rolUsuario, setRolUsuario] = useState([]);
  //var rolUsuario = null;

  const [listaRoles, setListaRoles] = useState([]);
  const [listaRolSel, setListaRolSel] = useState([]);

  useEffect(() => {
    if (UList.funcionVerificada(idFuncion)) {
      cargarDatos();
      cargarRoles();
    } else {
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Acceso denegado',
        showConfirmButton: false,
        timer: 1500
      })
      navigate("/administrador");
    }
  }, []);


  function cargarRoles() {
    axios.get("/api/obtenerRoles").then(dato => {
      setListaRoles(dato.data);
      console.log(dato.data);
    })
  }

  function cargarDatos() {
    setModalVisible(false)
    axios.get("/api/obtenerUsuario/" + id).then(dato => {
      let docente = dato.data.usuario[0];
      let rolesComp = dato.data.roles;
      let roles = [];
      rolesComp.forEach(element => {
        roles.push(element.Rol_Id_R);
      });

      setListaRolSel(roles);

      //rolUsuario = roles;

      console.log("recuppppprollll",roles)
      console.log("he recuperado....................", docente);
      setNombre(docente.Nombre_U);
      setApellidoPaterno(docente.Apellido_Paterno_U);
      setApellidoMaterno(docente.Apellido_Materno_U);
      setCodigoSis(docente.Codigo_SIS_U);
      setCorreoElectronico(docente.Correo_U);
      //setContrasenia(docente.Contrasenia_U);
      //setIdRol(docente.Rol_U);
      setRolUsuario(roles);
    })
  }

  const esContraseniaValida = useMemo(() => {
    if(contrasenia){
      return contrasenia.length == 0 || contrasenia.length >= 8
    }else{
      return true;
    }
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

    let contrasenafin = contrasenia.length>0?contrasenia:null;

    const datosDocente = {
      Nombre_U: nombre,
      Apellido_Paterno_U: apellidoPaterno,
      Apellido_Materno_U: apellidoMaterno,
      Codigo_SIS_U: codigoSis,
      Correo_U: correoElectronico,
      Contrasenia_U: contrasenafin,
      anterior:rolUsuario,
      nuevo:listaRolSel,
    };

    if (
      // !!contrasenia &&
      // esContraseniaValida &&
      !!apellidoPaterno &&
      esApellidoPaternoValido &&
      !!apellidoMaterno &&
      esApellidoMaternoValido &&
      !!nombre &&
      esNombreValido &&
      !!correoElectronico &&
      esCorreoElectronicoValido
      &&listaRolSel.length>0
      /* &&
      !!codigoSis &&
      esCodigoSisValido*/
    ) {
      console.log(datosDocente);

      let error = false;
      try {
        await axios.patch("/api/editarUsuario", datosDocente);
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
        if (!UList.esAdmin(listaRolSel)) {
          navigate("/administrador/docentes");
        }
        else {
          navigate("/administrador/administradores");
        }
        Swal.fire(
          'Éxito',
          'Los cambios se realizaron correctamente',
          'success'
        )
      }
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

  function perteneceRol(id){
    console.log("perroolltrueeee",id, rolUsuario);
    let res = false;
    /*rolUsuario.forEach(element => {
      if(element===id){
        res = true;
      }
    });*/
    return res;
  }

  function recuperarSeleccion(id){
    let res = false;
    listaRolSel.forEach(element => {
      if(element===id){
        res = true;
      }
    });
    return res;
  }

  return (
    <div>
      
      <Container>
      <h1>Editar Usuario</h1>
        <Row>
          <Col md={12}>
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
                  Ingrese un texto válido
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
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
          </Row>
          <Row>
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
            <Col md={6}>
              <p className="m-0">Roles</p>

              <div className='card p-1' style={{ minHeight: "50px" }}>
                <div className="form-check">
                  {nombre.length>0?
                <div>
                  {listaRoles.map((e, indice) =>
                    <div key={e.Id_R} className="p-1" >
                      <input type="checkbox" className="form-check-input" checked={recuperarSeleccion(e.Id_R)} id={e.Id_R} onChange={(obj) => {seleccionRol(e.Id_R, obj.target.checked) }} />
                      <label className="form-check-label" htmlFor={e.Id_R}>{e.Nombre_R}</label>
                    </div>
                  )}
                </div>  
                :""}
                </div>

              </div>

            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <Form.Group className="my-3">              
                  <button class="btn btn-outline-dark" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Nueva Contraseña
                  </button>
                
                <div class="collapse" id="collapseExample">
                  <Form.Group>
                    <Form.Control
                      name="pwd" id="input-pwd"
                      isInvalid={!esContraseniaValida}
                      type="text"
                      onChange={(e)=>setContrasenia(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid">
                      La contraseña debe contener mínimo de 8 caracteres
                    </Form.Control.Feedback>
                  </Form.Group>
                </div>
              </Form.Group>
            </Col>

          </Row>
          <Col md={6}>
            <Button onClick={() => setModalVisible(true)}>Guardar Cambios</Button>
          </Col>
        </Form>
        <ModalConfirmacion
          modalVisible={modalVisible}
          texto="¿Está seguro de guardar los cambios?"
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
