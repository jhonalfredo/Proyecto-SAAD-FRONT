import React from 'react'
import MenuDoc from './MenuDoc'
import DatosApp from './DatosApp';
import { useState, useEffect } from 'react';
import axios from 'axios';
//import "bootstrap/js/src/collapse.js"

export default function DocSolReserva() {
    const horarios = DatosApp.getHorarios();
    const horariosFin = DatosApp.getHorariosFin();

    const [listaME, setListaME] = useState([]);
    const [listMateria, setListMateria] = useState([]);
    const [numEst, setNumEst] = useState(0);
    const [fechaR, setFechaR] = useState("");
    const [horarioR, setHorarioR] = useState("6:45");
    //const [horarioRFin, setHorarioRFin] = useState("8:15");
    const [perR, setPerR] = useState(1);
    const [motivoR, setMotivoR] = useState("");

    const [listaPeriodos, setListaPeriodos] = useState([1,2,3]);
    //const ruta = "http://127.0.0.1:8000/api/materias/201801450";
    //const rutaMatGrupo = "http://127.0.0.1:8000/api/grupos/201801450/";

    const [datosUser, setDatosUser] = useState(null);
    const [codMateriaActual, setCodigoMateriaActual] = useState(null);
    const [misGruposSel, setMisGruposSel] = useState([]);
    const [gruposAdjuntos, setGruposAdjuntos] = useState([]);
    const [misAdjuntosSel, setMisAdjuntosSel] = useState([]);
    //horario
    var horariofin = "8:15";


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
        let v = await axios.get("/api/materias/" + codigosis);
        setListMateria(v.data);
        console.log(v.data);
    }

    const recuperarGrupoMateria = async (id) => {
        setCodigoMateriaActual(id);
        console.log("matidsisiss", codMateriaActual);
        let rutanueva = "/api/grupos/" + datosUser.codigosis + "/" + id;
        let grupos = await axios.get(rutanueva);
        setListaME(grupos.data);
        setMisGruposSel([]);
        console.log(grupos.data);
        recuperarGruposAdjuntos(id);
    }

    const recuperarGruposAdjuntos = async (idmat) => {
        let rutaGA = "/api/gruposCompartida/" + datosUser.codigosis + "/" + idmat;
        console.log("peticion adjunto", rutaGA)
        let adjuntos = await axios.get(rutaGA);
        console.log("adjuntos", adjuntos.data);
        setGruposAdjuntos(adjuntos.data);
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
/*
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
*/
    const generarHorario = (horaini, periodos)=>{
        /*console.log("cambio de horario tile", horaini, periodos)
        let indice = horarios.indexOf(horaini);
        //console.log("horarios.............", periodos);
        let nuevi = indice+Number(periodos)-1;
        console.log(indice, periodos)
        console.log("nuevoindi.......................", nuevi)
        let horafinal = horariosFin[nuevi];
        setHorarioRFin(horafinal);*/
    }

    const hacerAccion = (e) => {
        e.preventDefault();

        console.log("----------------")
        console.log("AdjSel", misAdjuntosSel);
        console.log("AdjTotal", gruposAdjuntos);

        let listaDocReserva = [datosUser.codigosis];

        for(let k = 0; k< misAdjuntosSel.length; k++){
            listaDocReserva.push(misAdjuntosSel[k].Codigo_SIS_U);
        }

        
        console.log("docentes que se agregan:", listaDocReserva);
        let docListaFinal = listaDocReserva.filter((item,index)=>{
            return listaDocReserva.indexOf(item) === index;
        });

        console.log("docente que se agregan sin repetir", docListaFinal);

        let gruposEnviar = [];
        for(let x = 0;x<misGruposSel.length;x++){
            gruposEnviar.push(misGruposSel[x].Grupo_UM);
        }

        for(let y=0;y<misAdjuntosSel.length;y++){
            gruposEnviar.push(misAdjuntosSel[y].Grupo_UM);
        }

        console.log("grupos:::::::", gruposEnviar);
        console.log("fecha::::::", fechaR);
        console.log("horaini::::::", horarioR);


        var datosEnviar = {
            docentes: docListaFinal,
            materia_SisM_M: codMateriaActual,
            grupos: gruposEnviar,
            Fecha_SR: fechaR,
            Hora_Inicio_SR: horarioR,
            Cantidad_Periodos_SR: Number(perR),
            Numero_Estudiantes_SR: numEst,
            Estado_Atendido_SR: 0,
            Motivo_SR: motivoR,
            Hora_Final_SR: horariofin
        }
        console.log("datos que se enviarán", datosEnviar);
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
        console.log("ejemplo datos", datosNuevos);
        
        //registrarSolicitudReserva(datosNuevos);

        registrarSolicitudReserva(datosEnviar);
    }

    const registrarSolicitudReserva = async (valor) => {
        const ruta = "/api/reservaCompartida";
        await axios.post(ruta, valor);
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

    const listarAdjuntosMateria = (grupo, agregar) => {
        console.log("agregarmatadunta", grupo, agregar);
        if (agregar) {
            let listaNueva = [...misAdjuntosSel, grupo];
            console.log(listaNueva);
            setMisAdjuntosSel(listaNueva);
        } else {
            let listaNueva = misAdjuntosSel.filter(dato => dato !== grupo);
            console.log(listaNueva);
            setMisAdjuntosSel(listaNueva);
        }
    }

    const insertarHorarioMateria = (e) =>{
        console.log("insertamosfront", e);
        setHorarioR(e);
        
        /*let indice = horarios.indexOf(e);
        let nuevi = indice+perR-1;
        if(nuevi>=0&&nuevi<=9){
            let horafinal = horariosFin[nuevi];
            setHorarioRFin(horafinal);
        }*/
        
        

        ///console.log("indice", horarios.indexOf(e));
        let indice = horarios.indexOf(e);
        //setHorarioR(e)
        if(indice===9){
            setListaPeriodos([1]);
            setPerR(1);
            //generarHorario(horarioR, 1)
        }else if(indice===8){
            setListaPeriodos([1,2]);
            if(Number(perR)===3){
                setPerR(1);
                //generarHorario(horarioR, 1)
            }
            //generarHorario(horarioR, perR)
            
        }else if(indice>=0){
            setListaPeriodos([1,2,3])
            //generarHorario(horarioR, perR)
        }
    }

    const insertarPerdiodoNuevo = (e) =>{
        console.log("insertamosper", e)
        setPerR(e);
        
        /*let indice = horarios.indexOf(horarioR);
        let nuevi = indice+e-1;
        if(nuevi>=0&&nuevi<=9){
            let horafinal = horariosFin[nuevi];
            setHorarioRFin(horafinal);
        }*/
        //setPerR(e);
        //generarHorario(horarioR, e);
    }

    const concatHorario = (horainicial, per) =>{
        var res = "";
        let indice = horarios.indexOf(horainicial);
        //console.log("horarios.............", periodos);
        let nuevi = indice+per-1;
        if(nuevi>=0&&nuevi<=9){
            let horafinal = horariosFin[nuevi];
            horariofin = horafinal;
            res = horainicial+" - "+horafinal
        }

        return res;
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
                            <div className='card px-1' style={{ minHeight: "50px" }}>
                                {listaME.map((e, indice) =>
                                    <div key={codMateriaActual + "-" + e.Grupo_UM}>
                                        <div className="form-check">
                                            <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={codMateriaActual + "-" + e.Grupo_UM} />
                                            <label className="form-check-label" htmlFor={codMateriaActual + "-" + e.Grupo_UM}>
                                                {e.Grupo_UM}
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                </div>

                <div className="row">
                    <div className='col mb-3'>
                        <div className="row">
                            <div className="col mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Numero de estudiantes</label>
                                <input type="number" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setNumEst(e.target.value)} />
                            </div>
                            <div className="col mb-3">
                                <label htmlFor="fechaReserva" className="form-label">Fecha</label>
                                <input type="date" className="form-control" id="fechaReserva" aria-describedby="fechaReserva" onChange={(e) => setFechaR(e.target.value)} />
                            </div>
                        </div>

                        <div className="row">
                            <div className="col mb-3">
                                <select defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example" onChange={(e) => insertarHorarioMateria(e.target.value)}>
                                    {horarios.map((e, indice) =>
                                        <option key={e} value={e}>{e}</option>
                                    )}
                                </select>
                                <div className='py-3'><h5>Horario:</h5><p>{concatHorario(horarioR, perR)}</p></div>
                            </div>
                            <div className="col mb-3">
                                <select defaultValue={'DEFAULT'} className="form-select" aria-label="Default select example" onChange={(e) => insertarPerdiodoNuevo(Number(e.target.value))}>
                                    {
                                        
                                    listaPeriodos.map((e)=>{
                                        return <option key ={e} value={e}>{e}</option>
                                    })}
                                </select>
                                
                            </div>
                        </div>

                    </div>

                   

                    <div className="col mb-3">
                        <div>
                            <div className='mb-2'>
                                Agregar adjunto:
                            </div>
                            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                                Mostrar grupos
                            </button>
                            <div className="collapse" id="collapseExample">
                                <div className="card card-body">
                                    <div className='card px-1' style={{ minHeight: "50px" }}>
                                        {gruposAdjuntos.map((e, indice) =>
                                            <div key={codMateriaActual + "-" + e.Grupo_UM}>
                                                <div className="form-check">
                                                    <input className="form-check-input" onChange={(objeto) => listarAdjuntosMateria(e, objeto.target.checked)} type="checkbox" id={codMateriaActual + "-" + e.Grupo_UM} />
                                                    <label className="form-check-label" htmlFor={codMateriaActual + "-" + e.Grupo_UM}>
                                                        {e.Grupo_UM+" - "+e.Nombre_U+" "+e.Apelllido_Paterno_U+" "+e.Apellido_Materno_U+" - "+e.Codigo_SIS_U}
                                                    </label>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="exampleFormControlTextarea1" className="form-label">Motivo</label>
                    <textarea onChange={(e)=>setMotivoR(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                </div>

                <button type="button" className="btn btn-danger">Cancelar</button>
                <button type="submit" className="btn btn-primary">Solicitar</button>

            </form>
        </div>
    )
}
