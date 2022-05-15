import React, { useState } from 'react'
import DetallesReserva from './DetallesReserva';
import MenuAdmin from './MenuAdmin'

export default function AdmAceptSolDocente() {
  const listaME = [];
  const [misGruposSel, setMisGruposSel] = useState([]);
  
  const listarGruposMateria = (grupo, agregar) => {
    console.log("agregarmat", grupo, agregar);
    if (agregar) {
        let listaNueva = [...misGruposSel, grupo];
        console.log(listaNueva);
        setMisGruposSel(listaNueva);
    } else {
        let listaNueva = misGruposSel.filter(dato => dato !== grupo);
        console.log(listaNueva);
        setMisGruposSel(listaNueva);
    }
}

  return (
    <div>
      <MenuAdmin />
      <DetallesReserva/>
      Capacidad total: 0
      <div className='card px-1' style={{ minHeight: "50px" }}>
        {listaME.map((e, indice) =>
          <div key={e.Grupo_UM}>
            <div className="form-check">
              <input className="form-check-input" onChange={(objeto) => listarGruposMateria(e, objeto.target.checked)} type="checkbox" id={e.Grupo_UM} />
              <label className="form-check-label" htmlFor={e.Grupo_UM}>
                {e.Grupo_UM}
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
