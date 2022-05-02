import React, { useState, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Image from "react-bootstrap/Image";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";

const HORARIOS = ["6:45", "7:00"];

function NuevaReserva() {
  const [nroEstudiantes, setNroEstudiantes] = useState("");

  const [materias, setMaterias] = useState([]);
  const [grupos, setGrupos] = useState([]);
  const [idMateriaSeleccionada, setIdMateriaSeleccionada] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");
  const [idsGruposSeleccionados, setIdsGruposSeleccionados] = useState([]);
  const [fecha, setFecha] = useState("");
  const [motivo, setMotivo] = useState("");

  useEffect(() => {
    axios.get("http://localhost:4200/materias").then((materiasObtenidas) => {
      setMaterias(materiasObtenidas.data);
    });
  }, []);

  useEffect(() => {
    if (idMateriaSeleccionada !== "" && idMateriaSeleccionada != -1) {
      axios
        .get("http://localhost:4200/grupos/" + idMateriaSeleccionada)
        .then((gruposObtenidos) => {
          setGrupos(gruposObtenidos.data);
        });
    }
  }, [idMateriaSeleccionada]);

  function guardarIDMateria(event) {
    setIdMateriaSeleccionada(event.target.value);
  }

  function guardarNroEstudiantes(event) {
    setNroEstudiantes(event.target.value);
  }

  function agregarOQuitarGrupo(event) {
    if (idsGruposSeleccionados.includes(event.target.value)) {
      const idsGruposFiltrados = idsGruposSeleccionados.filter(function(x) {
        return x != event.target.value;
      })
      setIdsGruposSeleccionados(idsGruposFiltrados);
    } else {
      setIdsGruposSeleccionados([...idsGruposSeleccionados, event.target.value])
    }
  }

  const mandarDatos = () => {
    const datos = {
      nroEstudiantes,
      idMateriaSeleccionada,
      fecha,
      horarioSeleccionado,
      motivo,
      idsGruposSeleccionados,
    };
    console.log(datos);
    axios
      .post("http://localhost:4200/nueva-reserva", datos)
      .then(() => console.log("exito"));
  };

  return (
    <Container>
      <Row>
        <Form>
          <Form.Select onChange={guardarIDMateria}>
            <option value={"-1"}>Materia</option>
            {materias.map((materia) => (
              <option key={materia.id} value={materia.id}>
                {materia.nombre}
              </option>
            ))}
          </Form.Select>
          <Form.Select
            onChange={(event) => setHorarioSeleccionado(event.target.value)}
          >
            <option value={"-1"}>Selecciona tu horario</option>
            {HORARIOS.map((horario) => (
              <option key={horario} value={horario}>
                {horario}
              </option>
            ))}
          </Form.Select>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nro estudiantes</Form.Label>
            <Form.Control
              value={nroEstudiantes}
              onChange={guardarNroEstudiantes}
              className="mi-input"
              type="email"
            />
          </Form.Group>
          <label>Seleccionar fecha</label>
          <input
            value={fecha}
            onChange={(event) => setFecha(event.target.value)}
            type="date"
          ></input>
          <Form.Group className="mb-3">
            <Form.Label>Example textarea</Form.Label>
            <Form.Control
              value={motivo}
              onChange={(event) => setMotivo(event.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          {grupos.map(function (grupo) {
            return <Form.Check key={grupo.id} value={grupo.id} onChange={agregarOQuitarGrupo} label={grupo.grupo} />;
          })}
        </Form>
        <Button onClick={mandarDatos}>guardar</Button>
      </Row>
    </Container>
  );
}

export default NuevaReserva;
