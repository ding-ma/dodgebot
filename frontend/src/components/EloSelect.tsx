import React from "react"
import { Component } from "react"
import eloselectimg from "../assets/EloSelectImg.png"
import iron from "../assets/rank logos/Iron.png"
import bronze from "../assets/rank logos/Bronze.png"
import silver from "../assets/rank logos/Silver.png"
import gold from "../assets/rank logos/Gold.png"
import plat from "../assets/rank logos/Plat.png"
import diamond from "../assets/rank logos/Diamond.png"
import master from "../assets/rank logos/Master.png"
import grandmaster from "../assets/rank logos/Grandmaster.png"
import challenger from "../assets/rank logos/Challenger.png"
import styled from "styled-components";

type EloSelectState = {
    onEloSelect: (elo: String) => void
}

class EloSelect extends Component<EloSelectState,{}> {

    render() {
        const rankImgs = {
            height: "90%"
          };        
          return (
            <Wrapper>
                <h1 style={{color: "white", paddingTop: "1.3%", fontFamily: "Courier New", fontSize: "250%"}}> Choose your rank!</h1>

                <div style={{ paddingTop: "4%"}}>
                    <img alt="Iron" src={iron} style={rankImgs} onClick={() => this.props.onEloSelect("IRON")}/>
                    <img alt="Bronze" src={bronze} style={rankImgs} onClick={() => this.props.onEloSelect("BRONZE")}/>
                    <img alt="Silver" src={silver} style={rankImgs} onClick={() => this.props.onEloSelect("SILVER")}/>
                    <img alt="Gold" src={gold} style={rankImgs} onClick={() => this.props.onEloSelect("GOLD")}/>
                    <img alt="Plat" src={plat} style={rankImgs} onClick={() => this.props.onEloSelect("PLATINUM")}/>
                </div>

                <div >
                    <img alt="Diamond" src={diamond} style={rankImgs} onClick={() => this.props.onEloSelect("DIAMOND")}/>
                    <img alt="Master" src={master} style={rankImgs} onClick={() => this.props.onEloSelect("MASTER")}/>
                    <img alt="Grandmaster" src={grandmaster} style={rankImgs} onClick={() => this.props.onEloSelect("GRAND-MASTER")}/>
                    <img alt="Challenger" src={challenger} style={rankImgs} onClick={() => this.props.onEloSelect("CHALLENGER")}/>
                </div>

            </Wrapper>    
        );
    }
}

const Wrapper = styled.div`
  background-image: url(${eloselectimg});
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
`;
        
export default EloSelect;
