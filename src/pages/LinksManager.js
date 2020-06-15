import React,{useState, useEffect} from 'react';
import GlobalStyle from '../styles/global';
import {Container,Content} from '../styles'; 
import axios from 'axios';

export default ()=>{
    const [links,setLinks] = useState([]);
    const [link,setLink] = useState({});
    const user = localStorage.getItem('user')? JSON.parse(localStorage.getItem('user')):{token:''};
    const configHeader = {
        headers:{
            Authorization:user.token
        }
    };
    
    const handleChange = (e)=>{
        setLink({...link,[e.target.name]:e.target.value});
    }

    useEffect(()=>{
        try {
            axios.get(`${process.env.REACT_APP_TOOLLINK_API_URL}/tools`,configHeader).then((response)=>{
                
                setLinks(response.data);
            });
            
        } catch (error) {
            console.log(error);
        }
            
    },[configHeader]);

    const removeTool = async (id)=>{
        try {
            if(window.confirm('Tem certeza que deseja excluir este link?')){
                await axios.delete(`${process.env.REACT_APP_TOOLLINK_API_URL}/tools/${id}`,configHeader);
                alert('Registro excluido com sucesso!');
                window.location.reload();
            }
            
        } catch (error) {
            console.log({error});
            alert('Não foi possivel deletar o registro!');
        }
    }
    const handleSubmit = async (e)=>{
        try {
            e.preventDefault();

            link.tags = (link.tags && typeof("link.tags") === "string") ? 
            link.tags.split(' ').map(tag => (tag))
            :[];
            await axios.post(`${process.env.REACT_APP_TOOLLINK_API_URL}/tools`,link,configHeader);
            alert('Registro salvo com sucesso!');
            window.location.reload();
        } catch (error) {
            console.log({error});
            alert('Não foi possivel salvar os dados!');
        }
    }

    return(
        <Container>
            <Content>
            <h1>Links</h1>
                <ul>
                    <li>
                        <form onSubmit={handleSubmit}>
                            <div>
                                <input required type="text" placeholder="Titulo" name="title" onChange={handleChange}/>
                                <input required type="text" placeholder="url" name="link"onChange={handleChange}/>
                            </div>
                            <div>
                                <textarea required placeholder="Descrição" name="description" onChange={handleChange}></textarea>
                                <textarea required placeholder="Tags" name="tags" onChange={handleChange}></textarea>
                            </div>
                            <div>
                                <button type="submit">Incluir</button>
                            </div>
                        </form>
                        <br/>
                        <hr/>
                    </li>
                    {
                        links.map(link =>(
                            <li key={link.id}>
                                <div>
                                    <h4 style={{maxWidth:'50px'}}>{link.id}</h4>
                                    <h4>{link.title}</h4>
                                    <h4>{link.link}</h4>
                                </div>
                                <div>
                                    <p>{link.description}</p>
                                </div>

                                {link.tags.map(tag => (<button key={link.id+tag.name} className="tag">{tag.name}</button>))}
                                
                                <div>
                                    <button className="danger" onClick={()=>{removeTool(link.id)}}>Remover Link</button>
                                </div>
                                <br/>
                                <hr/>
                            </li>
                        ))
                    }
                </ul>
                </Content>
        <GlobalStyle/>
        </Container>
        
    )
}