import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import {MdCheckCircle,MdError,MdLink} from 'react-icons/md'

import { Container,FileInfo,Preview } from './styles';

const FileList = ({files,onDelete}) => (
    <Container>
        {files.map(uploadedFile=>(
            <li key={uploadedFile.id}>
                <FileInfo>
                    <Preview src={uploadedFile.preview}/>
                    <div>
                        <strong title={uploadedFile.name}>{
                        uploadedFile.name.length<25
                        ?uploadedFile.name
                        :`... ${uploadedFile.name.substr(uploadedFile.name.length-25,uploadedFile.name.length)}`
                        }</strong>
                        <span>
                            {uploadedFile.readebleSize}
                            {!!uploadedFile.url && (
                                <button onClick={()=> onDelete(uploadedFile.id) }>Excluir</button>
                            ) }
                            
                        </span>
                    </div>
                </FileInfo>
                <div>
                    {!uploadedFile.uploaded && !uploadedFile.error &&(
                        <CircularProgressbar 
                        styles={
                            {
                                root:{width:24,verticalAlign: 'unset'},
                                path:{stroke:'#d65a31'},
                                
                            }
                        }
                        strokeWidth={24}
                        value={uploadedFile.progress}
                        />
                    )}
                    {uploadedFile.url && (
                        <a href={uploadedFile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                            <MdLink style={{marginRight:8}} size={24} color="#eeeeee"/>
                        </a>
                    )}
                    {uploadedFile.uploaded && (
                        <MdCheckCircle size={24} color="#222831"/>
                    )}
                    {uploadedFile.error && (
                        <MdError size={24} color="#d65a31"/>
                    )}
                    
                </div>
            </li>
        ))}
        
    </Container>
);

export default FileList;
