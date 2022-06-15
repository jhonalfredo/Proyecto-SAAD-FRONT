import axios from 'axios';
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MenuAdmin from './MenuAdmin';

export default function AdmSistema() {
  //const [perAc, setPerAc] = useState(null);
  const [inicioPerAc, setInicioPerAc] = useState(null);
  const [finPerAc, setFinPerAc] = useState(null);
  const [semPerAc, setSemPerAc] = useState(null);
  const [idPerAc, setIdPerAc] = useState(null)

  const [inicioPer, setInicioPer] = useState(null);
  const [finPer, setFinPer] = useState(null);
  const [semPer, setSemPer] = useState("Primer Semestre");

  const navegar = useNavigate();

  useEffect(() => {
    recupPeriodo();
  }, []);

  const recupPeriodo = async () => {
    let periodo = await (await axios.get("/api/obtenerPeriodoAcademico")).data;
    console.log(periodo)
    //setPerAc(periodo)
    setIdPerAc(periodo.Id_PA)
    setSemPerAc(periodo.Semestre_PA)
    setInicioPerAc(periodo.Fecha_Inicio_PA)
    setFinPerAc(periodo.Fecha_Fin_PA)
  }

  async function editarPerAc() {
    //console.log(inicioPer, finPer, semPer)
    if (inicioPerAc === finPerAc) {
      alert("Seleccione una fecha distinta para el fin de periodo")
    } else if (inicioPerAc && finPerAc && semPerAc && idPerAc) {
      //registrar();
      await axios.patch("/api/editarPeriodoAcademico", {
        Id_PA: idPerAc,
        Semestre_PA: semPerAc,
        Fecha_Inicio_PA: inicioPerAc,
        Fecha_Fin_PA: finPerAc
      });
      navegar("/administrador/solicitudes")
    } else {
      alert("Uno o más campos están vacíos");
    }
  }

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
    <div style={{ height: "100vh", width: "100vw", display: "flex", flexDirection: "column" }}>
      <MenuAdmin />
      <div class="accordion p-5" id="accordionExample">
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingOne">
            <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
              Periodo Actual
            </button>
          </h2>
          <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              {inicioPerAc && finPerAc && idPerAc && semPerAc ?

                <form onSubmit={(e) => { e.preventDefault(); editarPerAc() }}>
                  <div className="row">
                    <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                      <label for="datemin">Inicio de periodo</label>
                      <input type="date" id="datemin" name="datemin" value={inicioPerAc} onChange={(e) => { setInicioPerAc(e.target.value); setFinPerAc(e.target.value)}} />
                    </div>
                    <div className='col fw-bold' style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>hasta</div>
                    <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                      <label for="datemax">Fin de periodo</label>
                      <input type="date" id="datemax" name="datemax" value={finPerAc} min={inicioPerAc} onChange={(e) => { setFinPerAc(e.target.value) }} />
                    </div>
                  </div>
                  <div className='p-3' style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <label for="validationCustom04">Periodo:</label>
                    <select
                      disabled
                      style={{ width: "auto" }}
                      class="form-select"
                      id="validationCustom04"
                      onChange={(event) => setSemPer(event.target.value)}
                      required
                    >
                      {semPerAc === "Primer Semestre" ? <option selected value="Primer semestre">Primer semestre</option> : <option value="Primer semestre">Primer semestre</option>}
                      {semPerAc === "Segundo Semestre" ? <option selected value="Segundo semestre">Segundo semestre</option> : <option value="Segundo semestre">Segundo semestre</option>}
                      {semPerAc === "Invierno" ? <option selected value="Invierno">Invierno</option> : <option value="Invierno">Invierno</option>}
                      {semPerAc === "Verano" ? <option selected value="Verano">Verano</option> : <option value="Verano">Verano</option>}

                    </select>
                  </div>
                  <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <input type="submit" className='btn btn-success' value="Editar" />
                  </div>

                </form>

                :
                ""
              }
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header" id="headingTwo">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
              Crear Nuevo Periodo
            </button>
          </h2>
          <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
            <div class="accordion-body">
              <form id="formactual" onSubmit={(e) => { e.preventDefault(); establecerPer() }}>
                <div className="row">
                  <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <label for="datemin">Inicio de periodo</label>
                    <input type="date" id="datemin" name="datemin" min={finPerAc} onChange={(e) => { setInicioPer(e.target.value) }} />
                  </div>
                  <div className='col fw-bold'  style={{justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column"}}>hasta</div>
                  <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <label for="datemax">Fin de periodo</label>
                    {inicioPer ? <input type="date" id="datemax" name="datemax" min={inicioPer} onChange={(e) => { setFinPer(e.target.value) }} /> : <input type="date" disabled />}

                  </div>
                </div>


                <div className='p-3' style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                  <label for="validationCustom04">Periodo:</label>
                  <select
                    style={{ width: "auto" }}
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

      </div>
      
    </div>
  )
}
/*<h3 className='p-3'>Establecer periodo académico</h3>
      <div style={{ flex: "1", display: "flex", flexDirection: "column" }} className='p-3 contenedorInicio'>

        <div style={{ display: "flex", alignItems: "center", flex: "1", flexDirection: "column" }}>
          {inicioPerAc && finPerAc && idPerAc && semPerAc ?
            <div>
              <h3>Periodo Actual</h3>
              <form onSubmit={(e) => { e.preventDefault(); editarPerAc() }}>
                <div className="row">
                  <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <label for="datemin">Inicio de periodo</label>
                    <input type="date" id="datemin" name="datemin" value={inicioPerAc} onChange={(e) => { setInicioPerAc(e.target.value) }} />
                  </div>
                  <div className='col fw-bold'>hasta</div>
                  <div className="col" style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                    <label for="datemax">Fin de periodo</label>
                    <input type="date" id="datemax" name="datemax" value={finPerAc} min={inicioPerAc} onChange={(e) => { setFinPerAc(e.target.value) }} />
                  </div>
                </div>
                <div className='p-3' style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                  <label for="validationCustom04">Periodo:</label>
                  <select
                    disabled
                    style={{ width: "auto" }}
                    class="form-select"
                    id="validationCustom04"
                    onChange={(event) => setSemPer(event.target.value)}
                    required
                  >
                    {semPerAc === "Primer Semestre" ? <option selected value="Primer semestre">Primer semestre</option> : <option value="Primer semestre">Primer semestre</option>}
                    {semPerAc === "Segundo Semestre" ? <option selected value="Segundo semestre">Segundo semestre</option> : <option value="Segundo semestre">Segundo semestre</option>}
                    {semPerAc === "Invierno" ? <option selected value="Invierno">Invierno</option> : <option value="Invierno">Invierno</option>}
                    {semPerAc === "Verano" ? <option selected value="Verano">Verano</option> : <option value="Verano">Verano</option>}

                  </select>
                </div>
                <div style={{ justifyContent: "center", alignItems: "center", display: "flex", flexDirection: "column" }}>
                  <input type="submit" className='btn btn-success' value="Editar" />
                </div>

              </form>
            </div>
            :
            ""
          }
        </div>

        <div style={{ display: "flex", alignItems: "center", flex: "1", flexDirection: "column" }}>
          <h3>Nuevo</h3>
          <form id="formactual" onSubmit={(e) => { e.preventDefault(); establecerPer() }}>
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
                style={{ width: "auto" }}
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

      </div>*/
//<label for="datemin">Fecha Inicio</label>
//<input type="date" id="datemin" name="datemin" min="2022-06-09" max="2022-06-19" />
//<label for="datemax">Fecha Fin</label>
//<input type="date" id="datemax" name="datemax" max="2022-06-09" />
