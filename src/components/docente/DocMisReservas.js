import React from 'react'
import MenuDoc from './MenuDoc'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DetallesReserva from '../administrador/DetallesReserva';
import Pendientes from './Pendientes';
import Rechazadas from './Rechazadas';
import Aceptadas from './Aceptadas';

export default function DocMisReservas() {

  const [tabSeleccionado, setTabSeleccionado] = useState(1);

  return (
    <div>
      <MenuDoc />
      <h1>mis reservas</h1>
      <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
          <button onClick={() => setTabSeleccionado(1)} className={"nav-link" + (tabSeleccionado == 1 ? " active" : "")} id="home-tab" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">Aceptadas</button>
        </li>
        <li className="nav-item" role="presentation">
          <button onClick={() => setTabSeleccionado(2)} className={"nav-link" + (tabSeleccionado == 2 ? " active" : "")} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Pendientes</button>
        </li>
        <li className="nav-item" role="presentation">
          <button onClick={() => setTabSeleccionado(3)} className={"nav-link" + (tabSeleccionado == 3 ? " active" : "")} id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Rechazadas</button>
        </li>
      </ul>
      <div className="tab-content" id="myTabContent">
        {tabSeleccionado == 1 && <Aceptadas />}
        {tabSeleccionado == 2 && <Pendientes />}
        {tabSeleccionado == 3 && <Rechazadas />}
      </div>
    </div>
  );
}
