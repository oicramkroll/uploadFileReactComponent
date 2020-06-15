import { createGlobalStyle} from 'styled-components';
import 'react-circular-progressbar/dist/styles.css';
export default createGlobalStyle`
*{
    margin:0;
    padding:0;
    box-sizing:border-box;
}
body{
    font-family: Arial, Helvetica, sans-serif;
    font-size:14px;
    background: #222831;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialalised;
    color:#eeeeee
}

html,body,#root{
    height:100%;
}
input,textarea,select,span{
    padding: 5px;
    margin: 15px 0px;
    background-color: rgba(0, 0, 0, 0.1);
    border:dashed 1px;
    width:100%;
    color:#ccc;
}
button{
    cursor: pointer;
    background:#393e46;
    border-radius:4px;
    border:solid 1px #222831;
    min-width:100px;
    padding:10px;
    color:#ccc;
    -webkit-box-shadow: 0px 5px 55px 0px rgba(0,0,0,0.75);
  -moz-box-shadow: 0px 5px 55px 0px rgba(0,0,0,0.75);
  box-shadow: 0px 5px 5px 0px rgba(0,0,0,0.75);
}
span{
    display:flex;
    justify-content: space-between;
}
li{
    list-style:none;
    line-height: 2;
}
li div {
    display: flex;
    justify-content: space-between;
    width: auto;
    margin: 5px;
}
li div *{
    margin: 0 5px;
}
.tag{
    margin:5px;
    padding:2px;
    -webkit-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.75);
    box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.75);
}
.danger{
    background-color:red;
}
a{
    color:#ccc;
}
.btnLink{
    text-decoration: none;
    border: none;
    box-shadow: none;
    padding: 0;
    width: auto;
    min-width: auto;
}
`