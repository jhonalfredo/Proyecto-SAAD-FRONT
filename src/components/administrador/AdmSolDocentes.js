import React from 'react'
import MenuAdmin from './MenuAdmin'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
//import 'bootstrap/js/dist/dom/selector-engine'
//import 'bootstrap/js/dist/dom/event-handler'
//import 'bootstrap/js/dist/dom/manipulator'
//import 'bootstrap/js/dist/dom/data'
//import 'bootstrap/js/src/tooltip'

export default function AdmSolDocentes() {

  const [datos, setDatos] = useState([]);
  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarSolicitades();
  }, []);
  const recuperarSolicitades = async () => {
    const rutainicio = "/api/listarTodas";
    let v = await axios.get(rutainicio);
    setDatos(v.data);
    console.log(v.data);
  }

  return (
    <div>
      <MenuAdmin />
      <h1>Solicitudes</h1>
      <div className="btn-group" role="group" aria-label="Basic radio toggle button group">
        <input type="radio" className="btn-check" name="btnradio" id="btnradio1" autocomplete="off" checked/>
        <label className="btn btn-outline-primary" for="btnradio1">Todo</label>

        <input type="radio" className="btn-check" name="btnradio" id="btnradio2" autocomplete="off" />
        <label className="btn btn-outline-primary" for="btnradio2">Pendientes</label>

      </div>
      <div className="card m-5 p-3">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Materia</th>
            <th scope="col">Docente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
          {datos.map((e, indice) =>
            <tr key={indice} value={e}>
              <th scope="row">{indice + 1}</th>
              <td>{e.Nomb_M}</td>
              <td>{e.Nombre_U+" "+e.Apelllido_Paterno_U+" "+e.Apellido_Materno_U}</td>
              <td>{e.Fecha_SR}</td>
              <td>{e.Hora_Inicio_SR}</td>
              <td><button className='btn btn-danger'>Ver</button></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}
