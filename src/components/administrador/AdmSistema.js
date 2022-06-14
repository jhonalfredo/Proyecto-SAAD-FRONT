import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuAdmin from './MenuAdmin';

export default function AdmSistema() {
  const [inicioPer, setInicioPer] = useState(null);
  const [finPer, setFinPer] = useState(null);
  const [semPer, setSemPer] = useState("1");

  const navegar = useNavigate();

  async function establecerPer() {
    console.log(inicioPer, finPer, semPer)
    if (inicioPer === finPer) {
      alert("Seleccione una fecha distinta para el fin de periodo")
    } else if (inicioPer && finPer && semPer) {
      //registrar();
      await axios.post("/api/establecerPeriodoAcademico", {
        semestre: semPer,
        fechaInicio: inicioPer,
        fechaFin: finPer
      });
      navegar("/administrador/solicitudes")
    } else {
      alert("Uno o más campos están vacíos");
    }
  }
  return (
    <div style={{height:"100vh", width:"100vw", display:"flex", flexDirection:"column"}}>
      <MenuAdmin/>
      <h3 className='p-3'>Establecer periodo académico</h3>
      <div style={{flex:"1", display:"flex", flexDirection:"column"}} className='p-3 contenedorInicio'>
      
        <div style={{display:"flex", alignItems:"center", flex:"1"}}>
        
        <form onSubmit={(e) => { e.preventDefault(); establecerPer() }}>
          <div className="row">
            <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
              <label for="datemin">Inicio de periodo</label>
              <input type="date" id="datemin" name="datemin" onChange={(e) => { setInicioPer(e.target.value) }} />
            </div>
            <div className='col fw-bold'>hasta</div>
            <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
              <label for="datemax">Fin de periodo</label>
              {inicioPer ? <input type="date" id="datemax" name="datemax" min={inicioPer} onChange={(e) => { setFinPer(e.target.value) }} /> : <input type="date" disabled />}

            </div>
          </div>


          <div className='p-3' style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
            <label for="validationCustom04">Periodo:</label>
            <select
              style={{width:"auto"}}
              class="form-select"
              id="validationCustom04"
              onChange={(event) => setSemPer(event.target.value)}
              required
            >
              <option value="Primer semestre">Primer semestre</option>
              <option value="Segundo semestre">Segundo semestre</option>
              <option value="Invierno">Invierno</option>
              <option value="Verano">Verano</option>
            </select>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
            <input type="submit" className='btn btn-success' value="Establecer" />
          </div>

        </form>
        </div>
        
      </div>
    </div>
  )
}

//<label for="datemin">Fecha Inicio</label>
//<input type="date" id="datemin" name="datemin" min="2022-06-09" max="2022-06-19" />
//<label for="datemax">Fecha Fin</label>
//<input type="date" id="datemax" name="datemax" max="2022-06-09" />
