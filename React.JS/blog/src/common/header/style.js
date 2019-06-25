import styled from 'styled-components';

export const HeaderWrapper = styled.div`
height: 56px;
min-width: 768px;
margin: 0 5%;
`;

export const Logo = styled.span`
float: left;
display: inline-block;
width: 15%;
min-width: 144px;
font-size: 36px;
line-height: 36px;
margin-top: 10px;
color: #79c1df;
`;
export const MenuList = styled.div`
display: inline-flex;
justify-content: space-between;
width: 70%;
height: 100%;
color: #333333;
margin-top: 0px;
vertical-align: middle;
`;

export const MenuWrapper = styled.div`
display: inline-block;
height: 100%;
`;

export const MenuItem = styled.div`
display: inline-block;
font-size: 17px;
line-height: 26px;
margin: 15px;
cursor: pointer;
&.active{
  color: #79c1df;
}
.menu-icon {
  margin-right: 5px;
}
`;

export const SearchWrapper = styled.div`
display: inline-block;
font-size: 17px;
line-height: 26px;
position: relative;
`;

export const SearchInput = styled.input.attrs({
  type:"text"
})`
padding: 0 40px 0 20px;
width: 160px;
height: 38px;
font-size: 14px;
border: 1px solid #eee;
border-radius: 40px;
background: #eee;
outline:medium;
&.focused {
  width: 240px;
}
&.grow-width-enter {
  transition: all .5s ease;
}
&.grow-width-exit {
  transition: all .5s ease;
}
`;

export const SearchOptions = styled.div`
width:240px;
margin-top: 10px;
position: absolute;
background-color: #fff;
box-shadow: 0 0 8px rgba(0,0,0,.2);
color: #969696;
font-size: 14px;
padding: 20px;
box-sizing: border-box;
border-radius: 5px;
`;

export const SearchOptionsTitle = styled.div`
width:100%;
height: 20px;
line-height: 20px;
cursor: default;
`;
export const SearchOptionsChange = styled.span`
float: right;
cursor: pointer;
`;

export const SearchOptionsTagList = styled.div`
width:100%;
margin-top: 10px;
display: flex;
flex-wrap: wrap;
justify-content: flex-start;
`;

export const SearchOptionsTag = styled.span`
display: inline-block;
margin-right: 10px;
margin-top: 10px;
border-radius: 3px;
padding: 2px 6px;
border: 1px solid #ddd;
font-size: 12px;
color: #787878;
cursor: pointer;
&:hover{
    color: #333;
    border-color: #b4b4b4;
}
`;


export const HeaderOptions = styled.div`
display: inline-block;
font-size: 17px;
width: 15%;
height: 100%;
overflow: hidden;
vertical-align: middle;
`;

export const ButtonGroup = styled.div`
display: block;
height: 100%;
.lee-btn {
margin:8px 10px;
font-size: 17px;
}
`;