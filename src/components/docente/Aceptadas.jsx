import React from 'react'
import MenuDoc from './MenuDoc'
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Aceptadas() {

  const datosRecup = localStorage.getItem("datosUser");
  const misDatos = JSON.parse(datosRecup);
  //const [datos, setDatos] = useState([]);
  const [datosMisP, setDatosMisP] = useState([]);

  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarMisSolAceptadas();
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

  const recuperarMisSolAceptadas = async () => {
    const rutainicio = "/api/listarAceptadasDoc/" + misDatos.codigosis;
    console.log("ruta.....", rutainicio)
    let v = await axios.get(rutainicio);
    //setDatos(v.data);
    let datos = unirDatosSolicitud(v.data);
    setDatosMisP(datos);
    console.log("misaceptadas", v.data);
  }

  const unirGrupos = (datos) => {
    let res = "";
    datos.forEach(e => {
      res = res + e.Id_Grupo_GSR + ", ";
    });
    return res;
  }
  const cancelarAceptada = async (e) => {
    const ruta = "/api/cancelarAceptada/" + e.Id_SR;
    console.log(ruta);
    await axios.patch(ruta);
  }

  return (
    <>
      <div className="tab-pane fade" id="home" role="tabpanel" aria-labelledby="home-tab">
        ---
      </div>
      <div className="tab-pane fade show active" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        <table className="table">
          <thead>
            <tr>
              <th className="id">ID</th>
              <th scope="col">Materia</th>
              <th className="col">Grupo</th>
              <th scope="col">Fecha Solitada</th>
              <th className="col">Fecha reserva</th>
              <th scope="col">Hora reserva</th>
              <th scope="col">Opciones</th>
            </tr>
          </thead>
          <tbody>
            <tr>

            </tr>
            {datosMisP.map((e, indice) =>
              <tr key={indice} value={e}>
                <td>{e[0].Id_SR}</td>
                <td>{e[0].Nombre_M}</td>
                <td>{unirGrupos(e)}</td>
                <td>{e[0].Creado_en_SR}</td>
                <td>1/1/2021</td>
                <td>{e[0].Hora_Inicio_SR}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => cancelarAceptada(e[0])}>Cancelar</button>
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
