import styled,{css} from 'styled-components';

const dragActive = css`
    border-color:#eeeeee;
`;
const dragReject = css`
    border-color:#d65a31;
`;

export const DropContainer = styled.div.attrs({className:'dropzone'})`
  border: 2px dashed #222831;
  border-radius:4px;
  cursor: pointer;

  
  transition: height 0.2s ease;
  ${props => props.isDragActive && dragActive};
  ${props => props.isDragReject && dragReject};
`;

const messageColors = {
  default:'#eeeeee',
  success:'#78d5d5',
  error:'#d65a31'

}

export const UploadMenssage = styled.p`
  display:flex;
  color:${props=>messageColors[props.type || 'default']};
  justify-content:center;
  align-items:center;
  padding:15px 0;
`;
