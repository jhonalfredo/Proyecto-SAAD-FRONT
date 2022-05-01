import React, { useState } from 'react'
import MenuSimple from './MenuSimple'
import logo from './../logo.svg';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const rutainicio = "http://127.0.0.1:8000/api/acceso";
//const rutainicio = "http://localhost:8000/api/acceso/"
const ruta = "http://127.0.0.1:8000/api/users";
export default function IniciarSesion(props) {

    const [usuario, setUsuario] = useState(0);
    const [constrasena, setContrasena] = useState("");
    const navigate = useNavigate();

    const hacerAccion = (e) => {
        e.preventDefault()

        const data = { Correo_U: usuario, Contrasenia_U: constrasena }
        axios.get('sanctum/csrf-cookie').then(response => {
            axios.post('api/acceso', data).then(res => {
                if (res.data.res === true) {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.correo);
                    console.log("se logeo correctamente");
                    console.log(res.data);
                    //navigate("/administrador/solicitudes");
                }
                else {
                    console.log("No se logeo correctamente");
                }
            }).catch(error=>{
                console.log("usuario inexistente");
            });
        });
        //hacerOtraAccion(data);

    }

    //forma2
    /*
    const hacerOtraAccion= async(data)=>{
        try{
            var response = await axios.get('sanctum/csrf-cookie');
            var res = await axios.post('api/acceso', data);
            console.log(res.data);
        }catch(error){
            console.log("usuario inexistente");
        }
    }*/


    return (
        <div className="mainContIni">
            <div className='card text-white bg-dark mb-3 border-light contenedorInicio p-3' style={{ width: "300px" }}>
                <form onSubmit={(e) => hacerAccion(e)}>
                    <div className="mb-3 fs-4 contenedorheaderiniciar">
                        <img src={logo} alt="" width="50" height="35" className="d-inline-block align-text-top" />
                        Saad
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Código Sis</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Constraseña</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => setContrasena(e.target.value)} />
                    </div>
                    <div className="contbotonini">
                        <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                    </div>
                </form>
            </div >
        </div>

    )
}
