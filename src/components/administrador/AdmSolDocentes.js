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
  const [datosPen, setDatosPen] = useState([]);
  const [datosUr, setDatosUr] = useState([]);
  const [datosAt, setDatosAt] = useState([]);

  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarSolicitades();
    recuperarPendientes();
    recuperarUrgentes();
    recuperarAtendidas();
    //recuperarPendientes();
  }, []);

  //const recuperarPendientes()

  const recuperarUrgentes = async () =>{
    const rutainicio = "/api/listarUrgencia";
    let v = await axios.get(rutainicio);
    let datos = v.data;
    let datosJuntos = unirDatosSolicitud(datos);
    console.log("urgentes", datosJuntos);
    setDatosUr(datosJuntos);
  }

  const recuperarAtendidas = async () =>{
    const rutainicio = "/api/listarAtendidas";
    let v = await axios.get(rutainicio);
    let datos = v.data;
    let datosJuntos = unirDatosSolicitud(datos);
    console.log("atendidas", datosJuntos);
    setDatosAt(datosJuntos);
  }

  const recuperarPendientes = async () =>{
    const rutainicio = "/api/listarPendientes";
    let v = await axios.get(rutainicio);
    let datos = v.data;
    let datosJuntos = unirDatosSolicitud(datos);
    console.log("pendientes", datosJuntos);
    setDatosPen(datosJuntos);
  }

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

  const unirDatosSolicitud = (datos) => {
    let res = [];
    for (let i = 0; i < datos.length; i++) {
      let lista = [datos[i]];
      let sig = true;
      let aux = i + 1;
      while (sig) {
        if (aux < datos.length) {
          if (datos[aux].Id_SR === lista[0].Id_SR) {
            lista.push(datos[aux]);
            aux = aux + 1;
          } else {
            sig = false;
          }
        } else {
          sig = false;
        }
      }

      i = aux - 1;
      res.push(lista);

    }

    return res;

  }

  const getNombresJuntados = (datos) => {
    //console.log("uniendo nombres", datos);
    let res = "";

    datos.forEach(e => {
      res = res + e.Nombre_U + " " + e.Apellido_Paterno_U + " " + e.Apellido_Materno_U + ", ";
    });

    /*for(let i=0;i<e.length;i++){
      console.log("ciclo...", e[i])
      res = res+e[i].Nombre_U+" "+e[i].Apelllido_Paterno_U+" "+e[i].Apellido_Materno_U+"\n";
    }*/

    return res;
  }

  function getEstadoReservaColor(tipo) {
    let res = "Black";
    switch (tipo) {
      case 0:
        res = "Orange";
        break;
      case 1:
        res = "#2ECC71";
        break;
      case 2:
        res = "Red";
        break;
      default:
        break;
    }

    return res;
  }

  function getEstadoReserva(tipo) {
    let res = "error";
    switch (tipo) {
      case 0:
        res = "Pendiente";
        break;
      case 1:
        res = "Atendida";
        break;
      case 2:
        res = "Cancelada";
        break;
      default:
        break;
    }

    return res;
  }

  return (
    <div>
      <MenuAdmin />
      <nav>
        <div className="nav nav-tabs bg-dark" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-pendientes-tab" data-bs-toggle="tab" data-bs-target="#nav-pendientes" type="button" role="tab" aria-controls="nav-pendientes" aria-selected="true">Pendientes</button>
          <button className="nav-link" id="nav-urgentes-tab" data-bs-toggle="tab" data-bs-target="#nav-urgentes" type="button" role="tab" aria-controls="nav-urgentes" aria-selected="false">Urgentes</button>
          <button className="nav-link" id="nav-atendidas-tab" data-bs-toggle="tab" data-bs-target="#nav-atendidas" type="button" role="tab" aria-controls="nav-atendidas" aria-selected="false">Atendidas</button>
          <button className="nav-link" id="nav-todas-tab" data-bs-toggle="tab" data-bs-target="#nav-todas" type="button" role="tab" aria-controls="nav-todas" aria-selected="false">Todas</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-pendientes" role="tabpanel" aria-labelledby="nav-pendientes-tab">
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Fecha Recibida</th>
                <th className="col">ID</th>
                <th scope="col">Materia</th>
                <th scope="col">Docente</th>
                <th scope="col">Fecha Reserva</th>
                <th scope="col">Hora</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>

              </tr>
              {datosPen.map((e, indice) =>
                <tr key={indice} value={e}>
                  <td>{e[0].Creado_en_SR}</td>
                  <td>{e[0].Id_SR}</td>
                  <td>{e[0].Nombre_M}</td>
                  <td>{getNombresJuntados(e)}</td>
                  <td>{e[0].Fecha_SR}</td>
                  <td>{e[0].Hora_Inicio_SR}</td>
                  <td><Link to={String(e[0].Id_SR)} className='btn btn-warning'>Detalle</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="tab-pane fade p-3" id="nav-urgentes" role="tabpanel" aria-labelledby="nav-urgentes-tab">
        <table className="table">
            <thead>
              <tr>
              <th scope="col">Fecha Reserva</th>
                <th scope="col">Hora</th>
                <th className="col">ID</th>
                
                <th scope="col">Materia</th>
                <th scope="col">Docente</th>
                
                <th scope="col">Fecha Recibida</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>

              </tr>
              {datosUr.map((e, indice) =>
                <tr key={indice} value={e}>
                  
                  <td>{e[0].Fecha_SR}</td>
                  <td>{e[0].Hora_Inicio_SR}</td>

                  
                  <td>{e[0].Id_SR}</td>
                  <td>{e[0].Nombre_M}</td>
                  <td>{getNombresJuntados(e)}</td>
                  <td>{e[0].Creado_en_SR}</td>
                  <td><Link to={String(e[0].Id_SR)} className='btn btn-warning'>Detalle</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade p-3" id="nav-atendidas" role="tabpanel" aria-labelledby="nav-atendidas-tab">
        <table className="table">
            <thead>
              <tr>
              <th scope="col">Fecha Reserva</th>
                <th scope="col">Hora</th>
                <th className="col">ID</th>
                
                <th scope="col">Materia</th>
                <th scope="col">Docente</th>
                
                <th scope="col">Fecha Recibida</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>

              </tr>
              {datosAt.map((e, indice) =>
                <tr key={indice} value={e}>
                  
                  <td>{e[0].Fecha_SR}</td>
                  <td>{e[0].Hora_Inicio_SR}</td>

  
                  <td>{e[0].Id_SR}</td>
                  <td>{e[0].Nombre_M}</td>
                  <td>{getNombresJuntados(e)}</td>
                  <td>{e[0].Creado_en_SR}</td>
                  <td><Link to={String(e[0].Id_SR)} className='btn btn-warning'>Detalle</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="tab-pane fade p-3" id="nav-todas" role="tabpanel" aria-labelledby="nav-todas-tab">
        <table className="table">
            <thead>
              <tr>
                <th scope="col">Fecha Recibida</th>
                <th className="col">ID</th>
                <th scope="col">Materia</th>
                <th scope="col">Docente</th>
                <th scope="col">Fecha Reserva</th>
                <th scope="col">Hora</th>
                <th scope='col'>Estado</th>
                <th scope="col">Opciones</th>
              </tr>
            </thead>
            <tbody>
              <tr>

              </tr>
              {datosJuntados.map((e, indice) =>
                <tr key={indice} value={e}>
                  <td>{e[0].Creado_en_SR}</td>
                  <td>{e[0].Id_SR}</td>
                  <td>{e[0].Nombre_M}</td>
                  <td>{getNombresJuntados(e)}</td>
                  <td>{e[0].Fecha_SR}</td>
                  <td>{e[0].Hora_Inicio_SR}</td>
                  <td style={{color: getEstadoReservaColor(e[0].Estado_Atendido_SR)}}>{getEstadoReserva(e[0].Estado_Atendido_SR)}</td>
                  <td><Link to={String(e[0].Id_SR)} className='btn btn-warning'>Detalle</Link></td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
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