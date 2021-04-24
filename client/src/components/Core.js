import styled from "styled-components";

export const Container = styled.div``;

export const Header = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #3f51b5;
  color: #fff;

  & a {
    text-decoration: none;
    margin-left: 20px;
    color: #ecf0f1;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .is-active {
    color: #000;
  }
`;

export const Button = styled.button`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 #444;
  color: #fff;
  background-color: #3f51b5;
  cursor: pointer;
  outline: 0;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #444;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: 0;
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

export const Form = styled.form`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;
