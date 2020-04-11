import React, { Component } from 'react';
import Dropzone from 'react-dropzone'

 import { DropContainer, UploadMenssage } from './styles';

export default class components extends Component {
    renderDragMessage = (isDragActive,isDragReject)=>{
        if(!isDragActive) 
            return <UploadMenssage>Selecione ou solte seus arquivos aqui.</UploadMenssage>

        if(isDragReject)
            return <UploadMenssage type="error">Arquivos não suportados</UploadMenssage>

        return <UploadMenssage type="success">Solte os arquivos aqui</UploadMenssage>
    }

  render() {

    const {onUpload} = this.props;

      return (
        <Dropzone accept="image/*" onDropAccepted={onUpload}>
            {({getRootProps,getInputProps,isDragActive,isDragReject})=>(
                    <DropContainer 
                      {...getRootProps()}
                      isDragActive={isDragActive}
                      isDragReject={isDragReject}
                      className="dropzone"
                      >
                          <input {...getInputProps()}/>
                          {this.renderDragMessage(isDragActive,isDragReject)}
                    </DropContainer>
                )
               
            }
        </Dropzone>
      )
      
  }
}
