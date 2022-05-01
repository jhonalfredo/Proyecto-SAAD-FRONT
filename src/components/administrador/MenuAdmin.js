import React from 'react'
import { Link, NavLink } from 'react-router-dom';
import logo from './../../logo.svg';
import axios from 'axios';
import { useEffect, useState} from 'react';

export default function MenuAdmin() {

    const [datosUser, setDatosUser] = useState({nombre: "Jhon Alfredo", apellido: "Morales Estrada"}); 

    useEffect(() => {
        pedirUsuarios();
    }, []);
    
    const pedirUsuarios = async () => {
        try {
            const usuariosget = await axios.get('/api/users');
            //setUsuarios(usuariosget);
            console.log(usuariosget);
        } catch (error) {
            console.log("usuario no autenticado");
        }
    }

    const cerrarSesion = () => {
        console.log("cerrar sesion");
        axios.post('/api/cerrarsesion').then(res => {
            if (res.data.res === true) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                //navegate("/");
            }
        });
    }

    function concatenarNombre(){
        let res = "Cargando...";
        if(datosUser){
            res = datosUser.nombre+" "+datosUser.apellido;
        }
        return res;
    }

    function concatenarIniciales(){
        let res = "-"
        if(datosUser){
            res = datosUser.nombre.charAt(0)+datosUser.apellido.charAt(0);
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
                            Saad
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
                                        <li><a className="dropdown-item" href="#">Docente</a></li>
                                        <li><a className="dropdown-item" href="#">201902507</a></li>
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
