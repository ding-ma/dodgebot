import React from "react";
import styled from "styled-components";
import ChampionPanel from "./ChampionPanel";
import InnerOval from "../../../images/Inner Oval.png"
import OuterOval from "../../../images/Outer Oval.png"
import OvalInside from "../../../images/Oval Inside.png"
import PredictBox from "../../../images/Predict Box Text.png"
import PredictBoxLeft from "../../../images/Predict Box Side.png"

import './Predictions.css'
import ChampionScroll from "./ChampionScroll";

var selectingTeam: string | null = null
var selectingRole: number | null = null

type PredictionsState = {
  friendlyTeam: string[],
  enemyTeam: string[],

}

class Predictions extends React.Component<{}, PredictionsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      friendlyTeam: ["", "", "", "", ""],
      enemyTeam: ["", "", "", "", ""],
    }

    this.selectChamp = this.selectChamp.bind(this)
  }

  // When selecting friendly champ
  selectingFriendly(number: number) {
    selectingTeam = "friendly"
    selectingRole = number
  }

  // When selecting enemy champ
  selectingEnemy(number: number) {
    selectingTeam = "enemy"
    selectingRole = number
  }

  // Chooses champ
  selectChamp(champ: string) {
    if (selectingTeam != null && selectingRole != null) {
      if (selectingTeam == "friendly") {
        var temp = this.state.friendlyTeam
        temp[selectingRole] = champ
        this.setState({
          friendlyTeam: temp
        })
      }
      else {
        var temp = this.state.enemyTeam
        temp[selectingRole] = champ
        this.setState({
          enemyTeam: temp
        })
      }
    }
  }

  // Predict Winner
  predict() {
    console.log("predict")
  }

  render() {
    return (
      // Background
      <div className="backgroundImg"  >

        <div style={{ display: "flex", justifyContent: "center", margin: "6.5vh" }}>

          {/* Friendly panel */}
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <ChampionPanel isLeftSide={true} selectBox={this.selectingFriendly} champions={this.state.friendlyTeam}></ChampionPanel>
          </div>

          {/* Centre panel */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "60%", height: "85vh", marginTop: "4vh", position: "relative" }}>

            {/* Scroll Background */}
            <img style={{ zIndex: 4, position: "absolute", width: "90%", height: "100%" }} src={OuterOval} className="centered" />
            <img style={{ zIndex: 4, position: "absolute", width: "90%", height: "100%" }} src={InnerOval} className="centered" />
            <img style={{ zIndex: 3, position: "absolute", width: "90%", height: "100%" }} src={OvalInside} className="centered" />

            {/* Predict Button */}
            <img style={{ zIndex: 6, position: "absolute", height: "7.5%", width: "25%", bottom: 0, left: "37.5%" }} src={PredictBox} onClick={this.predict}></img>
            <img style={{ zIndex: 6, position: "absolute", height: "5.5%", width: "4.65%", bottom: "1.8%", left: "35%" }} src={PredictBoxLeft}></img>
            <img style={{ transform: "scaleX(-1)", zIndex: 6, position: "absolute", height: "5.5%", width: "4.3%", bottom: "1.8%", left: "60.6%" }} src={PredictBoxLeft}></img>

            {/* Scrollable list of champions with search bar */}
            <div style={{ zIndex: 5, width: "100%" }}>
              <ChampionScroll selectChamp={this.selectChamp}></ChampionScroll>
            </div>
          </div>

          {/* Enemy Panel */}
          <div style={{ width: "20%", display: "flex", justifyContent: "center" }}>
            <ChampionPanel isLeftSide={false} selectBox={this.selectingEnemy} champions={this.state.enemyTeam}></ChampionPanel>
          </div>
        </div>
      </div>
    );
  };
}

export default Predictions;