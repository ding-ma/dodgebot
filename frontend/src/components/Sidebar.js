import React from "react";
import styled from "styled-components";
import Input from "./Input";

const Sidebar = () => {
  return (
    <Container>
      <Form>
        <h3>Select your champions!</h3>
        <Input type="champion" placeholder="champion 1" />
        <Input type="champion" placeholder="champion 2"  />
        <Input type="champion" placeholder="champion 3"  />
        <Input type="champion" placeholder="champion 4"  />
        <Input type="champion" placeholder="champion 5"  />
        <h3><br />Select your opponents!</h3>
        <Input type="champion" placeholder="opponent's champion 1" />
        <Input type="champion" placeholder="opponent's champion 2"  />
        <Input type="champion" placeholder="opponent's champion 3"  />
        <Input type="champion" placeholder="opponent's champion 4"  />
        <Input type="champion" placeholder="opponent's champion 5"  />
        <button>Predict</button>
      </Form>
    </Container>
  );
};


const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  h3 {
    color: #d7B568;
    margin-bottom: 2rem;
  }
  button {
    width: 75%;
    max-width: 300px;
    min-width: 250px;
    height: 40px;
    border: none;
    margin: 1rem 0;
    box-shadow: 0px 14px 9px -15px rgba(0, 0, 0, 0.25);
    border-radius: 8px;
    background-color: #74ccbe;
    color: #010a13;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease-in;
    &:hover {
      transform: translateY(-3px);
    }
  }
`;

const Container = styled.div`
  min-width: 550px;
  backdrop-filter: blur(5px);
  background-color: rgba(255, 255, 255, 0.1);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 0 2rem;
  @media (max-width: 900px) {
    width: 100vw;
    position: absolute;
    padding: 0;
  }
`;

export default Sidebar;