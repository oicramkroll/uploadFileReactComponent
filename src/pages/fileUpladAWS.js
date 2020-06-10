import React,{Component} from 'react';
import GlobalStyle from '../styles/global';
import {Container,Content} from '../styles'; 
import {uniqueId} from 'lodash';
import fileSize from  'filesize';
import Upload from '../components/Upload';
import FileList from '../components/FileList';

import api from '../services/api';


class App extends Component {
  state ={
    uploadedFiles:[]
  }
  async componentDidMount(){
    const response = await api.get('posts');
    this.setState({
      uploadedFiles: response.data.map(file=>({
        id:file._id,
        name:file.name,
        readebleSize: fileSize(file.size),
        preview:file.url,
        uploaded:true,
        url:file.url
        
      }))
    })
  }

  handleUpload = files =>{
    const listFiles = files.map(file=>({
      file,
      id: uniqueId(),
      name:file.name,
      readebleSize:fileSize(file.size),
      preview:URL.createObjectURL(file),
      progress:0,
      uploaded:false,
      error:false,
      url:null
    }));

   this.setState({
     uploadedFiles:this.state.uploadedFiles.concat(listFiles)
   });

   listFiles.forEach(this.processUpload);
  }
  updateFile = (id,data)=>{
    this.setState({uploadedFiles:this.state.uploadedFiles.map(uploadedFile => {
      return id === uploadedFile.id ? {...uploadedFile, ...data}: uploadedFile
    })})
    
  }
  processUpload = file =>{
    const data = new FormData();
    data.append('file',file.file,file.name);
    api.post('posts',data,{
      onUploadProgress: e =>{
        const progress = parseInt(Math.round((e.loaded * 100) / e.total));
        this.updateFile(file.id,{progress});
      }
    })
    .then(response =>{
      this.updateFile(file.id,{
        uploaded:true,
        id:response.data._id,
        url:response.data.url
      })
    })
    .catch(()=>{
      this.updateFile(file.id,{
        error:true
      })
    })

  }
  handleDelete = async id =>{
    await api.delete(`posts/${id}`);
    this.setState({
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    })
  }

  componentWillUnmount(){
    this.state.uploadedFiles.forEach(file=> URL.revokeObjectURL(file.preview));
  }

  render(){
    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload}/>
          {!! this.state.uploadedFiles.length && (
            <FileList files={this.state.uploadedFiles} onDelete={this.handleDelete}/>
          )}
        </Content>
        <GlobalStyle/>
      </Container>
    )
  }
}

export default App;
