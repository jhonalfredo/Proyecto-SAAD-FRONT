import React, { useState } from 'react'
import { Container, Row, Col, Button } from "react-bootstrap";

export default function DetalleSimple(props) {

  return (
    <div>
      {props.datos ?

        <div className='px-5 pt-3'>
          <h1>Detalle de Reserva</h1>
          <div class="row pb-3">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">ID</h5>
                  <p class="card-text">{props.datos.detalle[0].Id_SR}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Estado</h5>
                  <p class="card-text" >
                {props.datos.detalle[0].Estado_Atendido_SR === 0
                  ? "Pendiente"
                  : "Atendido"}</p>                 
                </div>
              </div>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Materia</h5>
                  <p class="card-text">{props.datos.detalle[0].Nombre_M}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Grupo</h5>
                  <p class="card-text" >
                  {props.datos.grupos.map(function (grupo, indice) {
                return (
                  <p className="contenido" key={indice}>
                    {grupo.Id_G_US} - {grupo.Nombre_U} {grupo.Apellido_Paterno_U}{" "}
                    {grupo.Apellido_Materno_U}
                  </p>
                );
              })}</p>                 
                </div>
              </div>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Nro Estudiantes</h5>
                  <p class="card-text"> {props.datos.detalle[0].Numero_Estudiantes_SR}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Fecha</h5>
                  <p class="card-text" >
                  {props.datos.detalle[0].Fecha_SR}</p>                 
                </div>
              </div>
            </div>
          </div>
          <div class="row pb-3">
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Hora Inicio</h5>
                  <p class="card-text"> {props.datos.detalle[0].Hora_Inicio_SR}</p>
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Hora Fin</h5>
                  <p class="card-text" >
                  {props.datos.detalle[0].Hora_Final_SR}</p>                 
                </div>
              </div>
            </div>
            <div class="col">
              <div class="card">
                <div class="card-body">
                  <h5 class="card-title">Periodos</h5>
                  <p class="card-text" >
                  {props.datos.detalle[0].Cantidad_Periodos_SR}
                 </p>                 
                </div>
              </div>
            </div>
          </div>
          <div class="card mb-3 w-90">
            <div class="card-body">
              <h5 class="card-title">Motivo</h5>
              <p class="card-text"> {props.datos.detalle[0].Motivo_SR}</p>
            </div>
          </div>
        </div>
        : "Cargando..."
      }
    </div>
  )
}
