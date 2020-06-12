import React from 'react';
import { createGlobalStyle} from 'styled-components';
import {FaPaw} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
const CurrentStyle =  createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    font-family: Arial, Helvetica, sans-serif;
    font-size:14px;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialalised;
}
.container{
    display:flex;
    justify-content:space-between;
    padding:0 5px;
}
.form-group {
    margin-bottom: 18px;
    margin-left: 5px;
    margin-right: 5px;
    width: 100%;
}
.form-control {
    text-align: left;
    display: block;
    width: 100%;
    padding: 6px 12px;
    color: #373737;
    background-color: #fff;
    border: 1px solid #ced0d0;
    transition: border-color ease-in-out .15s,box-shadow ease-in-out .15s;
}

`;

export default ()=>{
    return (
        <>
        <CurrentStyle/>
        <h1>Reserva</h1>
        <h3>Informe seus dados</h3>
        <div className="container">
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Nome completo"/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="CPF"/>
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Telefone(WhatsApp)"/>
            </div>
        </div>
        
        <div className="container">
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Endereço" />
            </div>
            <div className="form-group">
                <input className="form-control" type="text" placeholder="Cidade" />
            </div>
        </div>
         
        <div>
            <button>
                <span>
                    <FaPaw/> Incluir Pet <FaPlus/>
                </span>
            </button>
        </div>
        </>
    )
}
