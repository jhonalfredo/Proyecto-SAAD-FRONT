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

  //const [datos, setDatos] = useState([]);
  const [datosJuntados, setDatosJuntados] = useState([]);

  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarSolicitades();
  }, []);
  const recuperarSolicitades = async () => {
    const rutainicio = "/api/listarTodas";
    let v = await axios.get(rutainicio);
    let datos = v.data;
    //setDatos(datos);
    let datosJuntos = unirDatosSolicitud(datos);
    console.log("juntados", datosJuntos)
    setDatosJuntados(datosJuntos);
    //setDatos(v.data);
    //console.log(v.data);
  }

  const unirDatosSolicitud = (datos)=>{
    let res = [];
    for(let i= 0; i<datos.length; i++){
      let lista = [datos[i]];
      let sig = true;
      let aux = i+1;
      while (sig){
        if(aux<datos.length){
          if(datos[aux].Id_SR===lista[0].Id_SR){
            lista.push(datos[aux]);
            aux = aux+1;
          }else{
            sig = false;
          }
        }else{
          sig = false;
        }
      }

      i = aux-1;
      res.push(lista);

    }

    return res;

  }

  const getNombresJuntados = (datos)=>{
    console.log("uniendo nombres", datos);
    let res = "";

    datos.forEach(e => {
      res = res+e.Nombre_U+" "+e.Apelllido_Paterno_U+" "+e.Apellido_Materno_U+", ";
    });

    /*for(let i=0;i<e.length;i++){
      console.log("ciclo...", e[i])
      res = res+e[i].Nombre_U+" "+e[i].Apelllido_Paterno_U+" "+e[i].Apellido_Materno_U+"\n";
    }*/

    return res;
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
            <th scope="col">ID</th>
            <th scope="col">Materia</th>
            <th>Cant</th>
            <th scope="col">Docente</th>
            <th scope="col">Fecha</th>
            <th scope="col">Hora</th>
            <th scope="col">Opciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
          {datosJuntados.map((e, indice) =>
            <tr key={indice} value={e}>
              <th scope="row">{e[0].Id_SR}</th>
              <td>{e[0].Nomb_M}</td>
              <td>{e.length}</td>
              <td>{getNombresJuntados(e)}</td>
              <td>{e[0].Fecha_SR}</td>
              <td>{e[0].Hora_Inicio_SR}</td>
              <td><Link to={String(e.Id_SR)} className='btn btn-danger'>Ver</Link></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}

/*export default function AdmSolDocentes() {

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
            <th scope="col">ID</th>
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
              <th scope="row">{e.Id_SR}</th>
              <td>{e.Nomb_M}</td>
              <td>{e.Nombre_U+" "+e.Apelllido_Paterno_U+" "+e.Apellido_Materno_U}</td>
              <td>{e.Fecha_SR}</td>
              <td>{e.Hora_Inicio_SR}</td>
              <td><Link to={String(e.Id_SR)} className='btn btn-danger'>Ver</Link></td>
            </tr>
          )}
        </tbody>
      </table>
      </div>
    </div>
  )
}
*/