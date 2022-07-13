import axios from 'axios';
import { Button } from 'bootstrap';
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import DatosApp from '../docente/DatosApp';

export default function FormAcepRecSolDoc(props) {
    const [aulasSel, setAulasSel] = useState([]);
    const [observacionR, setObservacionR] = useState("Ninguna");
    const [totalSumAulas, setTotalSumAulas] = useState(0);
    const [errorObs, setErrorObs] = useState("");
    const navegar = useNavigate();

    function aceptarSolicitud() {
        setErrorObs("")

        if (totalSumAulas >= props.datos.detalle[0].Numero_Estudiantes_SR) {
            if (observacionR.length > 0) {
                const texto = localStorage.getItem("datosUser");
                const datosUser = JSON.parse(texto);
                const datos = {
                    aulas: aulasSel /* aulasSeleccionadas */,
                    observacion: observacionR /* observacion */,
                    idReserva: props.datos.detalle[0].Id_SR,
                    codSIS: datosUser.codigosis,
                    fechaReserva: props.datos.detalle[0].Fecha_SR,
                    horaInicio: props.datos.detalle[0].Hora_Inicio_SR,
                    periodos: props.datos.detalle[0].Cantidad_Periodos_SR,
                };
                console.log(datos);
                axios
                    .post("/api/aceptarSolicitud", datos)
                    .then((respuesta) => {
                        Swal.fire(
                            'Éxito',
                            'Se ha aceptado la solicitud correctamente',
                            'success'
                        )
                        navegar("/administrador/solicitudes");
                    }
                    )
                    .catch((error) => {
                        Swal.fire(
                            'Error',
                            'Algo salió mal durante el registro',
                            'error'
                        )
                    }
                    )

            } else {
                setErrorObs("Campo obligatorio")
            }
        } else {
            Swal.fire(
                'Error',
                'La capacidad de las aulas no son suficientes para aceptar la solicitud',
                'error'
            )
        }
    }
    function rechazarSolicitud() {
        Swal.fire({
            title: '¿Esta seguro de rechazar la solicitud de reserva?',
            
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí',
            cancelButtonText: 'No'
          }).then((result) => {
            if (result.isConfirmed) {
              rechazarSolicitudAccion();
            }
          })

        
    }

    function rechazarSolicitudAccion(){
        setErrorObs("");
        if (observacionR.length > 0) {
        const texto = localStorage.getItem("datosUser");
        const datosUser = JSON.parse(texto);
        const datos = {
            observacion: observacionR /* observacion */,
            idReserva: props.datos.detalle[0].Id_SR,
            codSIS: datosUser.codigosis,
        };
        axios
            .post("/api/rechazarSolicitud", datos)
            .then((respuesta) =>{
                Swal.fire(
                    'Éxito',
                    'Se ha rechazado la solicitud correctamente',
                    'success'
                );
                navegar("/administrador/solicitudes");
            }
            )
            .catch((error) =>
                Swal.fire(
                    'Error',
                    'Algo salió mal durante el registro',
                    'error'
                )
            );
                }else{
                    setErrorObs("Campo obligatorio")
                }
    }

    return (
        <div className='p-5'>

            {/*aulasSel.map((e) => {
                return (<div>{e}</div>)
            }
        )*/}
            <button className="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                Atender Solicitud
            </button>
            <div className="collapse" id="collapseExample">
                <div className="card card-body p-3">
                    {props.datos ? <SugerenciaAulas totalReq = {props.datos.detalle[0].Numero_Estudiantes_SR} datos={props.datos} setAulasSel={setAulasSel} setTotalSumAulas={setTotalSumAulas} /> : "cargando sugenrencias"}
                    <div className=''>
                        <label for="validationCustom03" class="form-label">Observación</label>
                        <textarea type="text" class="form-control" id="validationCustom03" required maxLength={500} value = {observacionR} onChange={(e) => setObservacionR(e.target.value)} />
                        <div className='pb-3' style={{ display: 'flex', justifyContent: 'left' }}>
                            <div id="emailHelp" class="form-text">{observacionR.length} caracteres</div>
                            <div className='px-3 form-text' style={{ color: "red" }}>
                                {errorObs}
                            </div>
                        </div>
                    </div>
                    <div>
                        <button className='btn btn-success' onClick={() => aceptarSolicitud()}>Aceptar</button>
                        <button className='btn btn-danger' onClick={() => rechazarSolicitud()}>Rechazar</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

//<form class="row g-3 needs-validation" novalidate onSubmit={(e) => { e.preventDefault() }}>

function SugerenciaAulas(props) {

    const [listaME, setListaMe] = useState([]);
    const [misGruposSel, setMisGruposSel] = useState([]);
    const [totalCap, setTotalCap] = useState(0);

    useEffect(() => {
        recuperarDatosReserva();
        //recuperarListas();
        //recuperarDatos();
    }, []);

    async function recuperarDatosReserva() {
        let horaInicio = props.datos.detalle[0].Hora_Inicio_SR;
        let separacion = horaInicio.split(":");
        let horaIni = separacion[0] + ":" + separacion[1];
        if (horaIni.charAt(0) === "0") {
            horaIni = horaIni.substring(1);
        }
        let periodosHora = props.datos.detalle[0].Cantidad_Periodos_SR;
        let posHrIni = DatosApp.getHorarios().indexOf(horaIni);
        let horafin = DatosApp.getHorariosFin()[posHrIni + periodosHora - 1]
        console.log(horaIni, periodosHora, horafin, DatosApp.getHorarios().indexOf(horaIni))
        recuperarDatos(props.datos.detalle[0].Fecha_SR, horaIni, horafin, periodosHora, posHrIni);
    }

    async function recuperarDatos(fecha, horaIni, horafin, periodosHora, posHrIni) {
        const numeroDia = new Date(fecha).getDay();
        console.log(numeroDia);
        const dias = [

            'LUNES',
            'MARTES',
            'MIERCOLES',
            'JUEVES',
            'VIERNES',
            'SABADO',
            'DOMINGO'
        ];

        const rutainicio = "/api/reservasAceptadas/" + fecha;//2022-03-25" //+ fecha;
        let reservasAceptadas = await axios.get(rutainicio);
        console.log(reservasAceptadas.data);
        const rutaHorarios = "/api/listarHorariosAulas/" + dias[numeroDia];//MARTES"//*ID:6*+dias[numeroDia];
        console.log("dia de la semana......", dias[numeroDia])
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
                //console.log("datooo", listaUnida[i][j])
                for (let k = 0; k < listaNecesitada.length; k++) {
                    console.log(listaUnida[i][j].Hora_Inicio_HL, "invluye", listaNecesitada[k])
                    if (listaUnida[i][j].Hora_Inicio_HL.includes(listaNecesitada[k])) {
                        console.log(listaUnida[i][j].Hora_Inicio_HL, "invluye", listaNecesitada[k])
                        contador = contador + 1;
                    }
                }
            }

            if (contador === listaNecesitada.length && !estaOcupada(reservasAceptadas.data, listaUnida[i][0].Id_A)) {
                //console.log("cumple:", listaUnida[i][0]);
                listaHab.push(listaUnida[i][0]);
            }
        }

        setListaMe(listaHab);

    }

    function estaOcupada(lista, idAula) {
        //console.log(lista[0].aula_Id_A, lista.length)
        let ocupada = false;
        for (let i = 0; i < lista.length; i++) {

            if (lista[i].aula_Id_A === idAula) {

                ocupada = true;
                console.log("ocupadoo.....", idAula)
            }
        }
        console.log("dfadfa ocupada....", ocupada, idAula);

        return ocupada;
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
            actualizarDatosSimples(listaNueva);

            let total = totalCap + grupo.Capacidad_A;
            setTotalCap(total);
            props.setTotalSumAulas(total);

        } else {
            let listaNueva = misGruposSel.filter(dato => dato !== grupo);
            console.log(listaNueva);
            setMisGruposSel(listaNueva);
            actualizarDatosSimples(listaNueva);

            let total = totalCap - grupo.Capacidad_A;
            setTotalCap(total);
            props.setTotalSumAulas(total);
        }
    }

    function actualizarDatosSimples(datos) {
        let lista = [];
        datos.forEach(e => {
            lista.push(e.Id_A);
        });
        props.setAulasSel(lista);
    }//[691A, ]

    return (
        <div className="">
            <div className='fw-bolder' >Sugerencia de Aulas</div>
            <div style={{color: totalCap>= props.totalReq ?"green":"red"}}>Capacidad total: {totalCap}</div>
            
            <div className='card px-1' style={{ minHeight: "50px" }}>
                {listaME.map((e, indice) =>
                    <div key={e.Id_A + "-" + e.Hora_Inicio_HL}>
                        <div className="form-check">
                            <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={e.Id_A} />
                            <label className="form-check-label" htmlFor={e.Id_A}>
                                {e.Id_A + " - C"+e.Capacidad_A +" - "+e.Edificio_A}
                            </label>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

