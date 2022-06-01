import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import MenuDoc from './MenuDoc';
import DetalleAtendido from '../reusables/DetalleAtendido';
import DetalleSimple from '../reusables/DetalleSimple';
import FormAcepRecSolDoc from '../reusables/FormAcepRecSolDoc';


export default function DocVisualizarDetalles() {

  const { id } = useParams();
  const [datosRes, setDatosRes] = useState(null);
  const [datosAtendido, setDatosAtendido] = useState(null);

  useEffect(() => {
    recuperarDatosReserva();
    //recuperarListas();
    //recuperarDatos();
  }, []);

  async function recuperarDatosReserva() {
    const rutainicio = "/api/detalleReserva/" + id;
    let datosRes = await axios.get(rutainicio);
    let datos = datosRes.data;
    setDatosRes(datos);
    console.log(datos);
    if(datos.detalle[0].Estado_Atendido_SR===1){
      console.log("atendido...", datos.detalle[0].Estado_Atendido_SR);
      const ruta = "/api/detalleReservaAtendida/" + id;
      let datosAt = await axios.get(ruta);
      setDatosAtendido(datosAt.data);
    }
  }

  return (
    <div>
        <MenuDoc/>
        <DetalleSimple datos = {datosRes}/>
        {datosAtendido!==null?<DetalleAtendido datos = {datosAtendido}/>:"..."}      
    </div>
  )
}

//{datosAtendido?<DetalleAtendido datos = {datosAtendido}/>:"..."}
//{datosAtendido?"nada---":<DetalleAtendido datos = {datosAtendido}/>}