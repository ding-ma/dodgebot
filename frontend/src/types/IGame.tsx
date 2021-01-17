//TODO: Enforce type safety with the numbers that only appears in the JSON

/**
 * Picks for the team
 *
 * top -> top lane
 * mid -> mid lane
 * jg -> jungler
 * adc -> ad carry
 * sup -> support
 */
interface Pick {
    top: number;
    jg: number;
    mid: number;
    adc: number;
    sup: number;
}

/**
 * Bans for the team
 * Use -1 as no ban
 */
interface Ban {
    ban1: number,
    ban2: number,
    ban3: number,
    ban4: number,
    ban5: number
}

/**
 * Each team has picks and bans
 */
interface Team {
    picks: Pick;
    bans: Ban;
}


/**
 * A game is made of two teams (red and blue)
 */
export interface IGame {
    blueTeam: Team;
    redTeam: Team;
}
