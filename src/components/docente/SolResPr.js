import React from "react";
import MenuDoc from "./MenuDoc";
import DatosApp from "./DatosApp";
import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
//import "bootstrap/js/src/collapse.js"
import { parse, isFuture, isToday } from 'date-fns'
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function SolResPr() {

  const navigate = useNavigate();

  const horarios = DatosApp.getHorarios();
  const horariosFin = DatosApp.getHorariosFin();

  const [listaME, setListaME] = useState([]);
  const [listMateria, setListMateria] = useState([]);
  const [numEst, setNumEst] = useState(1);
  const [fechaR, setFechaR] = useState("");
  const [horarioR, setHorarioR] = useState("6:45");
  //const [horarioRFin, setHorarioRFin] = useState("8:15");
  const [perR, setPerR] = useState(1);
  const [motivoR, setMotivoR] = useState("");

  const [listaPeriodos, setListaPeriodos] = useState([1, 2, 3, 4, 5, 6]);
  //const ruta = "http://127.0.0.1:8000/api/materias/201801450";
  //const rutaMatGrupo = "http://127.0.0.1:8000/api/grupos/201801450/";

  const [datosUser, setDatosUser] = useState(null);
  const [codMateriaActual, setCodigoMateriaActual] = useState(null);
  const [misGruposSel, setMisGruposSel] = useState([]);
  const [gruposAdjuntos, setGruposAdjuntos] = useState([]);
  const [misAdjuntosSel, setMisAdjuntosSel] = useState([]);
  
  //horario
  var horariofin = "7:30";
  const [iniPer, setIniPer] = useState(null);
  const [finPer, setFinPer] = useState(null)

  useEffect(() => {
    console.log("se ejecuta efect");
    const datosRecup = localStorage.getItem("datosUser");
    console.log(datosRecup);
    if (datosRecup) {
      let nuevoDato = JSON.parse(datosRecup);
      //console.log(nuevoDato);
      setDatosUser(nuevoDato);
      recuperarMateriaDoc(nuevoDato.codigosis);
      recupPeriodo();
      
    }
  }, []);

  const recupPeriodo = async()=>{
    let periodo = await (await axios.get("/api/obtenerPeriodoAcademico")).data;
    //console.log(periodo.data)
    setIniPer(periodo.Fecha_Inicio_PA)
    setFinPer(periodo.Fecha_Fin_PA)
  }

  const recuperarMateriaDoc = async (codigosis) => {
    let v = await axios.get("/api/materias/" + codigosis);
    setListMateria(v.data);
    console.log(v.data);
  };

  const recuperarGrupoMateria = async (id) => {
    setCodigoMateriaActual(id);
    console.log("matidsisiss", codMateriaActual);
    let rutanueva = "/api/grupos/" + datosUser.codigosis + "/" + id;
    let grupos = await axios.get(rutanueva);
    setListaME(grupos.data);
    setMisGruposSel([]);
    console.log(grupos.data);
    recuperarGruposAdjuntos(id);
  };

  const recuperarGruposAdjuntos = async (idmat) => {
    let rutaGA = "/api/gruposCompartida/" + datosUser.codigosis + "/" + idmat;
    console.log("peticion adjunto", rutaGA);
    let adjuntos = await axios.get(rutaGA);
    console.log("adjuntos", adjuntos.data);
    setGruposAdjuntos(adjuntos.data);
  };

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
        return e.Grupo_UM + "-" + e.Nombre_M;
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
  const generarHorario = (horaini, periodos) => {
    /*console.log("cambio de horario tile", horaini, periodos)
        let indice = horarios.indexOf(horaini);
        //console.log("horarios.............", periodos);
        let nuevi = indice+Number(periodos)-1;
        console.log(indice, periodos)
        console.log("nuevoindi.......................", nuevi)
        let horafinal = horariosFin[nuevi];
        setHorarioRFin(horafinal);*/
  };

  const hacerAccion = (e) => {
    e.preventDefault();

    if (!!numEst && esNumeroValido && !!fechaR && esFechaValida && !!motivoR && misGruposSel.length > 0) {

      console.log("----------------")
      console.log("AdjSel", misAdjuntosSel);
      console.log("AdjTotal", gruposAdjuntos);

      let listaDocReserva = [];//[datosUser.codigosis];

      for (let k = 0; k < misGruposSel.length; k++) {
        listaDocReserva.push(datosUser.codigosis);
      }

      for (let k = 0; k < misAdjuntosSel.length; k++) {
        listaDocReserva.push(misAdjuntosSel[k].Codigo_SIS_U);
      }


      console.log("docentes que se agregan:", listaDocReserva);
      let docListaFinal = listaDocReserva;
      /*let docListaFinal = listaDocReserva.filter((item, index) => {
          return listaDocReserva.indexOf(item) === index;
      });*/

      console.log("docente que se agregan sin repetir", docListaFinal);

      let gruposEnviar = [];
      for (let x = 0; x < misGruposSel.length; x++) {
        gruposEnviar.push(misGruposSel[x].Grupo_UM);
      }

      for (let y = 0; y < misAdjuntosSel.length; y++) {
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
    } else {
      //alert("Hay errores en uno o mas campos, y/o uno o mas campos estan vacios, por favor verificar")
      Swal.fire(
        'Error',
        'Hay errores y/o existen campos vacíos',
        'error'
      )
    }

  }

  function redireccionarReserva(){
    navigate("/docente/mis-reservas")
  }

  const registrarSolicitudReserva = async (valor) => {
    let error = false;
    try {
      const ruta = "/api/reservaCompartida";
      await axios.post(ruta, valor);
    }catch (e) {
      error = true;
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
        'Se envió la solicitud correctamente',
        'success'
      )
      
      navigate("/docente/mis-reservas")

    }

  };

  const listarGruposMateria = (grupo, agregar) => {
    console.log("agregarmat", grupo, agregar);
    if (agregar) {
      let listaNueva = [...misGruposSel, grupo];
      console.log(listaNueva);
      setMisGruposSel(listaNueva);
    } else {
      let listaNueva = misGruposSel.filter((dato) => dato !== grupo);
      console.log(listaNueva);
      setMisGruposSel(listaNueva);
    }
  };

  const listarAdjuntosMateria = (grupo, agregar) => {
    console.log("agregarmatadunta", grupo, agregar);
    if (agregar) {
      let listaNueva = [...misAdjuntosSel, grupo];
      console.log(listaNueva);
      setMisAdjuntosSel(listaNueva);
    } else {
      let listaNueva = misAdjuntosSel.filter((dato) => dato !== grupo);
      console.log(listaNueva);
      setMisAdjuntosSel(listaNueva);
    }
  };

  const insertarHorarioMateria = (e) => {
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
    if (indice === horarios.length - 1) {
      setListaPeriodos([1]);
      setPerR(1);
      //generarHorario(horarioR, 1)
    } else if (indice === horarios.length - 2) {
      setListaPeriodos([1, 2]);
      if (Number(perR) === 3) {
        setPerR(1);
        //generarHorario(horarioR, 1)
      }
      //generarHorario(horarioR, perR)
    }else if (indice === horarios.length - 3) {
      setListaPeriodos([1, 2, 3]);
      if (Number(perR) === 3) {
        setPerR(1);
        //generarHorario(horarioR, 1)
      }
      //generarHorario(horarioR, perR)
    }else if (indice === horarios.length - 4) {
      setListaPeriodos([1, 2, 3, 4]);
      if (Number(perR) === 3) {
        setPerR(1);
        //generarHorario(horarioR, 1)
      }
      //generarHorario(horarioR, perR)
    }else if (indice === horarios.length - 5) {
      setListaPeriodos([1, 2, 3, 4, 5]);
      if (Number(perR) === 3) {
        setPerR(1);
        //generarHorario(horarioR, 1)
      }
      //generarHorario(horarioR, perR)
    } else if (indice >= 0) {
      setListaPeriodos([1, 2, 3, 4, 5, 6]);
      //generarHorario(horarioR, perR)
    }
  };

  const insertarPerdiodoNuevo = (e) => {
    console.log("insertamosper", e);
    setPerR(e);

    /*let indice = horarios.indexOf(horarioR);
        let nuevi = indice+e-1;
        if(nuevi>=0&&nuevi<=9){
            let horafinal = horariosFin[nuevi];
            setHorarioRFin(horafinal);
        }*/
    //setPerR(e);
    //generarHorario(horarioR, e);
  };

  const concatHorario = (horainicial, per) => {
    var res = "";
    let indice = horarios.indexOf(horainicial);
    //console.log("horarios.............", periodos);
    let nuevi = indice + per - 1;
    if (nuevi >= 0 && nuevi <= horarios.length) {
      let horafinal = horariosFin[nuevi];
      horariofin = horafinal;
      res = horainicial + " - " + horafinal
    }

    return res;
  }

  const esNumeroValido = useMemo(() => {
    return numEst.toString().length == 0 || /^([1-9]\d*(\.\d*[1-9][0-9])?)|(0\.\d*[1-9][0-9])|(0\.\d*[1-9])$/.test(numEst);
  }, [numEst])

  const esFechaValida = useMemo(() => {
    console.log('fechaR', fechaR);
    console.log('!fechaR', !fechaR);
    const fechaObjeto = parse(fechaR, 'yyyy-MM-dd', new Date())
    console.log('fechaobjeto', fechaObjeto);
    return !fechaR || isFuture(fechaObjeto) || isToday(fechaObjeto);
  }, [fechaR])
  return (
    <div>
      <MenuDoc />
      <Form onSubmit={(e) => hacerAccion(e)} className="p-3">
        <div className="row">
          <div className="col">
            <div className="mb-3">
              Materia:
              <select
                onChange={(e) => agregarME(e)}
                defaultValue={"DEFAULT"}
                className="form-select"
                aria-label="Default select example"
              >
                <option value="DEFAULT" disabled>
                  Selecciona la materia
                </option>
                {listMateria.map((e, indice) => (
                  <option key={indice} value={e.Codigo_M}>
                    {e.Grupo_UM} - {e.Nombre_M}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="col">
            <div className="materiasAdd">
              {" "}
              Grupos...
              <div className="card p-2" style={{ minHeight: "50px" }}>
                {listaME.map((e, indice) => (
                  <div key={codMateriaActual + "-" + e.Grupo_UM}>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        onChange={(objeto) =>
                          listarGruposMateria(e, objeto.target.checked)
                        }
                        type="checkbox"
                        id={codMateriaActual + "-" + e.Grupo_UM}
                      />
                      <label
                        className="form-check-label"
                        htmlFor={codMateriaActual + "-" + e.Grupo_UM}
                      >
                        {e.Grupo_UM}
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col mb-3">
            <div className="row">
              <div className="col mb-3">
                <Form.Group>
                  <Form.Label>Numero de estudiantes</Form.Label>
                  <Form.Control
                    value={numEst}
                    onChange={(e) => setNumEst(e.target.value)}
                    isInvalid={!esNumeroValido}

                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese un número válido
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
              <div className="col mb-3">
                <Form.Group>
                  <Form.Label>Fecha</Form.Label>
                  <Form.Control
                    value={fechaR}
                    onChange={(e) => setFechaR(e.target.value)}
                    isInvalid={!esFechaValida}
                    type="date"
                    max={finPer}
                    min={iniPer}

                  />
                  <Form.Control.Feedback type="invalid">
                    Ingrese una fecha válida
                  </Form.Control.Feedback>
                </Form.Group>
              </div>
            </div>

            <div className="row">
              <div className="col mb-3">
                Hora Inicio
                <select
                  defaultValue={"DEFAULT"}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) => insertarHorarioMateria(e.target.value)}
                >
                  {horarios.map((e, indice) => (
                    <option key={e} value={e}>
                      {e}
                    </option>
                  ))}
                </select>
                <div className="py-3">
                  <h5>Horario:</h5>
                  <p>{concatHorario(horarioR, perR)}</p>
                </div>
              </div>
              <div className="col mb-3">
                Periodo
                <select
                  defaultValue={"DEFAULT"}
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    insertarPerdiodoNuevo(Number(e.target.value))
                  }
                >
                  {listaPeriodos.map((e) => {
                    return (
                      <option key={e} value={e}>
                        {e}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="col mb-3">
            <div>
              <div className="mb-2">Agregar adjunto:</div>
              <button
                className="btn btn-primary"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#collapseExample"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                Mostrar grupos
              </button>
              <div className="collapse" id="collapseExample">
                <div className="card">
                  <div className="px-2" style={{ minHeight: "50px" }}>
                    {gruposAdjuntos.map((e, indice) => (
                      <div key={codMateriaActual + "-" + e.Grupo_UM}>
                        <div className="form-check">
                          <input
                            className="form-check-input"
                            onChange={(objeto) =>
                              listarAdjuntosMateria(e, objeto.target.checked)
                            }
                            type="checkbox"
                            id={codMateriaActual + "-" + e.Grupo_UM}
                          />
                          <label
                            className="form-check-label"
                            htmlFor={codMateriaActual + "-" + e.Grupo_UM}
                          >
                            {e.Grupo_UM +
                              " - " +
                              e.Nombre_U +
                              " " +
                              e.Apellido_Paterno_U +
                              " " +
                              e.Apellido_Materno_U }
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">Motivo</label>
          <textarea maxLength={200} onChange={(e) => setMotivoR(e.target.value)} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          <div id="emailHelp" class="form-text">{motivoR.length} caracteres</div>
        </div>

        <button type="button" className="btn btn-danger" onClick={()=>redireccionarReserva()}>
          Cancelar
        </button>
        <button type="submit" className="btn btn-primary">
          Enviar solicitud
        </button>
      </Form>
    </div>
  );
}
