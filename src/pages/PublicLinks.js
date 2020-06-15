import React,{useState, useEffect} from 'react';
import {FaCopy} from 'react-icons/fa';
import GlobalStyle from '../styles/global';
import {Container,Content} from '../styles'; 
import axios from 'axios';
import queryString from 'query-string';
import {useParams} from 'react-router-dom';

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
                let tagSearch = tag ? `?tag=${tag}`:'';
                tagSearch = searchInput!==""?`?tag=${searchInput}`:tagSearch;
                axios.get(`${process.env.REACT_APP_TOOLLINK_API_URL}/links${tagSearch}`).then((response)=>{
                    setLinks(response.data);
                    setMensage(`${response.data.length} de paginas encontradas com a tag ${tag}`)
                })
            }
        } catch (error) {
            setMensage('Não foi possivel recuperar a pagia solicitada');
        }
        
    },[id,tag,searchInput]);

    const handleCopy = (id,url)=>{
        const spanTemp = document.createElement('sapn');
        spanTemp.setAttribute('id',`tool_${id}`);
        spanTemp.innerText = url;
        document.querySelector('body').appendChild(spanTemp);
        getSelection().removeAllRanges();
        var range = document.createRange();
        range.selectNodeContents(spanTemp);
        getSelection().addRange(range);
        document.execCommand("copy");
        spanTemp.remove();
    }
    const handleSubmit = (e)=>{
        e.preventDefault();
        setSearchInput(document.querySelector('form input').value);
    }
    return (
        <>
            <Container>
                <Content>
                    <h1>{mensage}</h1>
                    {!id && (
                        <form onSubmit={handleSubmit}>
                            <input type="text" placeholder="Tags" />
                            <button type="submit">Pesquisar</button>
                        </form>
                    )}
                    <ul>
                        {links.map(link=>(
                            <li className="tag" id={`tool_${link.id}`} key={link.id}>
                                <div>
                                    <a target="_blank"
                                    rel="noopener noreferrer"
                                    href={link.link}>
                                        <h4>#{link.id} - {link.title}</h4>
                                        
                                    </a>
                                    
                                    <button className="btnLink" onClick={()=> {handleCopy(link.id,link.link)}} >
                                    <FaCopy/>
                                    </button>
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