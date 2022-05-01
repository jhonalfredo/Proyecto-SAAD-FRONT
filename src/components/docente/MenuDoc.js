import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom';
import logo from './../../logo.svg';
import axios from 'axios';

export default function MenuDoc() {

    useEffect(()=>{
       pedirUsuarios(); 
    }, []);

    const pedirUsuarios = async () => {
        const usuariosget  = await axios.get('/api/users');
        //setUsuarios(usuariosget);
        console.log(usuariosget);
      }

    const cerrarSesion = ()=>{
        console.log("cerrar sesion");
        axios.post('/api/cerrarsesion').then(res=>{
            if(res.data.res === true){
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                //navegate("/");
            }
        });
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
                            Leticia Blanco Coca
                        </span>
                        <div>
                            <div className="letraUser">
                                LB
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
                                        <li><a className="dropdown-item" href="#" onClick={()=> cerrarSesion()}>Cerrar Sesión</a></li>
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
