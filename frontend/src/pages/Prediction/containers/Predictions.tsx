import React from "react";
import styled from "styled-components";
import ChampionPanel from "./ChampionPanel";
import InnerOval from "../../../images/Inner Oval.png"
import OuterOval from "../../../images/Outer Oval.png"
import OvalInside from "../../../images/Oval Inside.png"
import PredictBox from "../../../images/Predict Box Text.png"
import PredictBoxLeft from "../../../images/Predict Box Side.png"
import { ChampToKey } from "C:/Users/Petar Basta/Documents/McGill/U4/ECSE 458/dodgebot/frontend/src/constants/ChampToKey"

import './Predictions.css'
import ChampionScroll from "./ChampionScroll";

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
    if (ChampToKey[champ as keyof typeof ChampToKey] === undefined) {
      console.log(champ)
    }

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
        <div className="loader"></div>
      </div>
      :
      <div style={{ zIndex: 5, width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
        <p style={{ color: "#7b775b", textAlign: "center", fontSize: "30pt", fontFamily: "Courier New", margin: 0}}>You have a</p>
        <p style={{ color: winColor, textAlign: "center", fontSize: "100pt", fontFamily: "Courier New", margin: 0 }}>{winPercentageFormatted}%</p>
        <p style={{ color: "#7b775b", textAlign: "center", fontSize: "30pt", fontFamily: "Courier New", margin: 0 }}>chance of winning</p>

        <button className="resetBtn"  onClick={this.reset}>Reset</button>
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
            <img style={{ zIndex: 4, position: "absolute", width: "90%", height: "100%" }} src={OuterOval} className="centered" />
            <img style={{ zIndex: 4, position: "absolute", width: "90%", height: "100%" }} src={InnerOval} className="centered" />
            <img style={{ zIndex: 3, position: "absolute", width: "90%", height: "100%" }} src={OvalInside} className="centered" />

            {this.state.submitted ? resultsPage :
              (
                <div style={{ zIndex: 5, width: "100%" }}>
                  {/* Predict Button */}
                  <img style={{ position: "absolute", height: "7.5%", width: "25%", bottom: 0, left: "37.5%" }} src={PredictBox} onClick={this.predict}></img>
                  <img style={{ position: "absolute", height: "5.5%", width: "4.3%", bottom: "1.8%", left: "35.2%" }} src={PredictBoxLeft}></img>
                  <img style={{ position: "absolute", height: "5.5%", width: "4.3%", bottom: "1.8%", left: "60.6%", transform: "scaleX(-1)" }} src={PredictBoxLeft}></img>

                  {/* Scrollable list of champions with search bar */}
                  <div>
                    <ChampionScroll selectChamp={this.selectChamp}></ChampionScroll>
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