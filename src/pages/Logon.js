import React,{useState} from 'react';
import GlobalStyle from '../styles/global';
import {Container,Content} from '../styles'; 
import axios from 'axios';


export default ()=>{
    const [login,setLogin] = useState('');
    const [password,setPassword] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {
            const response = await axios.post(`${process.env.REACT_APP_TOOLLINK_API_URL}/auth/authenticate`,
            {
                "email":login,
                "password":password
            });
            const userData = {
                token: `Bearer ${response.headers["x-token"]}`,
                ...response.data
            }
            localStorage.setItem('user',JSON.stringify(userData));
            window.location.href="/LinksManager"
        } catch (error) {
            alert('Login ou senha incorreto');
        }
        
    }
    return (
        <Container>
        <Content>
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <input type="text" placeholder="Login" onChange={e=>setLogin(e.target.value)}/>
                <input type="password" placeholder="Senha" onChange={e=>{setPassword(e.target.value)}} />
                <button type="submit">Entrar</button>
            </form>
        </Content>
        <GlobalStyle/>
        </Container>
    )
    
}