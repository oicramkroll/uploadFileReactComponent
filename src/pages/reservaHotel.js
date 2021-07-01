import React, { useState, useEffect } from 'react';
import { createGlobalStyle } from 'styled-components';
import { FaPaw } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';
import { FaPaperPlane } from 'react-icons/fa';
const CurrentStyle = createGlobalStyle`
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
    /*background: rgb(var(--bg-color) , 0.3); */
    /*width:100%;*/
    /*max-width:500px;
    margin:32px auto;
    padding:32px 64px;*/
    padding-right:10px;
    display:flex;
    flex-direction:column;
    margin:0 5%;
}
form h2{
    margin-bottom:32px;
    color:var(--error-color);
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
    border-radius:4px;
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
input ~ span{
    position: absolute;
    top:0;
    left:0;
    color:var(--text-color);
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
    justify-content:space-between;
    border-radius: 3px;
    background: var(--light-color);
    margin: 16px 0;
    padding: 16px;
    -webkit-box-shadow: 6px 6px 4px 0px var(--error-color);
    -moz-box-shadow: 6px 6px 4px 0px var(--error-color);
    box-shadow: 6px 6px 4px 0px var(--error-color);
}
.pets *{
    margin:0 5px;
}
span.currency:before{
    content:"R$ "
}
span.currency:after{
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
.user input, .user label{
    color:var(--error-color);
}
`;

