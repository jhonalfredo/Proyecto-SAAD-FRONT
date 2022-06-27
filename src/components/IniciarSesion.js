import React, { useEffect, useState } from 'react'
import MenuSimple from './MenuSimple'
import logo from './../logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Alert } from 'bootstrap';
import UList from './UList';
const rutainicio = "http://127.0.0.1:8000/api/acceso";
//const rutainicio = "http://localhost:8000/api/acceso/"
const ruta = "http://127.0.0.1:8000/api/users";
export default function IniciarSesion(props) {

    const [usuario, setUsuario] = useState(0);
    const [contrasena, setContrasena] = useState("");
    const [errorCod, setErrorCod] = useState("");
    const [errorCont, setErrorCont] = useState("");

    const navigate = useNavigate();

    const cerrarSesion = () => {
        //console.log("cerrar sesion");
        axios.post('/api/cerrarsesion').then(res => {
            if (res.data.res === true) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                localStorage.removeItem("datosUser");
                //navegate("/");
            }
        }).catch(error => {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_name');
            localStorage.removeItem("datosUser");
        })

    }

    useEffect(()=>{
        cerrarSesion();
    }, []);

    const hacerAccion = (e) => {
        e.preventDefault()

        setErrorCod("");
        setErrorCont("");

        if (/*String(usuario).length === 9 &&*/ contrasena.length > 0) {
            const data = { Correo_U: usuario, Contrasenia_U: contrasena }
            axios.get('sanctum/csrf-cookie').then(response => {
                axios.post('api/acceso', data).then(res => {
                    if (res.data.res === true) {
                        localStorage.setItem('auth_token', res.data.token);
                        localStorage.setItem('auth_name', res.data.correo);
                        console.log("se logeo correctamente");
                        console.log(res.data);
                        console.log(UList.juntarComunes("Rol_Id_R", res.data.rol));
                        let roles = UList.juntarComunes("Rol_Id_R", res.data.rol);
                        localStorage.setItem("datosUser", JSON.stringify(res.data));
                        if(UList.buscarAtrib("Rol_Id_R", 2, roles)){
                            navigate("administrador");
                        }else if(res.data.rol===1){
                            navigate("docente")
                        }
                        //navigate("/administrador/solicitudes");
                    } else {
                        alert("Usuario o Contraseña incorrectos");
                    }
                }).catch(error => {
                    alert("Usuario o Contraseña incorrectos");
                });
            });
        } else {
            if (String(usuario).length !== 9) {
                //setErrorCod("Código SIS inválido");
            }
            if (contrasena.length < 1) {
                setErrorCont("Campo Obligatorio");
            }
        }
    }

    return (
        <div className="mainContIni">
            <div className='card text-white bg-dark mb-3 border-light contenedorInicio p-3' style={{ width: "300px" }}>
                <form onSubmit={(e) => hacerAccion(e)}>
                    <div className="mb-3 fs-4 contenedorheaderiniciar">
                        <img src={logo} alt="" width="50" height="35" className="d-inline-block align-text-top" />
                        SAAD
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Correo</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsuario(e.target.value)} />
                        <p id='errorUsuario' className='textoErrorCampo'>{errorCod}</p>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Constraseña</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setContrasena(e.target.value)} />
                        <p id='errorContrasena' className='textoErrorCampo'>{errorCont}</p>
                    </div>
                    <div className="contbotonini">
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </form>
            </div >
        </div>

    )
}
