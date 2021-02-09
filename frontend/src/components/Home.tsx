import React, { Component } from 'react';
import {IGame} from "../types/IGame";
import styled from "styled-components";
import LandingPage from './LandingPage';
import EloSelect from './EloSelect';

type HomeState = {
    start: boolean
    game: IGame
}

class Home extends Component<{},HomeState> {

    constructor(props: any){
        super(props)

        this.onStart = this.onStart.bind(this)

        this.state = {
            start: false,
            game: {
                "blueTeam":{
                    "roles":{
                        "top":null,
                        "mid":null,
                        "jg":null,
                        "adc":null,
                        "sup":null
                    },
                    "bans":{
                        "ban1":null,
                        "ban2":null,
                        "ban3":null,
                        "ban4":null,
                        "ban5":null
                    }
                },
                "redTeam":{
                    "roles":{
                        "top":null,
                        "mid":null,
                        "jg":null,
                        "adc":null,
                        "sup":null
                    },
                    "bans":{
                        "ban1":null,
                        "ban2":null,
                        "ban3":null,
                        "ban4":null,
                        "ban5":null
                    }
                },
                "elo": null
            }
        }
    }

    myGame: IGame = {
        "blueTeam":{
            "roles":{
                "top":1,
                "mid":2,
                "jg":3,
                "adc":4,
                "sup":5
            },
            "bans":{
                "ban1":875,
                "ban2":2,
                "ban3":3,
                "ban4":5,
                "ban5":7
            }
        },
        "redTeam":{
            "roles":{
                "top":1,
                "mid":2,
                "jg":3,
                "adc":4,
                "sup":5
            },
            "bans":{
                "ban1":0,
                "ban2":2,
                "ban3":3,
                "ban4":5,
                "ban5":7
            }
        },
        "elo": "DIAMOND"
    };

    async getWinner() {
        fetch('http://127.0.0.1:5000/predictWinner', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.myGame)
    }).then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    }

    onStart() {
        this.setState({start: true})
        console.log(this.state)
    }

    onEloSelect(elo: any) {
        let myGame = this.state.game
        myGame.elo = elo
        this.setState({game: myGame})
    }
    
    render() {
        const fadeOut = {
                opacity: 0,
                width:0,
                height:0,
                transition: "width 0.5s 0.5s, height 0.5s 0.5s, opacity 0.5s"
           
        };
        const fadeIn = {
                opacity:1,
                width:"100%",
                height:"100%",
                transition: "width 0.5s, height 0.5s, opacity 0.5s 0.5s"
           

        };
        return (
            <Container>
                    {!this.state.start && <LandingPage onStart={() => this.onStart()}/>}
                    {this.state.game.elo === null && this.state.start && <EloSelect onEloSelect={(elo: String) => this.onEloSelect(elo)}/>}
                    
                    {/* <div style={this.state.game.elo === null ? fadeOut: fadeIn}>
                        <p style={{color: 'pink'}} >Champion Select Page</p>
                    </div> */}
            </Container>
        );
      }
}

const Container = styled.div`
  background: #082938;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

export default Home;
