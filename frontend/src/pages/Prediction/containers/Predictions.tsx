import React from "react";
// import styled from "styled-components";
import ChampionPanel from "../components/ChampionPanel";
import InnerOval from "../../../images/Inner Oval.png"
import OuterOval from "../../../images/Outer Oval.png"
import OvalInside from "../../../images/Oval Inside.png"
import PredictBox from "../../../images/Predict Box.png"
import PredictBoxLeft from "../../../images/Predict Box Side.png"
import { ChampToKey } from "../../../constants/ChampToKey"

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
  private el: any;

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

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'auto' });
    document.body.style.overflow = 'hidden';
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
      } else {
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
    if (!this.state.friendlyTeam.includes("") && !this.state.enemyTeam.includes("")) {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          "Access-Control-Allow-Headers": "*"
        },
        body: JSON.stringify({
          "redTop": ChampToKey[this.state.friendlyTeam[0] as keyof typeof ChampToKey],
          "redJungle": ChampToKey[this.state.friendlyTeam[1] as keyof typeof ChampToKey],
          "redMid": ChampToKey[this.state.friendlyTeam[2] as keyof typeof ChampToKey],
          "redAdc": ChampToKey[this.state.friendlyTeam[3] as keyof typeof ChampToKey],
          "redSupport": ChampToKey[this.state.friendlyTeam[4] as keyof typeof ChampToKey],
          "blueTop": ChampToKey[this.state.enemyTeam[0] as keyof typeof ChampToKey],
          "blueJungle": ChampToKey[this.state.enemyTeam[1] as keyof typeof ChampToKey],
          "blueMid": ChampToKey[this.state.enemyTeam[2] as keyof typeof ChampToKey],
          "blueAdc": ChampToKey[this.state.enemyTeam[3] as keyof typeof ChampToKey],
          "blueSupport": ChampToKey[this.state.enemyTeam[4] as keyof typeof ChampToKey],
        })
      };

      this.setState({
        isLoading: true,
        submitted: true
      }, () => {
        fetch('https://prediction-wvdj36m4qa-uc.a.run.app/predictWinner', requestOptions)
          .then(response => response.json())
          .then(async data => {
            console.log(data)
            this.setState({
              isLoading: false,
              winPercentage: data
            })
          });
      })
    }
  }

  reset() {
    this.setState({
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
      <div style={{
        zIndex: 5,
        width: "100%",
        height: "84vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <div className="loader" />
      </div>
      :
      <div style={{
        zIndex: 5,
        width: "100%",
        height: "84vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}>
        <p style={{
          color: "#7b775b",
          textAlign: "center",
          fontSize: "30pt",
          fontFamily: "Courier New",
          margin: 0
        }}>You have a</p>
        <p style={{
          color: winColor,
          textAlign: "center",
          fontSize: "100pt",
          fontFamily: "Courier New",
          margin: 0
        }}>{winPercentageFormatted}%</p>
        <p style={{
          color: "#7b775b",
          textAlign: "center",
          fontSize: "30pt",
          fontFamily: "Courier New",
          margin: 0
        }}>chance of winning</p>

        <button className="resetBtn" onClick={this.reset}>Reset</button>
      </div>

    return (
      // Background
      <div className="backgroundImg">

        <div style={{ display: "flex", justifyContent: "center", height: "100vh", paddingTop: "6.5vh" }}>

          {/* Friendly panel */}
          <div style={{ width: "25%", display: "flex", justifyContent: "center" }}>
            <ChampionPanel isLeftSide={true} selectBox={this.selectingFriendly}
              champions={this.state.friendlyTeam} />
          </div>

          {/* Centre panel */}
          <div style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "50%",
            height: "93.5vh",
            position: "relative",
          }}>

            <div style={{
              width: "100%", position: "relative"
            }}>

              {/* Centre panel background */}
              <img style={{ zIndex: 4, position: "absolute", width: "100%", height: "100%" }} src={OuterOval}
                className="centered" alt="" />
              <img style={{ zIndex: 4, position: "absolute", width: "100%", height: "100%" }} src={InnerOval}
                className="centered" alt="" />
              <img style={{ zIndex: 3, position: "absolute", width: "100%", height: "100%" }} src={OvalInside}
                className="centered" alt="" />

              {this.state.submitted ? resultsPage :
                (
                  <div>
                    {/* Scrollable list of champions with search bar */}
                    <div style={{ zIndex: 50, position: "relative" }}>
                      <ChampionScroll selectChamp={this.selectChamp} />
                    </div>

                    <div style={{
                      height: "9vh",
                      width: "100%",
                      display: "flex",
                      position: "relative",
                      justifyContent: "center",
                      alignItems: "flex-end"
                    }}>

                      {/* Predict Button */}
                      <img style={{ width: "25%", height: "70%", zIndex: 50 }} src={PredictBox}
                        onClick={this.predict} alt="" />
                      <p onClick={this.predict} style={{
                        zIndex: 100,
                        fontWeight: "bold",
                        textAlign: "center",
                        position: "absolute",
                        bottom: -18,
                        color: "#b8bcbd",
                        fontFamily: 'Garamond',
                        fontSize: "22pt"
                      }}>
                        PREDICT
                                        </p>

                      <img style={{
                        zIndex: 50,
                        position: "absolute",
                        height: "50%",
                        width: "4.35%",
                        bottom: "18%",
                        left: "35.2%"
                      }} src={PredictBoxLeft} alt="" />
                      <img style={{
                        zIndex: 50,
                        position: "absolute",
                        height: "50%",
                        width: "4.3%",
                        bottom: "18%",
                        left: "60.5%",
                        transform: "scaleX(-1)"
                      }} src={PredictBoxLeft} alt="" />
                    </div>

                  </div>
                )}
            </div>
          </div>

          {/* Enemy Panel */}
          <div style={{ width: "25%", display: "flex", justifyContent: "center" }}>
            <ChampionPanel isLeftSide={false} selectBox={this.selectingEnemy}
              champions={this.state.enemyTeam} />
          </div>
        </div>
        <div ref={el => { this.el = el; }} />
      </div>
    );
  };
}

export default Predictions;