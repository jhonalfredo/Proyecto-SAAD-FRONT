import React, { useEffect } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import logo from './../../logo.svg';
import axios from 'axios';
import { useState } from 'react';
import 'bootstrap/js/src/dropdown';

export default function MenuDoc() {

    const [datosUser, setDatosUser] = useState(null);
    const navigate = useNavigate();

    
    useEffect(() => {
        const datosRecup = localStorage.getItem("datosUser");
        console.log("datoos user", datosRecup);
        if (datosRecup) {
            let nuevoDato = JSON.parse(datosRecup);
            if(nuevoDato.rol!==1){
                alert("Usted no es administrador");
                cerrarSesion();
            }else{
                console.log("datooos", nuevoDato);
                setDatosUser(nuevoDato);
            }
        } else {
            //console.log("Usuario no autenticado");
            alert("Usuario no autenticado");
            navigate("/");
        }
        //pedirUsuarios();
    }, []);

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
            res = datosUser.nombre.toUpperCase() + " " + datosUser.apellido_paterno.toUpperCase()+" "+datosUser.apellido_materno.toUpperCase();
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

    function getRolUsuario(){
        let res = "------";
        if(datosUser){
            if(datosUser.rol===1){
                res = "Docente";
            }
        }
        return res
    }

    return (
        <div className='contMenu'>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        <NavLink to="/docente" className="navbar-brand" href="#">
                            <img src={logo} alt="" width="50" height="35" className="d-inline-block align-text-top" />
                            Saad
                        </NavLink>
                    </div>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarText">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/docente/mis-reservas" className="nav-link" aria-current="page">Mis Reservas</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/docente/solicitar-reserva" className="nav-link">Solicitar</NavLink>
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
                                        <li><a className="dropdown-item" href="#">{getRolUsuario()}</a></li>
                                        <li><a className="dropdown-item" href="#">{datosUser===null? "...":datosUser.codigosis}</a></li>
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
