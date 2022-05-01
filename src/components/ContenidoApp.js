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

export default function ContenidoApp() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path='/' element={<IniciarSesion/>}></Route>
            <Route path='/docente' element={<Docente/>}></Route>
            <Route path='/docente/mis-reservas' element={<DocMisReservas/>}></Route>
            <Route path='/docente/solicitar-reserva' element={<FormsPage/>}></Route>
            <Route path='/administrador' element={<Administrador/>}></Route>
            <Route path='/administrador/solicitudes' element={<AdmSolDocentes/>}></Route>
            <Route path='/administrador/docentes' element={<AdmDocentes/>}></Route>
            <Route path='/administrador/docentes/:id' element={<AdmEditMatDocente/>}></Route>

          </Routes>
      </BrowserRouter>
  )
}
