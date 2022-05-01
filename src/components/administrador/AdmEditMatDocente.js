import React from 'react'
import MenuAdmin from './MenuAdmin'
import { useNavigate, useParams } from 'react-router-dom'

export default function AdmEditMatDocente(props) {
  
  const {id} = useParams();
  const datos = props;
  console.log(datos);

  return (
    <div>
        <MenuAdmin/>
        Docente: {id}</div>
  )
}
