import React from "react";
// import styled from "styled-components";
import ChampionPanel from "../components/ChampionPanel";
import InnerOval from "../../../images/Inner Oval.png"
import OuterOval from "../../../images/Outer Oval.png"
import OvalInside from "../../../images/Oval Inside.png"
import PredictBox from "../../../images/Predict Box.png"
import PredictBoxLeft from "../../../images/Predict Box Side.png"
import {ChampToKey} from "../../../constants/ChampToKey"

import '../styles/Predictions.css'
import ChampionScroll from "../components/ChampionScroll";

var selectingTeam: string | null = null
var selectingRole: number | null = null

type PredictionsState = {
  friendlyTeam: string[]
  enemyTeam: string[]
  submitted: Boolean
  isLoading: Boolean
  winPercentage: number | null
}

class Predictions extends React.Component<{}, PredictionsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      friendlyTeam: ["", "", "", "", ""],
      enemyTeam: ["", "", "", "", ""],
      submitted: false,
      isLoading: false,
      winPercentage: null
    }

    this.selectChamp = this.selectChamp.bind(this)
    this.predict = this.predict.bind(this)
    this.reset = this.reset.bind(this)
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
    let temp;
    if (ChampToKey[champ as keyof typeof ChampToKey] === undefined) {
      console.log(champ)
    }

    if (selectingTeam != null && selectingRole != null) {
      if (selectingTeam === "friendly") {
        temp = this.state.friendlyTeam;
        temp[selectingRole] = champ
        this.setState({
          friendlyTeam: temp
        })
      }
      else {
        temp = this.state.enemyTeam;
        temp[selectingRole] = champ
        this.setState({
          enemyTeam: temp
        })
      }
    }
  }

  // Predict Winner
  predict() {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', "Access-Control-Allow-Headers": "*"
      },
      body: JSON.stringify({ title: 'React POST Request Example' })
    };

    this.setState({
      isLoading: true,
      submitted: true
    }, () => {
      fetch('https://us-central1-ordinal-cacao-291815.cloudfunctions.net/predict-function', requestOptions)
        .then(response => response.json())
        .then(async data => {
          this.setState({
            isLoading: false,
            winPercentage: data["winPercentage"]
          })
        });
    })
  }

  reset() {
    this.setState({
      friendlyTeam: ["", "", "", "", ""],
      enemyTeam: ["", "", "", "", ""],
      submitted: false,
      isLoading: false,
      winPercentage: null
    })
  }

  render() {
    var winColor = "white"
    var winPercentageFormatted = 0
    if (this.state.winPercentage != null) {
      winColor = this.state.winPercentage >= 0.5 ? "green" : "red"
      winPercentageFormatted = Math.round(this.state.winPercentage * 1000) / 10
    }


    var resultsPage = this.state.isLoading ?
      <div style={{ zIndex: 5, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <div className="loader"/>
      </div>
      :
      <div style={{ zIndex: 5, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "#7b775b", textAlign: "center", fontSize: "30pt", fontFamily: "Courier New", margin: 0 }}>You have a</p>
        <p style={{ color: winColor, textAlign: "center", fontSize: "100pt", fontFamily: "Courier New", margin: 0 }}>{winPercentageFormatted}%</p>
        <p style={{ color: "#7b775b", textAlign: "center", fontSize: "30pt", fontFamily: "Courier New", margin: 0 }}>chance of winning</p>

        <button className="resetBtn" onClick={this.reset}>Reset</button>
      </div>

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

            {/* Centre panel background */}
            <img style={{ zIndex: 4, position: "absolute", width: "90%", height: "100%" }} src={OuterOval} className="centered" alt=""/>
            <img style={{ zIndex: 4, position: "absolute", width: "90%", height: "100%" }} src={InnerOval} className="centered" alt=""/>
            <img style={{ zIndex: 3, position: "absolute", width: "90%", height: "100%" }} src={OvalInside} className="centered" alt=""/>

            {this.state.submitted ? resultsPage :
              (
                <div style={{ zIndex: 100, width: "100%"}}>
                  
                  {/* Scrollable list of champions with search bar */}
                  <div>
                    <ChampionScroll selectChamp={this.selectChamp}/>
                  </div>
                  <div style ={{height: "9vh",width: "100%", display: "flex", position: "relative", justifyContent: "center", alignItems: "flex-end"}}>



                    {/* Predict Button */}
                  <img style={{  width: "25%", height: "70%" }} src={PredictBox} onClick={this.predict} alt=""/>
                  <p onClick={this.predict} style={{zIndex: 100, fontWeight: "bold", textAlign: "center", position: "absolute", bottom: -18, color: "#b8bcbd", fontFamily: 'Garamond', fontSize: "22pt"}}>
                    PREDICT
                  </p>

                  <img style={{ position: "absolute", height: "50%", width: "4.35%", bottom: "18%", left: "35.2%" }} src={PredictBoxLeft} alt=""/>
                  <img style={{ position: "absolute", height: "50%", width: "4.3%", bottom: "18%", left: "60.5%", transform: "scaleX(-1)" }} src={PredictBoxLeft} alt=""/>

                  </div>
                </div>
              )
            }

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