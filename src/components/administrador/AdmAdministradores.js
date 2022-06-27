import React from 'react'
import { Link } from 'react-router-dom'
import MenuAdmin from './MenuAdmin'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function AdmAdministradores() {

  //const datos = [{ nombre: "jhon", codigo: "439422" }, { nombre: "juan", codigo: "535255" }]

  const [datos, setDatos] = useState([]);
  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarSolicitades();
  }, []);

  const recuperarSolicitades = async () => {
    const rutainicio = "/api/listarAdministrador";
    let v = await axios.get(rutainicio);
    let datos = v.data;
    datos.sort(
      function (a, b) {
        //console.log("fdasfa", a)
        return a.Apellido_Paterno_U.localeCompare(b.Apellido_Paterno_U);
      });
    setDatos(v.data);
    console.log(v.data);
  }

  return (
    <div>
      <MenuAdmin />
      <div className="p-3">
      <div className="row">
        <h4 className='col'>Lista Administradores</h4>
        <div className="col" style={{display: 'flex', justifyContent: "flex-end"}}>
          <Link to="registrar" className='btn btn-danger'>Registrar Nuevo</Link>
        </div>
        
      </div>

      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Nombres</th>
            <th scope="col">Codigo Sis</th>
            <th scope='col'>Correo electrónico</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
          {datos.map((e, indice) =>
            <tr key={indice} value={e}>
              <th scope="row">{indice + 1}</th>
              <td>{e.Apellido_Paterno_U+" "+e.Apellido_Materno_U}</td>
              <td>{e.Nombre_U}</td>
              <td>{e.Codigo_SIS_U}</td>
              <td>{e.Correo_U}</td>
              <td><Link to={"/administrador/editar/"+String(e.Codigo_SIS_U)} className="btn btn-warning">Editar</Link></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}
