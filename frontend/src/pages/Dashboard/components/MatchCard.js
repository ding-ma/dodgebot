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
export default function MatchCard() {
    const classes = useStyles();

    const getImage = (championID) => {
        const champName = KeyToChamp[championID]
        return <img style={{height: "10vh", width: "10vh"}} key={championID}
                    src={`../ChampionIcons/` + champName + `Square.png`} alt="info"
        />
    }

    return (
        <div>
            <Card className={classes.root} style={{background: '#9fde99'}} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Date of match
                    </Typography>

                    <Typography variant="body2" component="p">
                        tmp to show color
                    </Typography>

                </CardContent>

            </Card>
            <Card className={classes.root} style={{background: '#f89b9b'}} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {new Date(1615136533*1000).toDateString()}
                    </Typography>

                    <div className="grid-container">
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

                        <div><img src={top} alt="toplane"/></div>
                        <div>{getImage("34")}</div>
                        <div>{getImage("53")}</div>

                        <div><img src={jungle} alt="jungle"/></div>
                        <div>{getImage("64")}</div>
                        <div>{getImage("51")}</div>

                        <div><img src={mid} alt="midlane"/></div>
                        <div>{getImage("201")}</div>
                        <div>{getImage("63")}</div>

                        <div><img src={bot} alt="botlane"/></div>
                        <div>{getImage("96")}</div>
                        <div>{getImage("40")}</div>

                        <div><img src={support} alt="support"/></div>
                        <div>{getImage("427")}</div>
                        <div>{getImage("145")}</div>
                    </div>

                </CardContent>

            </Card>
        </div>

    );
}
