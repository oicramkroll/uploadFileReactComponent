import React from 'react';
import { createGlobalStyle} from 'styled-components';
import {FaPaw} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
const CurrentStyle =  createGlobalStyle`
:root{
 --primary-color:#f29197;
 --bg-color:44, 181, 163;
 --text-color:#ffffff;
 --ligh-color:#2ec0ae;
 --error-color:#3a3a38;
}
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
form {
    background: rgb(var(--bg-color) , 0.3); 
    width:100%;
    max-width:500px;
    margin:32px auto;
    padding:32px 64px;
    display:flex;
    flex-direction:column;
}
form h2{
    margin-bottom:32px;
}
div.input{
    margin-bottom:24px;
    position:relative;
}
input,button{
    -moz-appearance:none;
    -webkit-appearance:none;
    appearance: none;
    width:100%;
    padding: 16px 0;
    border: none;
    border-bottom:1px solid var(--primary-color);
    background-color:transparent;
    outline:none;
    color:var(--text-color);
    font-size:1em;
}
button{
    margin-top:16px;
    background-color:var(--primary-color);
}
input ~ label{
    position: absolute;
    top:16px;
    left:0;
    color:var(--text-color);
    transition:.4s;
}
input:focus ~ label,
input:valid ~ label{
    transform:translateY(-24px);
    font-size: 0.8em;
    letter-spacing: 0.1em;
}
.input span.error{
    display:flex;
    padding:0;
    background-color: var(--error-color);
}
.input span.error.active{
    border:1px solid var(--error-color);
    padding: 0.4em;
}
input::placeholder{
    text-align:right;
    color:var(--text-color);
}
`;

export default ()=>{
    const handleInvalid = (e)=>{
        //e.target.setCustomValidity(`$ `)
        const field = e.target;
        const findError = ()=>{
            let errorFounded = false;
            for(const error in field.validity){

            }
            return errorFounded;
        }
        findError();
        console.log(e.target);
    }
    const handleSubmmit =(e)=>{
        e.preventDefault();
    }

    return (
        <>
        <CurrentStyle/>
        <form onSubmit={handleSubmmit}>
            <h2>Reservar</h2>
            <div className="input">
                <input type="text" onInvalid={handleInvalid} required />
                <label>Nome</label>
                <span className="error"></span>
            </div>
            <div className="input">
                <input type="email" required />
                <label>E-mail</label>
                <span className="error"></span>
            </div>
            <div className="input">
                <input placeholder="00000000000" type="text" onInvalid={handleInvalid} pattern="[0-9]{11}" required />
                <label>CPF</label>
                <span className="error"></span>
            </div>
            <div className="input">
                <input type="phone" pattern="[0-9]{11}" required />
                <label>WhatsApp</label>
                <span className="error"></span>
            </div>
            <div className="input">
                <input type="text" required />
                <label>Endereço completo</label>
                <span className="error"></span>
            </div>
            <button>
                <FaPlus/> Incluir Pet <FaPaw/>
            </button>
        </form>
        </>
    )
}
