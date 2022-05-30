import React from 'react'
import MenuDoc from './MenuDoc'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DetallesReserva from '../administrador/DetallesReserva';

export default function Rechazadas() {

  const datosRecup = localStorage.getItem("datosUser");
  const misDatos = JSON.parse(datosRecup);
  //const [datos, setDatos] = useState([]);
  const [datosMisP, setDatosMisP] = useState([]);

  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarMisSolRechazadas();
  }, []);

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

  const recuperarMisSolRechazadas = async () => {
    const rutainicio = "/api/listarRechazadasDoc/" + misDatos.codigosis;
    console.log("ruta.....", rutainicio)
    let v = await axios.get(rutainicio);
    //setDatos(v.data);
    let datos = unirDatosSolicitud(v.data);
    setDatosMisP(datos);
    console.log("misrechazadas", v.data);
  }

  // const unirGrupos = (datos) => {
  //   let res = "";
  //   datos.forEach(e => {
  //     res = res + e.Id_Grupo_GSR + ", ";
  //   });
  //   return res;
  // }
  // const cancelarPendiente = async (e) => {
  //   const ruta = "/api/cancelarPendiente/" + e.Id_SR;
  //   console.log(ruta);
  //   await axios.patch(ruta);
  // }

  return (
    <>
      <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
        ---
      </div>
      <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <table className="table">
          <thead>
            <tr>
              <th style={{width: "5%"}} className="id">Id</th>
              <th style={{width: "15%"}} scope ="col">Fecha Atendida</th>
              <th style={{width: "30%"}} scope="col">Materia</th>
              <th style={{width: "15%"}} scope="col">Fecha Reserva</th>
              <th style={{width: "15%"}} className="col">Hora reserva</th>
              <th style={{width: "20%"}} scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>

            </tr>
            {datosMisP.map((e, indice) =>
              <tr key={indice} value={e}>
                <td>{e[0].Id_SR}</td>
                <td>{e[0].Fecha_Reporte_RR}</td>
                <td>{e[0].Nombre_M}</td>
                <td>{e[0].Creado_en_SR}</td>
                <td>{e[0].Hora_Inicio_SR}</td>
                <td>
                  {/* <button className='btn btn-danger' onClick={() => cancelarPendiente(e[0])}>Cancelar</button> */}
                  <button className='btn btn-success'>Mas...</button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
    </>
  )
}
