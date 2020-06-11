import React,{useState, useEffect} from 'react';
import GlobalStyle from '../styles/global';
import {Container,Content} from '../styles'; 
import axios from 'axios';
import queryString from 'query-string';

import {useParams} from 'react-router-dom'
export default (props)=>{
    const {id} = useParams();
    const {tag} = queryString.parse(props.location.search);
    const [searchInput, setSearchInput] = useState('');
    const [links,setLinks] = useState([]);
    const [mensage,setMensage] = useState('Buscando pagina solicitada...');

    useEffect(()=>{
        try {
            if(id)
                axios.get(`${process.env.REACT_APP_TOOLLINK_API_URL}/link/${id}`).then((response)=>{
                    window.location.href = response.data;
                })
            else{
                const tagSearch = tag ? `?tag=${tag}`:'';
                findByTag(tagSearch);
            }
        } catch (error) {
            setMensage('Não foi possivel recuperar a pagia solicitada');
        }
        
    },[]);

    const findByTag = (tagSearch)=>{
        axios.get(`${process.env.REACT_APP_TOOLLINK_API_URL}/links${tagSearch}`).then((response)=>{
            setLinks(response.data);
            setMensage(`${response.data.length} de paginas encontradas com a tag ${tag}`)
        })
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        findByTag(searchInput);
    }
    return (
        <>
            <Container>
                <Content>
                    <h1>{mensage}</h1>
                    {!id && (
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="" 
                            onChange={e=>{setSearchInput(e.target.value?`?tag=${e.target.value}`:'')}}/>
                            <button type="submit">Pesquisar</button>
                        </form>
                    )}
                    <ul>
                        {links.map(link=>(
                            <li className="tag" key={link.id}>
                                <div>
                                    <a target="_blank" href={link.link}><h4>#{link.id} - {link.title}</h4></a>
                                </div>
                                <div>
                                    <p>{link.description}</p>
                                </div>
                                {link.tags.map(tag => (<button key={link.id+tag.name} className="tag">{tag.name}</button>))}
                            </li>
                        ))}
                    </ul>
                </Content>
            </Container>
            <GlobalStyle/>
        </>
    );

}