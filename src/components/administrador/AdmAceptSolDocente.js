import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import DetallesReserva from './DetallesReserva';
import MenuAdmin from './MenuAdmin'
import DatosApp from '../docente/DatosApp';

export default function AdmAceptSolDocente() {

  const { id } = useParams();

  const [listaME, setListaMe] = useState([]);
  const [misGruposSel, setMisGruposSel] = useState([]);
  const [totalCap, setTotalCap] = useState(0);

  useEffect(() => {
    recuperarDatosReserva();
    //recuperarListas();
    //recuperarDatos();
  }, []);

  async function recuperarListas(){
    const rutainicio = "/api/listarAulasEdificios/NUEVO EDIF. ACADEMICO 2 (FCYT)";
    let datosRes = await axios.get(rutainicio);
    console.log("edif", datosRes.data);

    
  }

  async function recuperarDatosReserva() {
    const rutainicio = "/api/detalleReserva/" + id;
    let datosRes = await axios.get(rutainicio);
    let datos = datosRes.data;
    console.log(datos.detalle[0].Fecha_SR);
    console.log(datosRes.data);
    let horaInicio = datos.detalle[0].Hora_Inicio_SR;
    let separacion = horaInicio.split(":");
    let horaIni = separacion[0] + ":" + separacion[1];
    if (horaIni.charAt(0) === "0") {
      horaIni = horaIni.substring(1);
    }
    let periodosHora = datos.detalle[0].Cantidad_Periodos_SR;
    let posHrIni = DatosApp.getHorarios().indexOf(horaIni);
    let horafin = DatosApp.getHorariosFin()[posHrIni + periodosHora - 1]
    console.log(horaIni, periodosHora, horafin, DatosApp.getHorarios().indexOf(horaIni))
    recuperarDatos(datos.detalle[0].Fecha_SR, horaIni, horafin, periodosHora, posHrIni);
  }

  async function recuperarDatos(fecha, horaIni, horafin, periodosHora, posHrIni) {
    const numeroDia = new Date(fecha).getDay();
    console.log(numeroDia);
    const dias = [
      'DOMINGO',
      'LUNES',
      'MARTES',
      'MIERCOLES',
      'JUEVES',
      'VIERNES',
      'SABADO',
    ];

    const rutainicio = "/api/reservasAceptadas/"+fecha;//2022-03-25" //+ fecha;
    let reservasAceptadas = await axios.get(rutainicio);
    console.log(reservasAceptadas.data);
    const rutaHorarios = "/api/listarHorariosAulas/"+dias[numeroDia];//MARTES"//*ID:6*+dias[numeroDia];
    let listaHorariosAulas = await axios.get(rutaHorarios);
    console.log(listaHorariosAulas.data);
    //setListaMe(listaHorariosAulas.data);
    let listaUnida = unirDatos(listaHorariosAulas.data);
    let horarios = DatosApp.getHorarios();

    let listaHab = [];

    console.log("-------------ListaUnida", listaUnida);
    console.log("-------------ListaHorarios", horarios, posHrIni, periodosHora);

    let listaNecesitada = horarios.slice(posHrIni, posHrIni + periodosHora);
    console.log("necesitooo", listaNecesitada);

    for (let i = 0; i < listaUnida.length; i++) {
      let contador = 0;
      for (let j = 0; j < listaUnida[i].length; j++) {
        console.log("datooo", listaUnida[i][j])
        for (let k = 0; k < listaNecesitada.length; k++) {
          if (listaUnida[i][j].Hora_Inicio_HL.includes(listaNecesitada[k])) {
            contador = contador + 1;
          }
        }
      }

      if (contador === listaNecesitada.length) {
        listaHab.push(listaUnida[i][0]);
      }
    }

    /*for(let k = 0; k< listaUnida.length; k++){
      let countCoin = 0;
      for(let i=posHrIni;i<posHrIni+periodosHora;i++){
        if(listaUnida[k].Hora_Inicio_HL.includes(horarios[i])){
          countCoin = countCoin+1;
          console.log(listaUnida[k].Hora_Inicio_HL, horarios[i])
        }
      }
      if(countCoin===periodosHora){
        listaHab.push(listaUnida[k].Id_A);
      }
    }*/

    setListaMe(listaHab);

  }


  const unirDatos = (datos) => {
    let res = [];
    for (let i = 0; i < datos.length; i++) {
      let lista = [datos[i]];
      let sig = true;
      let aux = i + 1;
      while (sig) {
        if (aux < datos.length) {
          if (datos[aux].Id_A === lista[0].Id_A) {
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

    console.log(res[0]);

    return res;

  }

  const listarGruposMateria = (grupo, agregar) => {
    console.log("agregarmat", grupo, agregar);
    if (agregar) {
      let listaNueva = [...misGruposSel, grupo];
      console.log(listaNueva);
      setMisGruposSel(listaNueva);

      let total = totalCap + grupo.Capacidad_A;
      setTotalCap(total);

    } else {
      let listaNueva = misGruposSel.filter(dato => dato !== grupo);
      console.log(listaNueva);
      setMisGruposSel(listaNueva);

      let total = totalCap - grupo.Capacidad_A;
      setTotalCap(total);
    }
  }

  return (
    <div>
      <MenuAdmin />
      <DetallesReserva />
     
      <div className="p-5">
      <div className='fw-bolder'>Sugerencia de Aulas</div>
        Capacidad total: {totalCap}
        <div className='card px-1' style={{ minHeight: "50px" }}>
          {listaME.map((e, indice) =>
            <div key={e.Id_A}>
              <div className="form-check">
                <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={e.Id_A} />
                <label className="form-check-label" htmlFor={e.Id_A}>
                  {e.Id_A}
                </label>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
