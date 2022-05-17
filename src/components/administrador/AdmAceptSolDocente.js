import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DetallesReserva from './DetallesReserva';
import MenuAdmin from './MenuAdmin'

export default function AdmAceptSolDocente() {
  const [listaME, setListaMe] = useState([]);
  const [misGruposSel, setMisGruposSel] = useState([]);

  useEffect(() => {
    recuperarDatos();
  }, []);

  async function recuperarDatos(){
    const rutainicio = "/api/reservasAceptadas/" + "2022-03-25";
    let reservasAceptadas = await axios.get(rutainicio);
    console.log(reservasAceptadas.data);
    const rutaHorarios = "/api/listarHorariosAulas/"+"LUNES";
    let listaHorariosAulas = await axios.get(rutaHorarios);
    console.log(listaHorariosAulas.data);
    setListaMe(listaHorariosAulas.data);
  }
  
  const listarGruposMateria = (grupo, agregar) => {
    console.log("agregarmat", grupo, agregar);
    if (agregar) {
        let listaNueva = [...misGruposSel, grupo];
        console.log(listaNueva);
        setMisGruposSel(listaNueva);
    } else {
        let listaNueva = misGruposSel.filter(dato => dato !== grupo);
        console.log(listaNueva);
        setMisGruposSel(listaNueva);
    }
}

  return (
    <div>
      <MenuAdmin />
      <DetallesReserva/>
      Capacidad total: 0
      <div className='card px-1' style={{ minHeight: "50px" }}>
        {listaME.map((e, indice) =>
          <div key={e.Id_A+"-"+e.Hora_Inicio_HL}>
            <div className="form-check">
              <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={e.Id_A+"-"+e.Hora_Inicio_HL} />
              <label className="form-check-label" htmlFor={e.Id_A+"-"+e.Hora_Inicio_HL}>
                {e.Id_A+"-"+e.Hora_Inicio_HL}
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
