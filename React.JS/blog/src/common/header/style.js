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