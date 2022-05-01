import React from 'react'
import logo from './../logo.svg';

export default function MenuSimple() {
  return (
    <div className='contMenu'>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container-fluid">
                    <div>
                        <a className="navbar-brand" href="#">
                            <img src={logo} alt="" width="50" height="35" className="d-inline-block align-text-top" />
                            Saad
                        </a>
                    </div>
                    
                </div>
            </nav>
    </div>
  )
}
