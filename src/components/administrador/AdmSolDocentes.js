import React from 'react'
import MenuAdmin from './MenuAdmin'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function AdmSolDocentes() {

  const [datos, setDatos] = useState([]);
  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarSolicitades();
  }, []);
  const recuperarSolicitades = async () => {
    const rutainicio = "http://127.0.0.1:8000/api/listarTodas";
    let v = await axios.get(rutainicio);
    setDatos(v.data);
    console.log(v.data);
  }

  return (
    <div>
      <MenuAdmin />
      <h1>Solicitudes</h1>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Codigo</th>
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
              <td>{e.Nombre_U}</td>
              <td>{e.Fecha_SR}</td>
              
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
