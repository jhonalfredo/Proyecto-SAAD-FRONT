import React, { useEffect } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from './../../logo.svg';
import axios from 'axios';
import { useState } from 'react';
//import 'bootstrap/js/src/dropdown';
import imgnotif from './../../images/notificacion.png'
import UList from '../UList';

export default function MenuDoc() {

    const [datosUser, setDatosUser] = useState(null);
    const navigate = useNavigate();

    //var notifNuevas = [{ id: 0, materia: "Introducción a la programación", fecha: "3/3/2020 10:24:24", estado: 0, admin: "Juan Jurado", mensaje: "Rechazado por falta de aulas" }, { id: 1, materia: "Elementos de programación", fecha: "2/3/2020 10:24:24", estado: 1, admin: "Santos Otoniel", mensaje: "aceptado sin problemas" }, { id: 2, materia: "Circuitos Electronicos", fecha: "10/5/2020 10:24:24", estado: 0, admin: "Juan Perez", mensaje: "aceptado" }];
    //var notifPasadas = ["hola", "fdadfas", "fdaksjfdal"];

    const [notifNuevas, setNotifNuevas] = useState([]);
    const [notifPasadas, setNotifPasadas] = useState([]);

    const menuOpciones = [
        { nombre: "Mis Reservas", direccion: "/docente/mis-reservas", funcion: -1 },
        { nombre: "Solicitar", direccion: "/docente/solicitar-reserva", funcion: 1 },
    ];

    useEffect(() => {
        const datosRecup = localStorage.getItem("datosUser");
        console.log("datoos user", datosRecup);
        if (datosRecup) {
            let nuevoDato = JSON.parse(datosRecup);
            if (!UList.esDocUser(nuevoDato.rol)) {
                alert("Usted no es docente");
                cerrarSesion();
            } else {
                console.log("datooos", nuevoDato);
                setDatosUser(nuevoDato);
                recuperarNotif(nuevoDato.codigosis);
            }
        } else {
            //console.log("Usuario no autenticado");
            alert("Usuario no autenticado");
            navigate("/");
        }
        //pedirUsuarios();
    }, []);

    async function recuperarNotif(idDoc) {
        let nuevo = await axios.get("/api/notificacionesDocNuevas/" + idDoc);
        setNotifNuevas(nuevo.data);
        console.log(nuevo.data);
        let leido = await axios.get("/api/notificacionesDocViejas/" + idDoc);
        setNotifPasadas(leido.data);
        console.log(leido.data);
    }

    const cerrarSesion = () => {
        console.log("cerrar sesion");
        axios.post('/api/cerrarsesion').then(res => {
            if (res.data.res === true) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem("datosUser");
                navigate("/");
            }
        }).catch(error => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem("datosUser");
        })

    }

    function concatenarNombre() {
        let res = "Cargando...";
        if (datosUser) {
            res = datosUser.nombre.toUpperCase() + " " + datosUser.apellido_paterno.toUpperCase() + " " + datosUser.apellido_materno.toUpperCase();
        }
        return res;
    }

    function concatenarIniciales() {
        let res = "-"
        if (datosUser) {
            res = datosUser.nombre.toUpperCase().charAt(0) + datosUser.apellido_paterno.toUpperCase().charAt(0);
        }
        return res;
    }

    async function clickIconoNotif() {
        console.log("click logo notif")
        let dato = { idDocente: datosUser.codigosis }
        await axios.post("/api/verNotificaciones/", dato);
    }

    return (
        <div className='contMenu'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        <NavLink to="/docente" className="navbar-brand" href="#">
                            <img src={logo} alt="" width="50" height="35" className="d-inline-block align-text-top" />
                            SAAD
                        </NavLink>
                    </div>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>


                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            {datosUser ?
                                menuOpciones.map(function (valor, indice) {
                                    let res = null;

                                    if (valor.funcion > 0) {
                                        if (UList.esSuFuncion(valor.funcion, datosUser.rol)) {
                                            res = <li key={indice} className="nav-item">
                                                <NavLink to={valor.direccion} className="nav-link">{valor.nombre}</NavLink>
                                            </li>
                                        }
                                    } else {
                                        res = <li key={indice} className="nav-item">
                                            <NavLink to={valor.direccion} className="nav-link">{valor.nombre}</NavLink>
                                        </li>
                                    }
                                    return res;
                                }
                                )
                                : ""
                            }
                        </ul>



                        <div id="navbarNavDarkDropdown2">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <div onClick={() => clickIconoNotif()} className="contenedornotif nav-link data-toggle" href="#" id="navbarDarkDropdownMenuLink2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                        <img className="imagenNotif" src={imgnotif} alt="notificacion" />
                                        <div class="topright" style={{ visibility: notifNuevas.length > 0 ? 'visible' : 'hidden' }}>{notifNuevas.length}</div>

                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end bg-light p-2" style={{ width: "300px" }} aria-labelledby="navbarDarkDropdownMenuLink2">
                                        {notifNuevas.length > 0 ?
                                            <div>
                                                <div style={{ fontWeight: "bold" }}>Nuevas</div>
                                                <ListaNotif datos={notifNuevas} />
                                            </div>
                                            : ""}

                                        {notifPasadas.length > 0 ?
                                            <div>
                                                <div style={{ fontWeight: "bold", paddingTop: "5px" }}>Anteriores</div>
                                                <ListaNotif datos={notifPasadas} />
                                            </div>
                                            : ""}



                                    </ul>
                                </li>
                            </ul>
                        </div>


                        <span className="navbar-text">
                            {concatenarNombre()}
                        </span>
                        <div>
                            <div className="letraUser">
                                {concatenarIniciales()}
                            </div>
                        </div>
                        <div id="navbarNavDarkDropdown">
                            <ul className="navbar-nav">
                                <li className="nav-item dropdown">
                                    <div className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                                    </div>
                                    <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDarkDropdownMenuLink">
                                        {!!datosUser && UList.esDocAdmin(datosUser.rol) && <li><a className="dropdown-item" href="/administrador">Cambiar a Administrador</a></li>}
                                        <li><a className="dropdown-item" href="#">{datosUser === null ? "..." : datosUser.codigosis}</a></li>
                                        <li><a className="dropdown-item" href="#" onClick={() => cerrarSesion()}>Cerrar Sesión</a></li>
                                    </ul>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}


function ListaNotif(props) {

    const navegar = useNavigate();

    return (
        <div>
            {props.datos.map((e, indice) =>
                <div key={e.id} onClick={() => navegar("/docente/mis-reservas/" + String(e.solicitud_reserva_Id_SR))}>
                    <div class="card p-2">

                        <div className='text-muted' style={{ fontSize: "10px" }}>{e.Fecha_Reporte_RR}</div>
                        <div style={{ display: 'flex', flexDirection: "row", alignItems: 'center' }}>
                            <div style={{ backgroundColor: e.Estado_RR == 1 ? "green" : "red", borderRadius: "50%", height: "10px", width: "10px", marginRight: "5px" }}></div>
                            <div className="fw-bold text-muted">{e.Nombre_M}</div>
                        </div>
                        <div>
                            <div className='fw-light text-muted'>{e.Nombre_U + " " + e.Apellido_Paterno_U + " " + e.Apellido_Materno_U + ":"}</div>
                            <div className='text-muted'>{e.Observacion_RR}</div>

                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}


/*<div class="contenedornotif">
                            <img className="imagenNotif" src={imgnotif} alt="notificacion" />
                            <div class="topright" style={{ visibility: notifNuevas.length > 0 ? 'visible' : 'hidden' }}>{notifNuevas.length}</div>
                        </div>*/