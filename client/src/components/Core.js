import { Link } from "react-router-dom";
import styled from "styled-components";

export const GlobalContainer = styled.div`
  display: flex;
  justify-content: center;
  max-width: 980px;
  padding: 20px;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
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
  position: relative;
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  flex: 0 0 400px;
  border-radius: 5px;
  padding: 20px;
  box-shadow: 0 5px 20px 0 #444;

  & a {
    text-decoration: none;
    text-align: center;
    margin-top: 10px;
    color: #3f51b5;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const Form = styled.form`
  margin: 0;
  margin-bottom: 10px;
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
  background-color: ${(props) => props.color || "#3f51b5"};
  cursor: pointer;
  outline: 0;
  margin: 0 5px;
`;

export const ButtonLink = styled(Button).attrs({ as: Link })`
  text-decoration: none;
`;

export const ButtonOption = styled(Button)`
  font-size: 15px;
  margin: 0 10px;
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
  background-color: ${(props) => props.color || "#27ae60"};
  box-shadow: 0 2px 5px 0 #444;
  margin-bottom: 10px;
  color: #fff;
  text-align: center;
`;

export const NoResults = styled.div`
  flex: 1;
  margin-top: 20px;
  text-align: center;
  font-weight: bold;
`;

export const DialogOverlay = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
`;

export const DialogBox = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  border: 1px solid #666;
  border-radius: 5px;
`;

export const DialogHead = styled.div`
  padding: 5px;
  text-align: center;
  font-weight: bold;
`;

export const DialogText = styled.div`
  padding: 10px;
  border-top: 1px solid #666;
  border-bottom: 1px solid #666;
`;

export const DialogAction = styled.div`
  padding: 10px;
  display: flex;
  justify-content: flex-end;
`;
