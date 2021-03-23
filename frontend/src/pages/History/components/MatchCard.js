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

//pass data via props then render it
export default function MatchCard({color}) {
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
            <Card className={classes.root} style={{background: color}} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {new Date(1615136533 * 1000).toDateString()}
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
                        <div>{getImage("34")}</div>
                        <div>{getImage("53")}</div>

                        <div>{getLane({"lane": jungle})}</div>
                        <div>{getImage("64")}</div>
                        <div>{getImage("51")}</div>

                        <div>{getLane({"lane": mid})}</div>
                        <div>{getImage("201")}</div>
                        <div>{getImage("63")}</div>

                        <div>{getLane({"lane": bot})}</div>
                        <div>{getImage("96")}</div>
                        <div>{getImage("40")}</div>

                        <div>{getLane({"lane": support})}</div>
                        <div>{getImage("427")}</div>
                        <div>{getImage("145")}</div>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}
