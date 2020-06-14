import React,{useState} from 'react';
import { createGlobalStyle} from 'styled-components';
import {FaPaw} from 'react-icons/fa';
import {FaPlus} from 'react-icons/fa';
import {FaTrash} from 'react-icons/fa';
import {FaPaperPlane} from 'react-icons/fa';
const CurrentStyle =  createGlobalStyle`
:root{
 --primary-color:#f29197;
 --bg-color:44, 181, 163;
 --text-color:#ffffff;
 --light-color:#2ec0ae;
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
input,select,button{
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
    display:flex;
    justify-content:space-between;
    margin-top:16px;
    background-color:var(--primary-color);
    padding-left:15px;
    padding-right:15px;
    cursor:pointer;
    transition: opacity .4s;
}
button:hover{
    opacity:0.6;
}
input{
    text-align:right;
}
option {
    background:var(--primary-color);
    font-size:20px;
}
input ~ label,
select ~ label
{
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
a{
    text-decoration:none;
    color:var(--text-color);
    padding:20px;
}
input::placeholder{
    text-align:right;
    color:var(--text-color);
}
.pets {
    display: flex;
    flex-wrap: wrap;
    border-radius: 3px;
    background: var(--light-color);
    margin: 16px 0;
    padding: 16px;
    -webkit-box-shadow: 6px 6px 4px 0px var(--error-color);
    -moz-box-shadow: 6px 6px 4px 0px var(--error-color);
    box-shadow: 6px 6px 4px 0px var(--error-color);
}
span.currency:before {
    content:"R$ "
}
span.currency:after {
    content:",00"
}
label.check {
    width:100%;
    color:var(--text-color);
    cursor:pointer;
}
input[type="checkbox"] {
   cursor: pointer;
   height: 5px;
   width: 5px;
   border: var(--text-color);
   background: #fdfcfc;
   padding:8px;
   margin-right: 10px;
   transition:all .4s;
}
input[type="checkbox"]:checked{
    padding: 3px;
    width: 5px;
    height: 20px;
    border: solid;
    border-bottom: none;
    border-right: none;
    background: transparent;
    transform: rotate(225deg);
}
`;

export default ()=>{
    const [pets,setPet] = useState([new Date().getTime()]);
    const [valorTotal,setValorTotal] = useState(60);
    const addPet =()=>{
        setPet([...pets,new Date().getTime()]);
        setTimeout(total, 500);
    }
    const removePet = (id)=>{
        var array = [...pets]; 
        var index = array.indexOf(id)
        if (index !== -1) {
            array.splice(index, 1);
            setPet(array);
        }
        setTimeout(total, 500);
    }
    const total = ()=>{
        const total = Array.from(document.querySelectorAll('.pets select')).map( (el) =>(
            parseInt(el.value)
        )).reduce((total,num) =>{
        return total + Math.round(num);
        },0);
        setValorTotal(total);
    }
    const handleSubmmit =(e)=>{
        e.preventDefault();
        if(valorTotal === 0) alert('Inclua pets');
    }

    return (
        <>
        <CurrentStyle/>
        <form onSubmit={handleSubmmit}>
            <h2>Reservar</h2>
            <div className="input">
                <input type="text" 
                required />
                <label>Nome</label>
            </div>
            <div className="input">
                <input type="email" 
                required />
                <label>E-mail</label>
            </div>
            <div className="input">
                <input 
                type="text" 
                placeholder="00000000000" 
                pattern="[0-9]{11}" 
                required />
                <label>CPF</label>
            </div>
            <div className="input">
                <input type="phone" 
                placeholder="00000000000"
                pattern="[0-9]{11}" required />
                <label>WhatsApp</label>
            </div>
            <div className="input">
                <input type="text"
                required />
                <label>Endereço completo</label>
            </div>
            <button type="button" onClick={addPet}>
                <span>
                    <FaPlus/> Incluir Pet <FaPaw/>
                </span>
                <span>
                    Total de pets {pets.length}
                </span>
            </button>
            {pets.map(pet =>(
                <div className="pets"  key={pet}>
                    <div className="input">
                        <input type="text"
                        required />
                        <label>Nome</label>
                    </div>
                    <div className="input">
                        <select onChange={total}>
                            <option value="60">0 - 10kg</option>
                            <option  value="70">1 - 20kg</option>
                            <option  value="80">21 - 30kg</option>
                            <option  value="90">31 - 40kg</option>
                            <option  value="100">Acima de 40kg</option>
                        </select>
                    </div>

                    <a href="javascirpt:void(0)" 
                    title="Remover Pet" 
                    onClick={()=> removePet(pet) } >
                        &nbsp;<FaTrash/>&nbsp;
                    </a>
                    
                    <label className="check" htmlFor={pet}>
                        <input type="checkbox" id={pet}/>
                        Seu pet pessui alguma necessidade especial?
                    </label>
                    
                </div>
            ))}
                
            <button type="submit">
                <span>
                    Enviar <FaPaperPlane/>
                </span>
                <span className="currency">
                    {valorTotal}
                </span>
            </button>
        </form>
        </>
    )
}
