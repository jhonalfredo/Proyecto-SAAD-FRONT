import React from 'react'
import MenuDoc from './MenuDoc'
import { useEffect, useState } from 'react';
import axios from 'axios';
import DetallesReserva from '../administrador/DetallesReserva';
import Pendientes from './Pendientes';
import Rechazadas from './Rechazadas';
import Aceptadas from './Aceptadas';

export default function DocMisReservas() {

  return (
    <div>
      <MenuDoc />
      <nav>
        <div className="nav nav-tabs bg-dark" id="nav-tab" role="tablist">
          <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Aceptadas</button>
          <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Pendientes</button>
          <button className="nav-link" id="nav-rechazadas-tab" data-bs-toggle="tab" data-bs-target="#nav-rechazadas" type="button" role="tab" aria-controls="nav-rechazadas" aria-selected="false">Rechazadas</button>
       
        </div>
      </nav>

      <div className="tab-content" id="nav-tabContent">
        <div className="tab-pane fade show active p-3" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
        <Aceptadas />
        </div>
        <div className="tab-pane fade p-3" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
        <Pendientes />
        </div>
        <div className="tab-pane fade p-3" id="nav-rechazadas" role="tabpanel" aria-labelledby="nav-rechazadas-tab">
        <Rechazadas />
        </div>
      </div>
    </div>
  );
}
