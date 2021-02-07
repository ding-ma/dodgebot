//TODO might need to export some for dashboard. TBD

import {ChampionID} from "./IChampion";

/**
 * Picks for the team
 *
 * top -> top lane
 * mid -> mid lane
 * jg -> jungler
 * adc -> ad carry
 * sup -> support
 */

interface Roles {
    top: ChampionID;
    jg: ChampionID;
    mid: ChampionID;
    adc: ChampionID;
    sup: ChampionID;
}

/**
 * Bans for the team
 * Use -1 as no ban
 */
interface Ban {
    ban1: ChampionID,
    ban2: ChampionID,
    ban3: ChampionID,
    ban4: ChampionID,
    ban5: ChampionID
}

/**
 * Each team has picks and bans
 */
interface Team {
    roles: Roles;
    bans: Ban;
}

type elo = "IRON"|"BRONZE"|"SILVER"|"GOLD"|"PLATINUM"|"DIAMOND"|"MASTER"|"GRANDMASTER"|"CHALLENGER"

/**
 * A game is made of two teams (red and blue)
 */
export interface IGame {
    blueTeam: Team;
    redTeam: Team;
    elo: elo;
}
