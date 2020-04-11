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
`