export default () => {
    var dateTomorrow = new Date(new Date().getFullYear(),new Date().getMonth(), new Date().getDate() + 1);

    const [pets, setPets] = useState([new Date().getTime()]);
    const [valorTotal, setValorTotal] = useState(60);
    const [valueCheckIn, setValueCheckIn] = useState(new Date().toISOString().substr(0, 10));
    const [valueCheckOut, setValueCheckOut] = useState(dateTomorrow.toISOString().substr(0, 10));
    const [minValueChekOut, setMinValueCheckOut] = useState(dateTomorrow.toISOString().substr(0, 10));
    const valorTaxiDog = 50;
    const handleSubmmit = (e) => {
        e.preventDefault();
        if (valorTotal === 0) alert('Inclua pets');
        const textPets = Array.from(document.querySelectorAll('.pets.list')).map(item => {
            const name = item.querySelector('input[type="text"]').value;
            const size = item.querySelector('select option:checked').innerText;
            const especial = item.querySelector('input[type="checkbox"]:checked')!== null;
        return `*${name}, peso ${size} ${especial ? 'com necessidades especiais.':'.'}* `;
        }).join('%0a');
        const checkOutFormated =  new Date(new Date().setDate(new Date(Date.parse(valueCheckOut)).getDate() + 1)).toLocaleDateString();
        const checkInFormated =  new Date(new Date().setDate(new Date(Date.parse(valueCheckIn)).getDate() + 1)).toLocaleDateString();
        const textValor = `No valor informado de *${valorTotal},00* , entre *${checkInFormated} e ${checkOutFormated}* `;
        const hasTaxiDog = document.querySelector('#taxiDog:checked')!==null;
    
        const TextProprietary = Array.from(document.querySelectorAll('.user input')).map(userInput => (
            `${userInput.name}: *${userInput.value}* `
        )).join('%0a');
        const msg = `Ola! %0a Solicito hospedagem ${hasTaxiDog?'*com taxi dog*':''} para: %0a ${textPets} %0a ${textValor} %0a Meu Dados: %0a ${TextProprietary}`;
        window.open(`https://api.whatsapp.com/send?phone=5561981087386&text=${msg}`);
    }

    const addPet = () => {
        setPets([...pets, new Date().getTime()]);
    }
    const removePet = (id) => {
        var array = [...pets];
        var index = array.indexOf(id)
        if (index !== -1) {
            array.splice(index, 1);
            setPets(array);
        }
    }
    const setCheckIn = (e) => {
        const checkInDay = new Date(Date.parse(e.target.value)).getDate() + 1;
        const checkInMonth = new Date(Date.parse(e.target.value)).getMonth();
        const checkInYear =  new Date(Date.parse(e.target.value)).getFullYear();
        const nDate = new Date(checkInYear,checkInMonth,checkInDay);

        const checkOutDay = new Date(Date.parse(e.target.value)).getDate() + 2;
        const checkOutMonth = new Date(Date.parse(e.target.value)).getMonth();
        const checkOutYear =  new Date(Date.parse(e.target.value)).getFullYear();
        const nDateCheckOut =new Date(checkOutYear,checkOutMonth,checkOutDay);

        setValueCheckIn(nDate.toISOString().substr(0, 10));
        setValueCheckOut(nDateCheckOut.toISOString().substr(0, 10));
        setMinValueCheckOut(nDateCheckOut.toISOString().substr(0, 10))
    }
    const setCheckOut = (e) => {
        const day = new Date(Date.parse(e.target.value)).getDate() + 1;
        const month = new Date(Date.parse(e.target.value)).getMonth();
        const year =  new Date(Date.parse(e.target.value)).getFullYear();
        const nDate = new Date(year,month,day);
        setValueCheckOut(nDate.toISOString().substr(0, 10));

    }
    const handlePetChange = () => {
        /*clear to recalculate*/
        setValorTotal(0);
    }
   
    useEffect(() => {
        const total = Array.from(document.querySelectorAll('.pets select'))
            .map((el) => {
                const check = el.parentNode.parentNode.querySelector('input[type="checkbox"]:checked')
                    ? 20 : 0;
                return parseInt(el.value) + check;
            }).reduce((total, num) => {
                return total + Math.round(num);
            }, 0);

        const msDiff = new Date(Date.parse(valueCheckOut)).getTime() - new Date(valueCheckIn).getTime();
        const dayDiff = Math.floor(msDiff / (1000 * 60 * 60 * 24));
        const totalWithTaxi = (total * dayDiff)+(document.querySelector('#taxiDog').checked?valorTaxiDog:0);
        setValorTotal(totalWithTaxi);
    }, [valorTotal, pets, valueCheckOut, valueCheckIn]);



    return (
        <>
            <CurrentStyle />
            <form onSubmit={handleSubmmit}>
                <h2>Reservar</h2>
                <div className="user">
                    <div className="input">
                        <input type="text" name="nome"
                            required />
                        <label>Nome</label>
                    </div>
                    <div className="input">
                        <input type="email" name="email"
                            required />
                        <label>E-mail</label>
                    </div>
                    <div className="input">
                        <input
                            type="text" name="CPF" 
                            placeholder="00000000000"
                            pattern="[0-9]{11}"
                            required />
                        <label>CPF</label>
                    </div>
                    <div className="input">
                        <input type="phone" name="Telefone"
                            placeholder="00000000000"
                            pattern="[0-9]{11}" required />
                        <label>WhatsApp</label>
                    </div>
                    <div className="input">
                        <input type="text" name="Endereço"
                            required />
                        <label>Endereço completo</label>
                    </div>
                </div>

                <div className="pets dates">
                    <div className="input" >
                        <input type="date"
                            value={valueCheckIn}
                            min={new Date().toISOString().substr(0, 10)}
                            onChange={setCheckIn}
                            required />
                        <span>Check-In</span>
                    </div>
                    <div className="input">
                        <input type="date"
                            value={valueCheckOut}
                            min={minValueChekOut}
                            onChange={setCheckOut}
                            required />
                        <span>Check-Out</span>
                    </div>
                </div>
                <div className="pets taxiDog">
                    <label className="check" onChange={handlePetChange} htmlFor="taxiDog">
                        <input type="checkbox" id="taxiDog" />
                        Quero Taxi dog por R$ {valorTaxiDog},00 .
                    </label>
                </div>

                <h2>Seus Pets</h2>
                
                {pets.map(pet => (
                    <div className="pets list" key={pet}>
                        <div className="input">
                            <input type="text"
                                required />
                            <label>Nome</label>
                        </div>
                        <div className="input">
                            <select onChange={handlePetChange}>
                                <option value="60">0 - 10kg</option>
                                <option value="70">1 - 20kg</option>
                                <option value="80">21 - 30kg</option>
                                <option value="90">31 - 40kg</option>
                                <option value="100">Acima de 40kg</option>
                            </select>
                        </div>

                        <a href="javascirpt:void(0)"
                            title="Remover Pet"
                            onClick={() => removePet(pet)} >
                            &nbsp;<FaTrash />&nbsp;
                    </a>

                    <label className="check" onChange={handlePetChange} htmlFor={pet}>
                        <input type="checkbox" id={pet} />
                        Seu pet pessui alguma necessidade especial?
                    </label>

                    </div>
                ))}
                <button type="button" onClick={addPet}>
                    <span>
                        <FaPlus /> Incluir Pet <FaPaw />
                    </span>
                    <span>
                        Total de pets {pets.length}
                    </span>
                </button>
                <h2 style={{marginTop:32}}>Ou</h2>

                <button type="submit">
                    <span>
                        Enviar solicitação e concordar com o contrato <FaPaperPlane />
                    </span>
                    <span className="currency">
                        {valorTotal}
                    </span>
                </button>
                <p>
                Ao solicitar a reserva você estará de acordo com os
                <u><a href="https://hotels.wixapps.net/index.html?cacheKiller=1594056360090&commonConfig=%7B%22brand%22%3A%22wix%22%7D&compId=TPASection_k9ybd1w1&currency=BRL&deviceType=desktop&height=689&instance=e5WVCNh1iH6IOahFww_m0QJ_KSiY7jAcW9C_9ShbBXU.eyJpbnN0YW5jZUlkIjoiNmQ4ZWM1ZWUtNDM5Zi00ZDg3LWIyMDYtNzhlY2M2YjVjNjNjIiwiYXBwRGVmSWQiOiIxMzVhYWQ4Ni05MTI1LTYwNzQtNzM0Ni0yOWRjNmEzYzliY2YiLCJtZXRhU2l0ZUlkIjoiYjc3NTBhY2EtMTQ2NC00MjQwLWEyY2YtMzNlYmU3YzZmYzkwIiwic2lnbkRhdGUiOiIyMDIwLTA3LTA2VDIwOjU1OjUyLjcxMloiLCJ1aWQiOiI1YjM3ZTI2YS1jNjc4LTRhMTYtOGJjYS1hNzA2NDcwNmRkNGYiLCJwZXJtaXNzaW9ucyI6Ik9XTkVSIiwidmVuZG9yUHJvZHVjdElkIjoiaG90ZWxzIiwiZGVtb01vZGUiOmZhbHNlLCJiaVRva2VuIjoiZGFmYmNmMjQtNTdmYi0wZmM3LTEwYzktNGIwNzIxNzMzYWFjIiwic2l0ZU93bmVySWQiOiI1YjM3ZTI2YS1jNjc4LTRhMTYtOGJjYS1hNzA2NDcwNmRkNGYiLCJzaXRlTWVtYmVySWQiOiI1YjM3ZTI2YS1jNjc4LTRhMTYtOGJjYS1hNzA2NDcwNmRkNGYiLCJleHBpcmF0aW9uRGF0ZSI6IjIwMjAtMDctMDdUMDA6NTU6NTIuNzEyWiIsImxvZ2luQWNjb3VudElkIjoiNWIzN2UyNmEtYzY3OC00YTE2LThiY2EtYTcwNjQ3MDZkZDRmIn0&locale=pt&pageId=bmoxw&section-url=https%3A%2F%2Fhotels.wixapps.net%2Findex.html&siteRevision=298&target=_self&tz=America%2FSao_Paulo&viewMode=preview&viewerCompId=TPASection_k9ybd1w1&width=980&userLanguage=pt#/terms/78ada2c5-ab18-4bb0-ab29-20b27378b128"
                rel="noopener noreferrer"
                target="_blank"
                style={{color:'#000000'}}
                >Dados do contrato</a></u>
                </p>
                
            </form>
        </>
    )
}
