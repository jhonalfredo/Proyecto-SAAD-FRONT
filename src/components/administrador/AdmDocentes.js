import React from 'react'
import { Link } from 'react-router-dom'
import MenuAdmin from './MenuAdmin'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdmDocentes() {

  //const datos = [{ nombre: "jhon", codigo: "439422" }, { nombre: "juan", codigo: "535255" }]

  const [datos, setDatos] = useState([]);
  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarSolicitades();
  }, []);

  const recuperarSolicitades = async () => {
    const rutainicio = "/api/listarDocente";
    let v = await axios.get(rutainicio);
    setDatos(v.data);
    console.log(v.data);
  }

  return (
    <div>
      <MenuAdmin />
      <h1>Docentes</h1>
      
      <div className="row px-3">
        <h4 className='col'>Lista Docentes</h4>
        <div className="col" style={{display: 'flex', justifyContent: "flex-end"}}>
          <Link to="registrar" className='btn btn-danger'>Registrar Nuevo</Link>
        </div>
        
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Apellido</th>
            <th scope="col">Codigo</th>
            <th scope='col'>Correo</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
          {datos.map((e, indice) =>
            <tr key={indice} value={e}>
              <th scope="row">{indice + 1}</th>
              <td>{e.Nombre_U}</td>
              <td>{e.Apelllido_Paterno_U+" "+e.Apellido_Materno_U}</td>
              <td>{e.Codigo_SIS_U}</td>
              <td>{e.Correo_U}</td>
              <td><Link to={String(e.Codigo_SIS_U)} className="btn btn-warning">Opciones</Link></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
