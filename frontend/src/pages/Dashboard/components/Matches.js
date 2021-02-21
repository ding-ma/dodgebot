import React from "react";

const Matches = ({matchHistory}) => {
    console.log("your match history", matchHistory)

    const renderBans = (ban) =>{

    }

    const renderMatches =()=>{
        return matchHistory.map((match) => {
            // console.log(match.blueTeam.bans)
            return (
                <p>{match.elo}</p>
            )
        })
    }

    return (
        <div>

            {renderMatches()}

        </div>
    )
}

export default Matches;