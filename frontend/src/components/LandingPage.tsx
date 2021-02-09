import React from "react"
import { Component } from "react"
import dodgebotlogo from "../assets/Dodgebot Logo.png"
import lolLogo from "../assets/LoL Logo.png"
import start from "../assets/Start button.png"
import landing from "../assets/Landing.png"
import styled from "styled-components";

type LandingPageProps = {
    onStart: () => void
}

class LandingPage extends Component<LandingPageProps,{}> {

    render() {
        return (
            <Wrapper>
                <img alt="League of Legends Logo" src={lolLogo} width="23%"  />
                <img alt="Dodgebot Logo" style={{paddingTop:"1%"}} src={dodgebotlogo} width="50%" height="20%" />
                <img alt="Start button" style={{paddingTop: "6%"}} src={start} width="25%" height="20%" onClick={this.props.onStart} />
            </Wrapper>    
        );
    }
}
         
const Wrapper = styled.div`
  background-image: url(${landing});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;

export default LandingPage;
