import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import {KeyToChamp} from "../../../constants/KeyToChampion";


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

export default function MatchCard() {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;

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
                        Date of match
                    </Typography>

                    <div className="row">
                        <div className="column">
                            <Typography variant="h6" component="h6">
                                Your Team
                            </Typography>

                            <div className="column">
                                <Typography variant="subtitle1" component="h6">
                                    Picks
                                </Typography>

                            </div>
                            <div className="column">
                                <Typography variant="subtitle1" component="h6">
                                    Bans
                                </Typography>
                            </div>

                        </div>


                        <div className="column">
                            <Typography variant="h6" component="h6">
                                Their Team
                            </Typography>

                            <div className="row">
                                <div className="column">
                                    <Typography variant="subtitle1" component="h6">
                                        Picks
                                    </Typography>
                                    <ul>
                                        <li>{getImage("11")}</li>
                                        <li>22</li>
                                        <li>22</li>
                                        <li>22</li>
                                        <li>22</li>
                                    </ul>
                                </div>

                                <div className="column">
                                    <Typography variant="subtitle1" component="h6">
                                        Bans
                                    </Typography>

                                </div>
                            </div>

                        </div>
                    </div>
                </CardContent>

            </Card>
        </div>

    );
}
