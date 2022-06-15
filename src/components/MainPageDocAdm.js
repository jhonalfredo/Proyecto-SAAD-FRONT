import React from 'react'
import logo from './../logo.svg';

export default function MainPageDocAdm() {
  return (
    <div>
        <h1 style={{ width: "100%", textAlign: "center", marginTop: "30px", fontSize: "50px" }}>BIENVENIDO</h1>
      <div style={{ width: "100%", textAlign: "center", padding:"50px"}}>
        <img src={logo} alt="" width="300" height="200" className="d-inline-block align-text-top" />
      </div>
        <p style={{paddingLeft:"300px", paddingRight:"300px", fontSize:"20px"}}>El sistema SAAD (Sistema de Asignación de Aulas para Docentes) tiene el objetivo de brindar un espacio a los docentes y personal administrativo; para la administración de reservas de las aulas de las instalaciones de la Facultad de Ciencias y Tecnología  de la Universidad Mayor de San Simón</p>
    </div>
  )
}
