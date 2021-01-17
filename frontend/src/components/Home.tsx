import React from 'react';
import cover from "../images/League_Cover.jpg";
import {IGame} from "../types/IGame";
import {IWinRate} from "../types/IWinRate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function sampleFunction() {
    // example of type safety with fetch
    const myGame: IGame = {
        "blueTeam":{
            "picks":{
                "top":2,
                "mid":2,
                "jg":3,
                "adc":4,
                "sup":5
            },
            "bans":{
                "ban1":-1,
                "ban2":2,
                "ban3":3,
                "ban4":5,
                "ban5":7
            }
        },
        "redTeam":{
            "picks":{
                "top":1,
                "mid":2,
                "jg":3,
                "adc":4,
                "sup":5
            },
            "bans":{
                "ban1":-1,
                "ban2":2,
                "ban3":3,
                "ban4":5,
                "ban5":7
            }
        }
    };
    fetch("the url", {
        method: "post",
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            myGame
        )
    }).then(
        async r => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const rsp: IWinRate = await r.json()
        //    process rsp
        }
    )
}


export default function Home() {
    return <header className="App-header">
        <img src={cover} alt="logo"/>
        <p>
            Hey, this site is still under construction. Please come back later :)!
        </p>
    </header>;
}
