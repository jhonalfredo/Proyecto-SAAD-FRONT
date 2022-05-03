import React from 'react'
import MenuDoc from './MenuDoc'
import DatosApp from './DatosApp';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DocSolReserva() {
    const horarios = DatosApp.getHorarios();

    const [listaME, setListaME] = useState([]);
    const [listMateria, setListMateria] = useState([]);
    const [numEst, setNumEst] = useState(0);
    const [fechaR, setFechaR] = useState("");
    const [horarioR, setHorarioR] = useState("6:45");
    const [perR, setPerR] = useState(1);

    //const ruta = "http://127.0.0.1:8000/api/materias/201801450";
    //const rutaMatGrupo = "http://127.0.0.1:8000/api/grupos/201801450/";

    const [datosUser, setDatosUser] = useState(null);
    const [codMateriaActual, setCodigoMateriaActual] = useState();
    const [misGruposSel, setMisGruposSel] = useState([]);

    useEffect(() => {
        console.log("se ejecuta efect");
        const datosRecup = localStorage.getItem("datosUser");
        console.log(datosRecup);
        if (datosRecup) {
            let nuevoDato = JSON.parse(datosRecup);
            //console.log(nuevoDato);
            setDatosUser(nuevoDato);
            recuperarMateriaDoc(nuevoDato.codigosis);
        }
    }, []);

    const recuperarMateriaDoc = async (codigosis) => {
        let v = await axios.get("/api/materias/"+codigosis);
        setListMateria(v.data);
        console.log(v.data);
    }

    const recuperarGrupoMateria = async (id) => {
        setCodigoMateriaActual(id);
        console.log("matidsisiss", codMateriaActual);
        let rutanueva = "/api/grupos/"+datosUser.codigosis+"/"+ id;
        let grupos = await axios.get(rutanueva);
        setListaME(grupos.data);
        setMisGruposSel([]);
        console.log(grupos.data);
    }

    function agregarME(valor) {
        console.log(valor.target.value);
        recuperarGrupoMateria(valor.target.value);
        //var elemento = listMateria[indice];
        //console.log(elemento);
        /*var elemento = valor.target.value;
        if (!listaME.includes(elemento)) {
            console.log("adddd", elemento);
            var listaNueva = [...listaME, elemento];
            console.log(listaNueva)
            setListaME(listaNueva);
        }*/



        //console.log("add", indice.target.value)
    }

    function eliminarME(elemento) {
        var listaNueva = listaME.filter(dato => dato !== elemento);
        setListaME(listaNueva);
    }

    function unirPalabras(e) {
        return e.Nume_G + "-" + e.Nomb_M;
    }

    function enviarDatos() {
        var datosEnviar = {
            numero: numEst,
            lista: listaME,
            fecha: fechaR,
            hora: horarioR,
            periodos: perR
        }

        console.log("numest", datosEnviar);
    }
    const hacerAccion = (e) => {
        e.preventDefault();
        var datosEnviar = {
            numero: numEst,
            lista: listaME,
            fecha: fechaR,
            hora: horarioR,
            periodos: perR
        }
        console.log("numest", datosEnviar);
        var datosNuevos = {
            docentes: [199505412, 201801450, 200000548],
            materia_SisM_M: 2016049,
            grupos: ["F1", "H1", "N1", "F3"],
            Fecha_SR: "2022-06-06",
            Hora_Inicio_SR: "14:15",
            Cantidad_Periodos_SR: 2,
            Numero_Estudiantes_SR: 250,
            Estado_Atendido_SR: 0,
            Motivo_SR: "SI hay motivo fdsajfd asjd fajjas d",
            Hora_Final_SR: "17:15"
        }
        registrarSolicitudReserva(datosNuevos);
    }

    const registrarSolicitudReserva = async(valor) =>{
        const ruta = "http://127.0.0.1:8000/api/reservaCompartida";
        await axios.post(ruta, valor);
    }
    
    const listarGruposMateria = (grupo, agregar)=>{
        console.log("agregarmat", grupo, agregar);
        if(agregar){
            let listaNueva = [...misGruposSel, grupo];
            console.log(listaNueva);
            setMisGruposSel(listaNueva);
        }else{
            let listaNueva = listaME.filter(dato => dato !== grupo);
            console.log(listaNueva);
            setMisGruposSel(listaNueva);
        }
    }

    return (
        <div>
            <MenuDoc />
            <h1>Solicitar</h1>
            <form onSubmit={(e) => hacerAccion(e)} className="p-3">

                <div className="row">
                    <div className="col">
                        <div className="mb-3">Materia:
                            <select onChange={(e) => agregarME(e)} defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example">
                                <option value="DEFAULT" disabled>Selecciona la materia</option>
                                {listMateria.map((e, indice) =>
                                    <option key={indice} value={e.SisM_M}>{e.Nume_G} - {e.Nomb_M}</option>
                                )}
                            </select>
                        </div>
                    </div>

                    <div className="col">
                        <div className="materiasAdd"> Grupos...
                            <div className='card px-1' style={{minHeight: "50px"}}>
                                {listaME.map((e, indice) =>
                                    <div key={codMateriaActual+"-"+e.Grupo_UM}>
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={(objeto)=>listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={codMateriaActual+"-"+e.Grupo_UM}/>
                                            <label className="form-check-label" htmlFor={codMateriaActual+"-"+e.Grupo_UM}>
                                                {e.Grupo_UM}
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>





                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label">Numero de estudiantes</label>
                    <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setNumEst(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaReserva" className="form-label">Fecha</label>
                    <input type="date" className="form-control" id="fechaReserva" aria-describedby="fechaReserva" onChange={(e) => setFechaR(e.target.value)} />
                </div>
                <div className="mb-3">
                    <select defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example" onChange={(e) => setHorarioR(e.target.value)}>
                        {horarios.map((e, indice) =>
                            <option key={indice} value={e}>{e}</option>
                        )}
                    </select>
                </div>
                <div className="mb-3">
                    <select defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example" onChange={(e) => setPerR(e.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                    </select>
                    <div className="form-text">6:45 - 15:15</div>
                </div>
                <button type="submit" className="btn btn-primary">Solicitar</button>

            </form>
        </div>
    )
}
