import React from "react";
import styled from "styled-components";
import ChampionPanel from "./ChampionPanel";

var selectingTeam: string | null = null
var selectingRole: number | null = null

var listOfChampions: string[] = [];

type PredictionsState = {
  friendlyTeam: string[],
  enemyTeam: string[]
}

class Predictions extends React.Component<{}, PredictionsState> {

  constructor(props: any) {
    super(props)
    this.state = {
      friendlyTeam: ["", "", "", "", ""],
      enemyTeam: ["", "", "", "", ""]
    }
    console.log(this.state)
  }
  componentWillMount() {
    var listOfImages = (require.context('../../../../public/ChampionIcons/', false, /\.(png|jpe?g|svg)$/)).keys();
    listOfImages = listOfImages.map((image: string) => image.replace("./", ""))
    listOfChampions = listOfImages.map((image: string) => image.replace("Square.png", ""))
  }

  selectingFriendly(number: number) {
    selectingTeam = "friendly"
    selectingRole = number
    console.log(selectingTeam)
    console.log(selectingRole)

  }

  selectingEnemy(number: number) {
    selectingTeam = "enemy"
    selectingRole = number
  }

  selectChamp(champ: string) {
    console.log(champ)
    console.log(selectingTeam)
    console.log(selectingRole)
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

  render() {
    return (
      <Container>
        <Form>
          {/* <div style={{display: "flex", backgroundImage:`url(${Background})`}}> */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>

            <ChampionPanel isLeftSide={true} selectBox={this.selectingFriendly} champions={this.state.friendlyTeam}></ChampionPanel>
            <div style={{ width: "800px", height: "500px", border: "1px solid black" }}>

              <div style={{ height: "500px", display: "flex", flexWrap: "wrap", overflowY: "auto" }}>
                {listOfChampions.map(
                  (image: string, index: any) =>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                      <img style={{ height: "100px", width: "100px" }} key={index} src={`../ChampionIcons/` + image + `Square.png`} alt="info" onClick={() => this.selectChamp(image)}></img>

                      {image}
                    </div>)
                }
              </div>



              <button>Predict</button>
            </div>
            <ChampionPanel isLeftSide={false} selectBox={this.selectingEnemy} champions={this.state.enemyTeam}></ChampionPanel>
          </div>
        </Form>
      </Container>
    );
  };
}







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

export default Predictions;