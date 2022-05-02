import React from 'react'
import { Link } from 'react-router-dom'
import MenuAdmin from './MenuAdmin'

export default function AdmDocentes() {

  const datos = [{ nombre: "jhon", codigo: "439422" }, { nombre: "juan", codigo: "535255" }]

  return (
    <div>
      <MenuAdmin />
      <h1>Docentes</h1>
      
      <div className="row px-3">
        <h4 className='col'>Lista Docentes</h4>
        <div className="col" style={{display: 'flex', justifyContent: "flex-end"}}>
          <button className='btn btn-danger'>Registrar Nuevo</button>
        </div>
        
      </div>

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
              <td>{e.nombre}</td>
              <td>{e.nombre + "ap"}</td>
              <td>{e.codigo}</td>
              <td><Link to={e.codigo} className="btn btn-warning">Opciones</Link></td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
