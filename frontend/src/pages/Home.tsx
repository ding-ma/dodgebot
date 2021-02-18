import React from 'react';
import cover from "../images/League_Cover.jpg";
import {IGame} from "../types/IGame";
import {BACKEND, FEEDBACK, LOGIN} from "../constants/environment";

function sampleFunction() {
    /*
     example of type safety with fetch
     any number not in the list will not type check!
     */
    const myGame: IGame = {
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
    console.log(JSON.stringify(myGame))
    
    // fetch("the url", {
    //     method: "post",
    //     headers: {
    //         'Content-Type': 'application/json',
    //     },
    //     body:JSON.stringify(myGame)
    // }).then(
    //     async r => {
    //         // eslint-disable-next-line @typescript-eslint/no-unused-vars
    //         const rsp: IWinRate = await r.json()
    //     //    process rsp
    //     }
    // )
}


export default function Home() {
    sampleFunction();
    return <header className="App-header">
        <img src={cover} alt="logo"/>
        <p>
            Hey, this site is still under construction. Please come back later :)!
        </p>
        <p>
            backend: {BACKEND}
        </p>
        <p>
            feedback: {FEEDBACK}
        </p>
        <p>
            login: {LOGIN}
        </p>
    </header>;
}
