import React from 'react'
import MenuAdmin from './MenuAdmin'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    const rutainicio = "/api/obtenerGruposDocentes/" + id;
    let v = await axios.get(rutainicio);
    console.log("materiasdoc________________",v.data);
    //console.log("unicaaaaa", v.data[0]);
    setlistaMD(v.data);
  }

  const recuperarMateriasLibres = async () => {
    const rutainicio = "/api/gruposParaAsignar";
    let v = await axios.get(rutainicio);
    console.log("gruposlibres___________________________________",v.data);
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
      console.log("nuevolibre....",listaNueva);
      setMisLibresSel(listaNueva);
    }
  }
  const eliminarMateriasDocentes = async () => {
    //await axios.put("/api/desasignar/"+id+"/"+misGruposSel[0].SisM_M+"/"+misGruposSel[0].Grupo_UM, null);
    for (let i = 0; i < misGruposSel.length; i++) {
      await axios.put("/api/desasignar/" + id + "/" + misGruposSel[i].Codigo_M + "/" + misGruposSel[i].Grupo_UM, null);
    }

    //listarGruposMateria();
    //listarLibresMateria();
  }

  const agregarMateriasDocentes = async() =>{
    for (let i = 0; i < misLibresSel.length; i++) {
      await axios.put("/api/asignar/" + id + "/" + misLibresSel[i].Codigo_M + "/" + misLibresSel[i].Id_G, null);
    }

    //listarLibresMateria();
    //listarGruposMateria();

  }

  return (
    <div>
      <MenuAdmin />
      <div>
        <div className='contenedortotaldatos'>
          <div className="letraUser izquierda">
            {concatenarIniciales()}
          </div>
          <div className='derecha'>
            <di className="nombreUser">{getNombreUser()}</di>
            <div className="codSisUser">{id}</div>
          </div>
        </div>

      </div>
      <nav>
        <div className="nav nav-tabs" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Añador Materias</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Eliminar Materias</button>
        </div>
      </nav>
      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
          {misGruposSel.length} materias seleccionadas
          {gruposLibres.map((e, indice) =>
            <div key={e.Codigo_UM + "-" + e.Id_G}>
              <div className="form-check">
                <input className="form-check-input" onChange={(objeto) => listarLibresMateria(e, objeto.target.checked)} type="checkbox" id={e.Codigo_UM + "-" + e.Id_G} />
                <label className="form-check-label" htmlFor={e.Codigo_UM + "-" + e.Id_G}>
                  {e.Id_G + " - " + e.Nombre_M}
                </label>
              </div>
            </div>
          )}
          <button type="button" className="btn btn-primary" onClick={() => agregarMateriasDocentes()}>Añadir materias</button>
        </div>
        <div className="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
          {misGruposSel.length} materias seleccionadas
          {listaMD.map((e, indice) =>
            <div key={e.Codigo_UM + "-" + e.Grupo_UM}>
              <div className="form-check">
                <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={e.Codigo_UM + "-" + e.Grupo_UM} />
                <label className="form-check-label" htmlFor={e.Codigo_UM + "-" + e.Grupo_UM}>
                  {e.Grupo_UM + " - " + e.Nombre_M}
                </label>
              </div>
            </div>
          )}
          <button type="button" className="btn btn-primary" onClick={() => eliminarMateriasDocentes()}>Eliminar materias</button>
        </div>
      </div>
    </div>

  )
}
