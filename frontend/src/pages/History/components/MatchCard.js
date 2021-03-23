import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {KeyToChamp} from "../../../constants/KeyToChampion";
import bot from "../../../images/roles/bot.png"
import top from "../../../images/roles/top.png"
import jungle from "../../../images/roles/jungle.png"
import mid from "../../../images/roles/mid.png"
import support from "../../../images/roles/support.png"


const useStyles = makeStyles({
    root: {
        minWidth: 800,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const outComeToColor = {
    "win": '#9fde99',
    "loss": '#f89b9b',
    "dodge": '#dbdbdb'
}

export default function MatchCard({data}) {
    const {friendlyTeam, enemyTeam, date, outcome} = data

    console.log(friendlyTeam, enemyTeam, date, outcome, outComeToColor[outcome])
    const classes = useStyles();

    const getImage = (championID) => {
        const champName = KeyToChamp[championID]
        return <img width="50" height="50" key={championID} src={`../ChampionIcons/` + champName + `Square.png`}
                    alt="info"/>
    }

    const getLane = (lane) => {
        return <img src={lane.lane} alt={lane} width="50" height="50"/>
    }

    return (
        <div className="card">
            <Card className={classes.root} style={{background: outComeToColor[outcome]}} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {date}
                    </Typography>

                    <div className="grid-container-match">
                        <div><Typography variant="h6" component="h6">
                            Roles
                        </Typography>
                        </div>
                        <div><Typography variant="h6" component="h6">
                            Your Team
                        </Typography>
                        </div>
                        <div><Typography variant="h6" component="h6">
                            Their Team
                        </Typography>
                        </div>

                        <div>{getLane({"lane": top})}</div>
                        <div>{getImage(friendlyTeam.top)}</div>
                        <div>{getImage(enemyTeam.top)}</div>

                        <div>{getLane({"lane": jungle})}</div>
                        <div>{getImage(friendlyTeam.jungle)}</div>
                        <div>{getImage(enemyTeam.jungle)}</div>

                        <div>{getLane({"lane": mid})}</div>
                        <div>{getImage(friendlyTeam.mid)}</div>
                        <div>{getImage(enemyTeam.mid)}</div>

                        <div>{getLane({"lane": bot})}</div>
                        <div>{getImage(friendlyTeam.bot)}</div>
                        <div>{getImage(enemyTeam.bot)}</div>

                        <div>{getLane({"lane": support})}</div>
                        <div>{getImage(friendlyTeam.support)}</div>
                        <div>{getImage(enemyTeam.support)}</div>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}
