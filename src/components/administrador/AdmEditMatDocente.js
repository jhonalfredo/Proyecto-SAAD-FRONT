import React from 'react'
import MenuAdmin from './MenuAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function AdmEditMatDocente(props) {

  const { id } = useParams();
  const datos = props;
  console.log(datos);

  const [datosUser, setDatosUser] = useState(null);
  const [listaMD, setlistaMD] = useState([]);
  const [misGruposSel, setMisGruposSel] = useState([]);
  const [gruposLibres, setGruposLibres] = useState([]);
  const [misLibresSel, setMisLibresSel] = useState([]);

  useEffect(() => {
    console.log("se ejecuta efect")
    recuperarDatoUser();
    recuperarMateriasDocente();
    recuperarMateriasLibres();
  }, []);

  const recuperarDatoUser = async () => {
    const rutainicio = "/api/obtenerDocente/" + id;
    let v = await axios.get(rutainicio);
    console.log(v.data[0]);
    console.log("unicaaaaa", v.data[0]);
    setDatosUser(v.data[0]);
  }

  const recuperarMateriasDocente = async () => {
    setMisGruposSel([]);
    const rutainicio = "/api/obtenerGruposDocentes/" + id;
    let v = await axios.get(rutainicio);
    console.log("materiasdoc________________", v.data);
    //console.log("unicaaaaa", v.data[0]);
    setlistaMD(v.data);
  }

  const recuperarMateriasLibres = async () => {
    setMisLibresSel([]);
    const rutainicio = "/api/gruposParaAsignar";
    let v = await axios.get(rutainicio);
    console.log("gruposlibres___________________________________", v.data);
    setGruposLibres(v.data);
    //console.log("unicaaaaa", v.data[0]);
    //setlistaMD(v.data);
  }

  function concatenarIniciales() {
    let res = "-"
    if (datosUser) {
      res = datosUser.Nombre_U.charAt(0) + datosUser.Apellido_Paterno_U.charAt(0);
    }
    return res;
  }

  function getNombreUser() {
    let res = "";
    if (datosUser) {
      res = datosUser.Nombre_U + " " + datosUser.Apellido_Paterno_U + " " + datosUser.Apellido_Materno_U;
    }
    return res;
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

  const listarLibresMateria = (grupo, agregar) => {
    console.log("agregarmat", grupo, agregar);
    if (agregar) {
      let listaNueva = [...misLibresSel, grupo];
      console.log("nuevolibre....", listaNueva);
      setMisLibresSel(listaNueva);
    } else {
      let listaNueva = misLibresSel.filter(dato => dato !== grupo);
      console.log("nuevolibre....", listaNueva);
      setMisLibresSel(listaNueva);
    }
  }
  const eliminarMateriasDocentes = async () => {
    //await axios.put("/api/desasignar/"+id+"/"+misGruposSel[0].SisM_M+"/"+misGruposSel[0].Grupo_UM, null);
    Swal.fire({
      title: '¿Esta seguro de desasignar '+misGruposSel.length+' materias?',
      text: "Se desasignará las materias seleccionadas al docente: "+getNombreUser(),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarMateriasDocBD();
      }
    })

    //listarGruposMateria();
    //listarLibresMateria();
  }

  const eliminarMateriasDocBD = async () =>{
    let error = false;
    for (let i = 0; i <misGruposSel.length&&!error; i++) {
      try{
        await axios.patch("/api/desasignar/" + id + "/" + misGruposSel[i].Codigo_M + "/" + misGruposSel[i].Grupo_UM, null);
      }catch(e){
        error = true;
      }
    }

    if(error){
      Swal.fire(
        'Error',
        'Algo salió mal',
        'error'
      )
    }else{
      Swal.fire(
        'Éxito',
        'Se desasignaron las materias con éxito',
        'success'
      )
      
      recuperarMateriasLibres();
      recuperarMateriasDocente();
    }
  }

  const agregarMateriasDocentes = () => {
    
    Swal.fire({
      title: '¿Esta seguro de agregar '+misLibresSel.length+' materias?',
      text: "Se agregará las materias seleccionadas al docente: "+getNombreUser(),
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí',
      cancelButtonText: 'No'
    }).then((result) => {
      if (result.isConfirmed) {
        agregarMatDocBD();
      }
    })
    //listarLibresMateria();
    //listarGruposMateria();
  }

  const agregarMatDocBD = async ()=>{
    let error = false;
    for (let i = 0; i < misLibresSel.length&&!error; i++) {
      try{
        await axios.patch("/api/asignar/" + id + "/" + misLibresSel[i].Codigo_M + "/" + misLibresSel[i].Id_G, null);
      }catch(e){
        error = true;
      }
    }

    if(error){
      Swal.fire(
        'Error',
        'Algo salió mal',
        'error'
      )
    }else{
      Swal.fire(
        'Éxito',
        'Se agregaron las materias con éxito',
        'success'
      )
      recuperarMateriasDocente();
      recuperarMateriasLibres();

    }
    
  }

  return (
    <div>
      <MenuAdmin />
      <div className='bg-dark text-white'>
        <div className='contenedortotaldatos'>
          <div className="letraUser izquierda">
            {concatenarIniciales()}
          </div>
          <div className='derecha'>
            <div className="nombreUser">{getNombreUser()}</div>
            <div className="codSisUser">{id}</div>
          </div>
        </div>

      </div>
      <nav>
        <div className="nav nav-tabs bg-dark" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Añadir Materias</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Eliminar Materias</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          {misLibresSel.length} materias seleccionadas
          <div className="card p-2 text-white bg-secondary mb-3">
            {gruposLibres.map((e, indice) =>
              <div key={e.Codigo_M + "-" + e.Id_G}>
                <div className="form-check">
                  <input className="form-check-input" onChange={(objeto) => listarLibresMateria(e, objeto.target.checked)} type="checkbox" id={e.Codigo_M + "-" + e.Id_G} />
                  <label className="form-check-label" htmlFor={e.Codigo_M + "-" + e.Id_G}>
                    {e.Id_G + " - " + e.Nombre_M}
                  </label>
                </div>
              </div>
            )}
          </div>
          <button type="button" className="btn btn-primary" onClick={() => agregarMateriasDocentes()}>Añadir materias</button>
        </div>
        <div className="tab-pane fade p-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          {misGruposSel.length} materias seleccionadas
          <div className="card p-2 text-white bg-secondary mb-3">
            {listaMD.map((e, indice) =>
              <div key={e.Codigo_M + "-" + e.Grupo_UM}>
                <div className="form-check">
                  <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={e.Codigo_M + "-" + e.Grupo_UM} />
                  <label className="form-check-label" htmlFor={e.Codigo_M + "-" + e.Grupo_UM}>
                    {e.Grupo_UM + " - " + e.Nombre_M}
                  </label>
                </div>
              </div>
            )}
          </div>
          <button type="button" className="btn btn-primary" onClick={() => eliminarMateriasDocentes()}>Eliminar materias</button>
        </div>
      </div>
    </div>

  )
}
