import React from 'react'
import { Link, Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from './../../logo.svg';
import axios from 'axios';
import { useEffect, useState } from 'react';
import 'bootstrap/js/src/dropdown';
//window.history.forward(1);


export default function MenuAdmin() {


    /*const [datosUser, setDatosUser] = useState({
        apellido_materno: "",
        apellido_paterno: "",
        codigosis: 0,
        correo: "",
        nombre: "",
        res: false,
        rol: -1,
        token: ""
    });*/

    const [datosUser, setDatosUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const datosRecup = localStorage.getItem("datosUser");
        console.log(datosRecup);
        if (datosRecup) {
            let nuevoDato = JSON.parse(datosRecup);
            if (nuevoDato.rol !== 2 && nuevoDato.rol !== 3) {
                alert("Usted no es administrador");
                cerrarSesion();
            } else {
                setDatosUser(nuevoDato);
            }
        } else {
            //console.log("Usuario no autenticado");
            alert("Usuario no autenticado");
            navigate("/");
        }
        //pedirUsuarios();
    }, []);

    function getRolUsuario() {
        let res = "------";
        if (datosUser) {
            if (datosUser.rol === 2) {
                res = "Administrador";
            }else if(datosUser.rol===3){
                res = "Administrador/Docente"
            }
        }
        return res
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
            res = datosUser.nombre + " " + datosUser.apellido_paterno + " " + datosUser.apellido_materno;
        }
        return res;
    }

    function concatenarIniciales() {
        let res = "-"
        if (datosUser) {
            res = datosUser.nombre.charAt(0) + datosUser.apellido_paterno.charAt(0);
        }
        return res;
    }

    return (
        <div className='contMenu'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        <NavLink to="/administrador" className="navbar-brand" href="#">
                            <img src={logo} alt="" width="50" height="35" className="d-inline-block align-text-top" />
                            SAAD
                        </NavLink>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/administrador/solicitudes" className="nav-link" aria-current="page">Solicitudes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/administrador/docentes" className="nav-link">Docentes</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/administrador/administradores" className="nav-link">Administradores</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/administrador/sistema" className="nav-link">Sistema</NavLink>
                            </li>

                        </ul>
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
                                        {!!datosUser && datosUser.rol == 3 && <li><a className="dropdown-item" href="/docente">Cambiar a Docente</a></li>}
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
