import styled from 'styled-components';

export const Container = styled.ul`
  margin-top:20px;
  li{
      display:flex;
      justify-content: space-between;
      align-items:center;
      color:#eeeeee;
      & + li{
          margin-top:15px;
      }
  }
`;

export const FileInfo = styled.div`
    display:flex;
    align-content:center;
    div{
        display:flex;
        flex-direction:column;
        span{
            font-size: 12px;
            color:#eeeeee;
            margin-top:5px;
            button{
                border:none;
                box-shadow:none;
                background:transparent;
                color:#d65a31;
                margin-left:5px;
                padding:0;
                cursor:pointer;
            }
        }
    }
`;
export const Preview = styled.div`
    width:36px;
    height:36px;
    border-radius:5px;
    background-image:url('${props=>props.src}');
    background-size:cover; 
    background-repeat:no-repeat;
    background-position:50% 50%;
    margin-right:10px;
`;
