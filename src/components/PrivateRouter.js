import React from  'react';
import {Redirect,Route} from 'react-router-dom';


export default (props)=>{
    return(
        localStorage.getItem('user')?
        <Route {...props}/>:
        <Redirect to={{
            pathname:"/",
            state:{ from : props.location }}} 
        />
    );
}