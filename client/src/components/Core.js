import { Link } from "react-router-dom";
import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  max-width: 980px;
  padding: 20px;
  margin: 0 auto;
`;

export const HeaderContainer = styled.div`
  padding: 0px 20px;
  display: flex;
  justify-content: space-between;
  background-color: #3f51b5;
  color: #fff;

  & a {
    display: inline-block;
    padding: 15px 0;
    text-decoration: none;
    margin-left: 20px;
    color: #ecf0f1;
  }

  & a:hover {
    text-decoration: underline;
  }

  & .is-active {
    color: #f39c12;
  }
`;

export const Title = styled.h1`
  margin: 0;
  margin-bottom: 20px;
  text-align: ${(props) => (props.center ? "center" : "left")};
`;

export const Title2 = styled(Title).attrs({ as: "h2" })`
  margin-bottom: 10px;
`;

export const FormBox = styled.div`
  margin-top: 30px;
  flex: 0 0 400px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 5px 20px 0 #444;
`;

export const Form = styled.form`
  margin: 0;
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Button = styled.button`
  padding: 10px;
  border: none;
  border-radius: 3px;
  box-shadow: 0 2px 5px 0 #444;
  color: #fff;
  background-color: #3f51b5;
  cursor: pointer;
  outline: 0;
`;

export const ButtonLink = styled(Button).attrs({ as: Link })`
  text-decoration: none;
`;

export const Input = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #666;
  border-radius: 3px;
  margin-bottom: 10px;
  outline: 0;
  font-size: 15px;
`;

export const Select = styled(Input).attrs({ as: "select" })``;
export const TextArea = styled(Input).attrs({ as: "textarea" })``;

export const Message = styled.div`
  padding: 10px;
  border: none;
  background-color: #27ae60;
  box-shadow: 0 2px 5px 0 #444;
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
`;
