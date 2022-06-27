import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import MenuDoc from '../docente/MenuDoc';
import DetalleAtendido from '../reusables/DetalleAtendido';
import DetalleSimple from '../reusables/DetalleSimple';
import FormAcepRecSolDoc from '../reusables/FormAcepRecSolDoc';
import UList from '../UList';
import MenuAdmin from './MenuAdmin';

export default function AdmAceptarSolicitudesDoc() {
  const idFuncion = 2;

  const { id } = useParams();
  const [datosRes, setDatosRes] = useState(null);
  const [datosAtendido, setDatosAtendido] = useState(null);

  const navegar =  useNavigate();

  useEffect(() => {

    if (UList.funcionVerificada(idFuncion)) {
      recuperarDatosReserva();
    }else{
      Swal.fire({
        position: 'top-center',
        icon: 'error',
        title: 'Acceso denegado',
        showConfirmButton: false,
        timer: 1500
      })
      navegar("/administrador");
    }

    
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
        <MenuAdmin/>
        <DetalleSimple datos = {datosRes}/>
        {datosAtendido!==null?<DetalleAtendido datos = {datosAtendido}/>:"..."}
        {datosAtendido!==null?"":<FormAcepRecSolDoc datos = {datosRes}/>}
        
    </div>
  )
}

//{datosAtendido?<DetalleAtendido datos = {datosAtendido}/>:"..."}
//{datosAtendido?"nada---":<DetalleAtendido datos = {datosAtendido}/>}