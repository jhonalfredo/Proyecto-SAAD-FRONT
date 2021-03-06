import React from 'react'
import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';

export default function Pendientes() {

  const datosRecup = localStorage.getItem("datosUser");
  const misDatos = JSON.parse(datosRecup);
  //const [datos, setDatos] = useState([]);
  const [datosMisP, setDatosMisP] = useState([]);

  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarMisSolPendientes();
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

  const recuperarMisSolPendientes = async () => {
    const rutainicio = "/api/listarPendientesDoc/" + misDatos.codigosis;
    console.log("ruta.....", rutainicio)
    let v = await axios.get(rutainicio);
    //setDatos(v.data);
    let datos = unirDatosSolicitud(v.data);
    setDatosMisP(datos);
    console.log("mispendientes", v.data);
  }

  const unirGrupos = (datos) => {
    let res = "";
    datos.forEach(e => {
      res = res + e.Id_G_US + ", ";
    });
    return res;
  }
  const cancelarPendiente = async (total) => {
    let e = total[0];

    Swal.fire({
      title: '¿Esta seguro de cancelar esta reserva?',
      text: "Se cancelará la reserva para los grupos: "+unirGrupos(total)+" de la materia "+e.Nombre_M,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelarPendienteBD(e);
      }
    })

    
  }

  async function cancelarPendienteBD(e){
    const ruta = "/api/cancelarPendiente/" + e.Id_SR;
    console.log(ruta);
    await axios.patch(ruta);
    recuperarMisSolPendientes();
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
                
                <td>{e[0].Hora_Inicio_SR}</td>
                <td>
                  <button className='btn btn-danger' onClick={() => cancelarPendiente(e)}>Cancelar</button>
                  <Link to={String(e[0].Id_SR)} className='btn btn-warning'>Detalle</Link>
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
