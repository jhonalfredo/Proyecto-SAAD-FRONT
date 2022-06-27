import React from 'react'
import IniciarSesion from './IniciarSesion';
import Administrador from './administrador/Administrador';
import Docente from './docente/Docente';

import {
    Routes,
    Route,
    BrowserRouter
  } from 'react-router-dom';
import AdmSolDocentes from './administrador/AdmSolDocentes';
import AdmDocentes from './administrador/AdmDocentes';
import DocMisReservas from './docente/DocMisReservas';
import DocSolReserva from './docente/DocSolReserva';
import AdmEditMatDocente from './administrador/AdmEditMatDocente';
import FormsPage from './docente/FormsPage';
import NuevaReserva from './jncomp/NuevaReserva';
import RegistrarDocente from './administrador/RegistrarDocente';
import AdmAceptSolDocente from './administrador/AdmAceptSolDocente';
import SolResPr from './docente/SolResPr';
import DetalleReservaVista from './docente/DetalleReservaVista';
import AdmAceptarSolicitudesDoc from './administrador/AdmAceptarSolicitudesDoc';
import DocVisualizarDetalles from './docente/DocVisualizarDetalles';
import MenuDoc from './docente/MenuDoc';
import AdmEditAdm from './administrador/AdmEditAdm';
import AdmAdministradores from './administrador/AdmAdministradores';
import AdmSistema from './administrador/AdmSistema';

//<Route path='/' element={<IniciarSesion/>}></Route>
export default function ContenidoApp() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<IniciarSesion/>}></Route>
            <Route path='/docente' element={<Docente/>}></Route>
            <Route path='/docente/mis-reservas' element={<DocMisReservas/>}></Route>
            <Route path='/docente/mis-reservas/:id' element={<DocVisualizarDetalles/>}></Route>
            <Route path='/docente/solicitar-reserva' element={<SolResPr/>}></Route>
            <Route path='/administrador' element={<Administrador/>}></Route>
            <Route path='/administrador/solicitudes' element={<AdmSolDocentes/>}></Route>
            <Route path='/administrador/solicitudes/:id' element={<AdmAceptarSolicitudesDoc/>}></Route>
            <Route path='/administrador/docentes' element={<AdmDocentes/>}></Route>
            <Route path='/administrador/docentes/:id' element={<AdmEditMatDocente/>}></Route>
            <Route path='/administrador/administradores' element={<AdmAdministradores/>}></Route>
            
            <Route path='/administrador/editar/:id' element={<AdmEditAdm/>}></Route>
            
            <Route path='/administrador/docentes/registrar' element={<RegistrarDocente/>}></Route>
            <Route path='/administrador/administradores/registrar' element={<RegistrarDocente/>}></Route>

          </Routes>
      </BrowserRouter>
  )
}
