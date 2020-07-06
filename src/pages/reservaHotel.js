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
    width:100%;
    /*max-width:500px;
    margin:32px auto;
    padding:32px 64px;*/
    padding-right:10px;
    display:flex;
    flex-direction:column;
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
    var dateTomorrow = new Date();
    dateTomorrow.setDate(new Date().getDate() + 1);

    const [pets, setPets] = useState([new Date().getTime()]);
    const [valorTotal, setValorTotal] = useState(60);
    const [valueCheckIn, setValueCheckIn] = useState(new Date().toISOString().substr(0, 10));
    const [valueCheckOut, setValueCheckOut] = useState(dateTomorrow.toISOString().substr(0, 10));
    const [minValueChekOut, setMinValueCheckOut] = useState(dateTomorrow);
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
        window.open(`https://${mobileCheck?'api':'web'}.whatsapp.com/send?phone=5561981087386&text=${msg}`);
    }

    const mobileCheck = ()=> {
        let check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    };
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
        const nDate = new Date(new Date().setDate(new Date(Date.parse(e.target.value)).getDate() + 1));
        setValueCheckIn(nDate.toISOString().substr(0, 10));
        const nDateCheckOut = new Date(new Date().setDate(nDate.getDate() + 1));
        setValueCheckOut(nDateCheckOut.toISOString().substr(0, 10));
        setMinValueCheckOut(nDateCheckOut.toISOString().substr(0, 10))
    }
    const setCheckOut = (e) => {
        const nDate = new Date(new Date().setDate(new Date(Date.parse(e.target.value)).getDate() + 1));
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
                        Enviar solicitação <FaPaperPlane />
                    </span>
                    <span className="currency">
                        {valorTotal}
                    </span>
                </button>
            </form>
        </>
    )
}
